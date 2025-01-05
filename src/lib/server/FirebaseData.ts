import type { Budget, Transaction } from '$lib/components/models/types';
import { adminDB } from './admin.server';

export const getTransactions = async (uid: string):Promise<Transaction[]> => {
	const transactionDoc = await adminDB.collection(`users/${uid}/transactions`).get();
	return transactionDoc.docs.map((doc) => {
		const data = doc.data();
		return {
			...data,
			dueDate: data.dueDate?.toDate().toISOString(),
			createdAt: data.createdAt.toDate().toISOString()
		} as Transaction
	});
};

export const getBudgetItems = async (uid: string):Promise<Budget[]> => {
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
