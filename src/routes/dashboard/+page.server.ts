import { adminAuth, adminDB } from '$lib/server/admin.server';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Timestamp } from 'firebase-admin/firestore';
import type { Transactions } from '$lib/components/models/types';

export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(301, '/login');

	const userDoc = await adminDB.collection('users').doc(uid).get();
	const transactionDoc = await adminDB.collection(`users/${uid}/transactions`).get();
	const transactions = transactionDoc.docs.map((doc) => {
		const data = doc.data();
		return {
				...data,
				createdAt: data.createdAt.toDate().toISOString()
		};
});
	const userData = userDoc.data();
	if (!userData) throw error(404, 'User not found');

	return {
		user: userData,
		transactions
	};
}) satisfies PageServerLoad;

export const actions = {
	addItem: async ({ request, locals }) => {
		const uid = locals.userID;
		console.log('add');

		if (!uid) return error(401, 'Unauthorized');
		const formData = await request.formData();
		const name = formData.get('name');
		const price = formData.get('price');
		const monthly = formData.get('monthly') === 'on';
		const category = formData.get('category');

		const newItem = {
			name,
			price,
			monthly,
			category,
			createdAt: Timestamp.now()
		};
		await adminDB.collection(`users/${uid}/transactions`).add(newItem);

		return { status: 'success' };
	}
} satisfies Actions;
