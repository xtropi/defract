import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase.config'
import { getFirestore } from 'firebase/firestore'

export * from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
