import { FB_PROJECT_ID, FB_CLIENT_EMAIL, FB_PRIVATE_KEY } from '$env/static/private';
import type { Budget, Transaction } from '$lib/components/models/types';
import pkg from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_PRIVATE_KEY
		})
	});
} catch (err: any) {
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();

export const getTransactions = async (uid: string): Promise<Transaction[]> => {
	const transactionDoc = await adminDB.collection(`users/${uid}/transactions`).get();
	return transactionDoc.docs.map((doc) => {
		const data = doc.data();
		return {
			...data,
			dueDate: data.dueDate?.toDate().toISOString(),
			createdAt: data.createdAt.toDate().toISOString()
		} as Transaction;
	});
};

export const getBudgetItems = async (uid: string): Promise<Budget[]> => {
	const budgetDoc = await adminDB.collection(`users/${uid}/budget`).get();
	return budgetDoc.docs.map((doc) => {
		const data = doc.data();
		return {
			...data,
			dueDate: data.dueDate ? data.dueDate.toDate().toISOString() : undefined,
			createdAt: data.createdAt.toDate().toISOString()
		} as Budget;
	});
};
