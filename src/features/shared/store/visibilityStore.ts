import { create } from 'zustand';
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from '../../../infrastructure/firebase';

interface VisibilityState {
  isPublicDataEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  setPublicDataEnabled: (enabled: boolean, userRole?: string) => Promise<void>;
}

export const useVisibilityStore = create<VisibilityState>((set, get) => ({
  isPublicDataEnabled: false,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });
      const settingsDoc = await getDocs(collection(db, "settings"));
      const publicSettings = settingsDoc.docs[0]?.data() as { isPublicDataEnabled: boolean };
      set({ isPublicDataEnabled: publicSettings?.isPublicDataEnabled || false });
    } catch (err) {
      set({ error: "Failed to fetch visibility settings" });
      console.error("Failed to fetch visibility settings:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  setPublicDataEnabled: async (enabled: boolean, userRole?: string) => {
    try {
      set({ error: null });

      // Temporarily allowing all users to change visibility

      const settingsRef = collection(db, "settings");
      const settingsSnapshot = await getDocs(settingsRef);
      const settingsDoc = settingsSnapshot.docs[0];
      
      if (settingsDoc) {
        await updateDoc(doc(db, "settings", settingsDoc.id), {
          isPublicDataEnabled: enabled
        });
      } else {
        await addDoc(collection(db, "settings"), {
          isPublicDataEnabled: enabled
        });
      }
      
      set({ isPublicDataEnabled: enabled });
    } catch (err) {
      set({ error: "Failed to update visibility setting" });
      console.error("Failed to update visibility setting:", err);
      throw err;
    }
  },
}));
