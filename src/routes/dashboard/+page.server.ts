import { adminAuth, adminDB } from '$lib/server/admin.server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(301, '/login');

	const userDoc = await adminDB.collection('users').doc(uid).get();
	const transactionDoc = await adminDB.collection(`users/${uid}/transactions`).get();
	const transactions = transactionDoc.docs.map(doc => doc.data());
	const userData = userDoc.data();
	if (!userData) throw error(404, 'User not found');
	const { displayName } = userData;
	console.log(transactions);


	return { displayName };
}) satisfies PageServerLoad;
