import { adminDB, getBudgetDoc } from '$lib/server/Firebase';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { Timestamp } from 'firebase-admin/firestore';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(301, '/login');

	const userDoc = await adminDB.collection('users').doc(uid).get();
	const userData = userDoc.data();
	const budgetItems = await getBudgetDoc(uid);

	if (!userData) throw error(404, 'User not found');
	return {
		user: userData,
		budgetItems
	};
}) satisfies PageServerLoad;
