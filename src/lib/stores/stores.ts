import { firebaseAuth } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';

const userStore = () => {
	let unsubscribe: () => void;

	if (!firebaseAuth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<any | null>(null);
		return {
			subscribe
		};
	}
	const { subscribe } = writable(firebaseAuth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			set(user);
		});
		return () => unsubscribe();
	});

	return { subscribe };
};
export const user = userStore();
