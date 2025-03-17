import { useState, useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../infrastructure/firebase";
import { FormData, FormState, DEFAULT_FORM_DATA, OfflineSubmission } from "../domain/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const OFFLINE_STORAGE_KEY = 'offlineSubmissions';

export default function DataCollectionPage() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({
    data: DEFAULT_FORM_DATA,
    isSubmitting: false,
    error: null,
    isOffline: !navigator.onLine
  });
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: DEFAULT_FORM_DATA
  });

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setFormState(prev => ({ ...prev, isOffline: false }));
      syncOfflineSubmissions();
    };
    const handleOffline = () => setFormState(prev => ({ ...prev, isOffline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveOfflineSubmission = (data: FormData) => {
    const offlineSubmissions: OfflineSubmission[] = JSON.parse(
      localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]'
    );
    offlineSubmissions.push({
      data,
      timestamp: Date.now(),
      pendingSync: true
    });
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(offlineSubmissions));
    setSuccess(true);
    reset();
    navigate("/dashboard");
  };

  const syncOfflineSubmissions = async () => {
    const offlineSubmissions: OfflineSubmission[] = JSON.parse(
      localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]'
    );
    
    if (offlineSubmissions.length === 0) return;

    for (const submission of offlineSubmissions) {
      if (submission.pendingSync) {
        try {
          await onSubmit(submission.data);
          submission.pendingSync = false;
        } catch (err) {
          console.error('Failed to sync submission:', err);
        }
      }
    }

    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(offlineSubmissions));
  };

  const validateFiles = (value: File[] | undefined) => {
    if (!value || !value.length) return true;
    
    const invalidFiles = value.filter(file => file.size > MAX_FILE_SIZE);
    
    if (invalidFiles.length > 0) {
      return `Files exceeding 5MB: ${invalidFiles.map(f => f.name).join(', ')}`;
    }
    
    return true;
  };

  const fileRef = register("files", {
    validate: {
      fileSize: validateFiles
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileRef.onChange(e); // Handle the default onChange
    const files = e.target.files;
    if (!files) return;
    
    // Convert FileList to File array and update form state
    const fileArray = Array.from(files);
    setValue("files", fileArray, { shouldValidate: true });
    
    // Update form data with selected files
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        files: fileArray
      }
    }));
  };

  const onSubmit = async (data: FormData) => {
    if (formState.isSubmitting) return;

    try {
      setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));

      if (formState.isOffline) {
        saveOfflineSubmission(data);
        return;
      }

      // Upload files first if any are selected
      const fileData = data.files?.length ? await Promise.all(
        data.files.map(async (file) => {
          const storagePath = `uploads/${userId}/${file.name}`;
          const storageRef = ref(storage, storagePath);
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          return {
            name: file.name,
            storagePath,
            downloadUrl,
            type: file.type,
            size: file.size
          };
        })
      ) : [];

      // Add submission to Firestore
      await addDoc(collection(db, "submissions"), {
        userId,
        data: {
          agency: data.agency,
          asset: data.asset,
          description: data.description,
          location: data.location,
        },
        files: fileData.map(file => ({
          name: file.name,
          path: file.storagePath, // Make path more accessible at root level
          url: file.downloadUrl,
          metadata: {
            type: file.type,
            size: file.size
          }
        })),
        timestamp: new Date(),
      });

      setSuccess(true);
      reset();
      navigate("/dashboard");
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : "An error occurred while submitting the form"
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit Data</h1>
      
      {formState.isOffline && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          You are currently offline. Your submission will be saved locally and synced when you're back online.
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Data submitted successfully!
        </div>
      )}

      {formState.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formState.error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Agency Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agency Type
            </label>
            <select
              {...register("agency.type", { required: "Agency type is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select type...</option>
              <option value="government">Government Agency</option>
              <option value="ngo">NGO</option>
              <option value="council">Parish Council</option>
            </select>
            {errors.agency?.type && (
              <p className="mt-1 text-sm text-red-600">
                {(errors.agency.type as FieldError).message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agency Name
            </label>
            <input
              type="text"
              {...register("agency.name", { required: "Agency name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.agency?.name && (
              <p className="mt-1 text-sm text-red-600">
                {(errors.agency.name as FieldError).message}
              </p>
            )}
          </div>
        </div>

        {/* Asset Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Asset Type
            </label>
            <select
              {...register("asset.type", { required: "Asset type is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select type...</option>
              <option value="road">Road</option>
              <option value="stoplight">Stoplight</option>
              <option value="building">Building</option>
              <option value="bridge">Bridge</option>
              <option value="park">Park</option>
              <option value="other">Other</option>
            </select>
            {errors.asset?.type && (
              <p className="mt-1 text-sm text-red-600">
                {(errors.asset.type as FieldError).message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Asset Details
            </label>
            <input
              type="text"
              {...register("asset.details", { required: "Asset details are required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Road name, building address, etc."
            />
            {errors.asset?.details && (
              <p className="mt-1 text-sm text-red-600">
                {(errors.asset.details as FieldError).message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Describe the issue or concern..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {(errors.description as FieldError).message}
            </p>
          )}
        </div>

        {/* Location (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location (Optional)
          </label>
          <input
            type="text"
            {...register("location")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Address or location description"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Files (Max 5MB per file)
          </label>
          <input
            type="file"
            multiple
            {...register("files", {
              validate: {
                fileSize: validateFiles
              }
            })}
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
            {errors.files?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.files.message}
              </p>
            )}
            {formState.data.files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected files:</p>
                <ul className="mt-1 text-sm text-gray-500">
                  {formState.data.files.map((file, index) => (
                    <li key={index} className="flex items-center">
                      <span className="truncate">{file.name}</span>
                      <span className="ml-2 text-xs">({Math.round(file.size / 1024)}KB)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className={`
            w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
            ${formState.isSubmitting 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }
          `}
        >
          {formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
