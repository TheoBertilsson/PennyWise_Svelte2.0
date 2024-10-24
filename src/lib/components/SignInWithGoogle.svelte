<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, firebaseDB } from '$lib/firebase';
	import { setDoc, doc } from 'firebase/firestore';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);

		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		}).catch((err) => {
			console.error(err);
		});
		if (!res) throw new Error('No response from server');
		const user = credential.user;
		await setDoc(doc(firebaseDB, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
		});

		goto('/dashboard');
	}
</script>

<button onclick={signInWithGoogle}
	><img
		src="/LoginSVGs/signInWithGoogle.png"
		alt="Sign in with Google button"
		class="mx-auto my-10 w-[30vh]"
	/></button
>
