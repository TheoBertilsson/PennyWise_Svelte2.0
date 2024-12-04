import { error, redirect, type Actions } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin.server';
import { Timestamp } from 'firebase-admin/firestore';
import type { PageServerLoad } from './$types';
import { doc } from 'firebase/firestore';

export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(301, '/login');

	const userDoc = await adminDB.collection('users').doc(uid).get();
	const budgetdoc = await adminDB.collection(`users/${uid}/budget`).get();
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
		const price = parseFloat(formData.get('price') as string);
		const monthly = formData.get('monthly');
		const category = formData.get('category');
		const subCategory = formData.get('subCategory');
		const isPaid = formData.get('isPaid');
		const dueDate = formData.get('dueDate');

		const newItem = {
			price,
			monthly,
			isPaid,
			dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate.toString())) : null,
			category,
			subCategory,
			createdAt: Timestamp.now()
		};

		const docRef = await adminDB.collection(`users/${uid}/budget`).add(newItem);
		await docRef.update({ id: docRef.id });
		return { status: 'success'};
	},
	deleteBudgetItem: async ({ request, locals }) => {
		const uid = locals.userID;
		if (!uid) {
			console.error('Unauthorized: No user ID found in locals');
			return error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const id = formData.get('id');

		if (!id) return error(400, 'Bad Request: No ID provided');
		try {
			await adminDB
				.collection(`users/${uid}/budget`)
				.doc(id as string)
				.delete();
			return { status: 'success' };
		} catch (err) {
			console.error(`Failed to delete item with id: ${id}`, err);
			return error(500, 'Failed to delete item');
		}
	}
} satisfies Actions;
