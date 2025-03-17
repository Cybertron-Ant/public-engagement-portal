import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
  DocumentData,
} from 'firebase/firestore'
import { db } from './index'

export interface FirestoreDocument {
  id: string
  [key: string]: any
}

export const getCollection = async <T extends FirestoreDocument>(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> => {
  const q = constraints.length > 0 
    ? query(collection(db, collectionName), ...constraints)
    : collection(db, collectionName)
    
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[]
}

export const getDocument = async <T extends FirestoreDocument>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as T
}

export const createDocument = async <T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> => {
  await setDoc(doc(db, collectionName, docId), data)
}

export const updateDocument = async <T extends Partial<DocumentData>>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> => {
  await updateDoc(doc(db, collectionName, docId), data)
}

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  await deleteDoc(doc(db, collectionName, docId))
}

export const queryByField = (field: string, value: any): QueryConstraint => {
  return where(field, '==', value)
}