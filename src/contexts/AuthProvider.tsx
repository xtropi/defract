import { useEffect, useState } from 'react'
import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { AuthContext } from './AuthContext'

export const AuthProvider: React.FC = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const auth = getAuth()

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email: string) {
    return updateEmail(email)
  }

  function updatePassword(password: string) {
    return updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser)
    })

    return unsubscribe
  }, [auth])

  const value = { currentUser, signup, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
