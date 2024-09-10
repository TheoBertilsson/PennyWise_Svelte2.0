<script lang="ts">
	import { firebaseAuth, firebaseDB, fireStorage, user } from '$lib/firebase';
	import { setDoc, doc } from 'firebase/firestore';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	const signInWithGoogle = async () => {
		try {
			// Initialize Google provider
			const loginGoogleProvider = new GoogleAuthProvider();
			// Sign in with popup
			const result = await signInWithPopup(firebaseAuth, loginGoogleProvider);
			// Get the user info
			const signedInUser = result.user;
			// Save user info in Firestore
			await setDoc(doc(firebaseDB, 'users', signedInUser.uid), {
				displayName: signedInUser.displayName,
				email: signedInUser.email
			});
			console.log('User UID:', signedInUser.uid);
		} catch (error) {
			console.error('Error signing in with Google:', error);
		}

		// const loginGoogleProvider = new GoogleAuthProvider();
		// const user = await signInWithPopup(firebaseAuth, loginGoogleProvider);
		// await setDoc(doc(firebaseDB, "users", $user.uid), {
		//   displayName: $user.displayName
		// });
		// console.log(user.user.uid);
	};
</script>

<h2>Login</h2>
<button on:click={signInWithGoogle}>Sign in with Google</button>
