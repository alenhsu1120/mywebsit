import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const isConfigured = !!firebaseConfig.apiKey

// 避免重複初始化（HMR / 模組重載時會發生）
let app: FirebaseApp | null = null
if (isConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  } catch (e) {
    console.error('[Firebase] initializeApp 失敗:', e)
  }
}

let db: Firestore | null = null
if (app) {
  try {
    db = getFirestore(app)
  } catch (e) {
    console.error('[Firebase] getFirestore 失敗:', e)
  }
}

let auth: Auth | null = null
if (app) {
  try {
    auth = getAuth(app)
  } catch (e) {
    console.error('[Firebase] getAuth 失敗:', e)
  }
}

export { auth, db }
export const googleProvider = new GoogleAuthProvider()
export const firebaseReady  = !!db
