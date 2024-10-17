export type Transactions = {
  name: string;
  price: number;
  monthly: boolean;
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
  transactions: Transactions[];
}
export type Category = "food" | "transport" | "housing" | "entertainment" | "other" | "income" | "subscripton";
