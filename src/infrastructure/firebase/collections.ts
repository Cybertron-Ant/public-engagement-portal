import { Timestamp } from 'firebase/firestore'
import { 
  getCollection, 
  getDocument, 
  createDocument, 
  updateDocument, 
  deleteDocument,
  FirestoreDocument 
} from './firestore'

// Collection names
export const COLLECTIONS = {
  USERS: 'Userz',
  SUBMISSIONS: 'Submissions',
  ANALYTICS: 'Analytics',
} as const

// Collection Types
export interface User extends FirestoreDocument {
  email: string
  displayName: string
  role: 'admin' | 'user'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Submission extends FirestoreDocument {
  userId: string
  title: string
  content: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Analytics extends FirestoreDocument {
  userId: string
  event: string
  metadata: Record<string, any>
  timestamp: Timestamp
}

// Collection-specific helpers
export const Users = {
  getAll: () => getCollection<User>(COLLECTIONS.USERS),
  getById: (id: string) => getDocument<User>(COLLECTIONS.USERS, id),
  create: (id: string, data: Omit<User, 'id'>) => 
    createDocument(COLLECTIONS.USERS, id, data),
  update: (id: string, data: Partial<User>) => 
    updateDocument(COLLECTIONS.USERS, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.USERS, id),
}

export const Submissions = {
  getAll: () => getCollection<Submission>(COLLECTIONS.SUBMISSIONS),
  getById: (id: string) => getDocument<Submission>(COLLECTIONS.SUBMISSIONS, id),
  create: (id: string, data: Omit<Submission, 'id'>) => 
    createDocument(COLLECTIONS.SUBMISSIONS, id, data),
  update: (id: string, data: Partial<Submission>) => 
    updateDocument(COLLECTIONS.SUBMISSIONS, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.SUBMISSIONS, id),
}

export const Analytics = {
  getAll: () => getCollection<Analytics>(COLLECTIONS.ANALYTICS),
  getById: (id: string) => getDocument<Analytics>(COLLECTIONS.ANALYTICS, id),
  create: (id: string, data: Omit<Analytics, 'id'>) => 
    createDocument(COLLECTIONS.ANALYTICS, id, data),
  update: (id: string, data: Partial<Analytics>) => 
    updateDocument(COLLECTIONS.ANALYTICS, id, data),
  delete: (id: string) => deleteDocument(COLLECTIONS.ANALYTICS, id),
}