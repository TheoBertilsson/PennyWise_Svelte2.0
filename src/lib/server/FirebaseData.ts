import { adminDB } from './admin.server';

export const getTransactions = async (uid: string) => {
	const transactionDoc = await adminDB.collection(`users/${uid}/transactions`).get();
	return transactionDoc.docs.map((doc) => {
		const data = doc.data();
		return {
			...data,
			dueDate: data.dueDate?.toDate().toISOString(),
			createdAt: data.createdAt.toDate().toISOString()
		};
	});
};

export const getBudgetItems = async (uid: string) => {
	const budgetDoc = await adminDB.collection(`users/${uid}/budget`).get();
	return budgetDoc.docs.map((doc) => {
		const data = doc.data();
		return {
			...data,
			dueDate: data.dueDate?.toDate().toISOString(),
			createdAt: data.createdAt.toDate().toISOString()
		};
	});
};
