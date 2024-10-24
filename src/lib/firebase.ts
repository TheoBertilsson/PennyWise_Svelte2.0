import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAW-0yFug37PoftfozxLmlEiYr40ZnrgJA',
	authDomain: 'pennywise-d7335.firebaseapp.com',
	projectId: 'pennywise-d7335',
	storageBucket: 'pennywise-d7335.appspot.com',
	messagingSenderId: '1061382752726',
	appId: '1:1061382752726:web:5ec1a979e8380656b17c77',
	measurementId: 'G-1245E1TN5N'
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApps()[0];
}

export const firebaseDB = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const fireStorage = getStorage(firebaseApp);
