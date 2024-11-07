
export type Transaction = {
  name: string;
  price: number;
  monthly: boolean;
  dueDate: string;
  category: Category;
  createdAt: string;
}
export type Budget = {
  price: number;
  monthly: boolean;
  dueDate?: string;
  category: Category;
  createdAt: string;
  subCategory: string;
  isPaid: boolean;
}
export type User = {
  uid: string;
  email: string;
  displayName: string;
}
export type DashboardData = {
  user: User;
  transactions: Transaction[];
  budgetItems: Budget[];
}
export type BudgetData = {
  budgetItems: Budget[];
  user: User;
}
export type Category = "food" | "transport" | "housing" | "entertainment" | "other" | "income" | "subscripton";
