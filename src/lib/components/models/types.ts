import type { Timestamp } from "firebase-admin/firestore";

export type Transaction = {
  name: string;
  price: number;
  monthly: boolean;
  dueDate?: Date;
  category: Category;
  createdAt: string;
}
export type User = {
  uid: string;
  email: string;
  displayName: string;
}
export type DashboardData = {
  user: User;
  transactions: Transaction[];
}
export type Category = "food" | "transport" | "housing" | "entertainment" | "other" | "income" | "subscripton";
