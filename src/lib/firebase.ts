import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { writable } from 'svelte/store';

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
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
export const auth = getAuth();
export const fireStorage = getStorage();

const userStore = () => {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}
	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});
		return () => unsubscribe();
	});

	return { subscribe };
};
export const user = userStore();
