import type { Transaction } from './components/models/types';

export const getPaidReccuringTransactions = (monthlyTransactions: Transaction[]) => {
	const today = new Date();

	const paidTransactions = monthlyTransactions.filter((transaction) => {
		if (!transaction.dueDate || transaction.category === 'income') return;
		const dueDate = new Date(transaction.dueDate);

		return (
			dueDate <= today &&
			(dueDate.getFullYear() < today.getFullYear() ||
				(dueDate.getFullYear() === today.getFullYear() && dueDate.getMonth() <= today.getMonth()))
		);
	});

	return paidTransactions;
};

export const getUpcomingReccuringTransactions = (monthlyTransactions: Transaction[]) => {
  const today = new Date();

  const upcomingTransactions = monthlyTransactions.filter((transaction) => {
    if (!transaction.dueDate || transaction.category === 'income') return;
    const dueDate = new Date(transaction.dueDate);

    return (
      dueDate > today &&
      (dueDate.getFullYear() > today.getFullYear() ||
        (dueDate.getFullYear() === today.getFullYear() && dueDate.getMonth() >= today.getMonth()))
    )})
    return upcomingTransactions;
}
