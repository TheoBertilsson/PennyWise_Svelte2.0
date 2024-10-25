import { error, redirect, type Actions } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin.server';
import { Timestamp } from 'firebase-admin/firestore';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(301, '/login');

	const userDoc = await adminDB.collection('users').doc(uid).get();
	const budgetdoc = await adminDB.collection(`users/${uid}/budgets`).get();
	const budgetItems = budgetdoc.docs.map((doc) => {
		const data = doc.data();
		return {
			...data,
			dueDate: data.dueDate?.toDate().toISOString(),
			createdAt: data.createdAt.toDate().toISOString()
		};
	});
	const userData = userDoc.data();
	if (!userData) throw error(404, 'User not found');

	return {
		user: userData,
		budgetItems
	};
}) satisfies PageServerLoad;

export const actions = {
	addBudgetItem: async ({ request, locals }) => {
		const uid = locals.userID;

		if (!uid) return error(401, 'Unauthorized');
		const formData = await request.formData();
		const price = formData.get('price');
		const monthly = formData.get('monthly') === 'on';
		const category = formData.get('category');
		const subCategory = formData.get('subCategory');


		const newItem = {
			price,
			monthly,
			category,
			subCategory,
			createdAt: Timestamp.now()
		};
		await adminDB.collection(`users/${uid}/budget`).add(newItem);

		return { status: 'success' };
	}
} satisfies Actions;
