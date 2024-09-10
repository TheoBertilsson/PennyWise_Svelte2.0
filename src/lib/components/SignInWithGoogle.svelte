<script lang="ts">
	import { firebaseAuth, firebaseDB } from '$lib/firebase';
	import { setDoc, doc } from 'firebase/firestore';
	import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
	import {user} from '$lib/stores/stores';
	import { goto } from '$app/navigation';

	const signInWithGoogle = async () => {
		try {
			const loginGoogleProvider = new GoogleAuthProvider();
			await signInWithPopup(firebaseAuth, loginGoogleProvider);
			await setDoc(doc(firebaseDB, 'users', $user.uid), {
				displayName: $user.displayName,
				email: $user.email
			});
			goto(`${$user.uid}`)
		} catch (error) {
			console.error('Error signing in with Google:', error);
		}
	};
</script>
<button on:click={signInWithGoogle}><img src="/LoginSVGs/signInWithGoogle.png" alt="Sign in with Google button" class="w-[30vh] mx-auto my-10"></button>
