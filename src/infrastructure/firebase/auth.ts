import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from './index'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

const mapUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
})

export const signIn = async (email: string, password: string): Promise<AuthUser> => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return mapUser(user)
}

export const signUp = async (email: string, password: string): Promise<AuthUser> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  return mapUser(user)
}

export const signOut = () => firebaseSignOut(auth)

export const signInWithGoogle = async (): Promise<AuthUser> => {
  const provider = new GoogleAuthProvider()
  const { user } = await signInWithPopup(auth, provider)
  return mapUser(user)
}

export const onAuthChange = (callback: (user: AuthUser | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? mapUser(user) : null)
  })
}