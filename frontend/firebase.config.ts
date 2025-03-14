import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_AUTH_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_AUTH_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_AUTH_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_AUTH_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_AUTH_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_AUTH_FIREBASE_MEASAUREMENT_ID,
};

console.log(import.meta.env);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
};

export const logoutFirebaseUser = async () => {
    try {
        await signOut(auth);
        console.log('User signed out');
    } catch (error) {
        console.error('Error during sign-out:', error);
    }
};

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log('Auth persistence set successfully!');
    })
    .catch(error => {
        console.error('Error setting persistence:', error);
    });
