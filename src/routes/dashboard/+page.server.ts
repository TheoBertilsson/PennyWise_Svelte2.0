import { adminDB } from '$lib/server/admin.server';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Timestamp } from 'firebase-admin/firestore';
import { getBudgetItems, getTransactions } from '$lib/server/FirebaseData';

export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(301, '/login');

	const userDoc = await adminDB.collection('users').doc(uid).get();
	const userData = userDoc.data();
	const transactions = await getTransactions(uid);
	const budgetItems = await getBudgetItems(uid);

	if (!userData) throw error(404, 'User not found');
	return {
		user: userData,
		transactions,
		budgetItems
	};
}) satisfies PageServerLoad;

export const actions = {
	addTransaction: async ({ request, locals }) => {
		const uid = locals.userID;

		if (!uid) return error(401, 'Unauthorized');
		const formData = await request.formData();
		const price = formData.get('price');
		const monthly = formData.get('monthly') === 'on';
		const category = formData.get('category');
		const dueDate = formData.get('dueDate');
		const subCategory = formData.get('subCategory');

		const newItem = {
			price,
			monthly,
			category,
			subCategory,
			createdAt: Timestamp.now(),
			dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate.toString())) : null
		};
		await adminDB.collection(`users/${uid}/transactions`).add(newItem);

		return { status: 'success' };
	}
} satisfies Actions;
