<script lang="ts">
  import { auth } from "$lib/firebase";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	const credential = await signInWithPopup(auth, provider);

	const idToken = await credential.user.getIdToken();

	const res = await fetch("/api/signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ idToken }),
	}).catch((err) => {
		console.error(err);
	});
}

async function signOutSSR() {
	const res = await fetch("/api/signin", { method: "DELETE" });
	await signOut(auth);
}
</script>

<button on:click={signInWithGoogle}
	><img
		src="/LoginSVGs/signInWithGoogle.png"
		alt="Sign in with Google button"
		class="w-[30vh] mx-auto my-10"
	/></button
>
