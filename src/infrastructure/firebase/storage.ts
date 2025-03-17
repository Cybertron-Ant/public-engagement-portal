import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference,
} from 'firebase/storage'
import { storage } from './index'

export interface UploadResult {
  url: string
  path: string
}

export const uploadFile = async (
  path: string,
  file: File | Blob
): Promise<UploadResult> => {
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  
  return {
    url,
    path,
  }
}

export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

export const getFileUrl = async (path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  return getDownloadURL(storageRef)
}

export const listFiles = async (path: string): Promise<StorageReference[]> => {
  const storageRef = ref(storage, path)
  const { items } = await listAll(storageRef)
  return items
}

export const getStorageRef = (path: string): StorageReference => {
  return ref(storage, path)
}