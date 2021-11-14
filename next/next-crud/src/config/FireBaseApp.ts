import { getApp, initializeApp, FirebaseApp } from '@firebase/app'
import firestore from '@firebase/firestore'

export function getFirebaseApp() {
  const firebaseAppName = 'next-crud'
  let firebaseApp: FirebaseApp

  try {
    firebaseApp = getApp(firebaseAppName)
  }
  catch {
    firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }, firebaseAppName)
  }

  return firebaseApp
}

export function getAppFirestore() {
  const firebaseApp = getFirebaseApp()
  return firestore.getFirestore(firebaseApp)
}