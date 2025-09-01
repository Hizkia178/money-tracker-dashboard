"use client";

import { Dashboard } from "../Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Coffee,
  Car,
  Film,
  ShoppingCart,
  Heart,
  GraduationCap,
  Zap,
  Dumbbell,
  Home,
  Plane,
  Briefcase,
  Gift,
  Filter,
  Search,
  Receipt,
  MapPin,
  Tags,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: {
    id: number;
    name: string;
    icon: any;
    color: string;
  };
  description: string;
  date: string;
  location?: string;
  tags: string[];
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  icon: any;
  color: string;
  type: "income" | "expense";
}

const expenseCategories: Category[] = [
  { id: 1, name: "Food & Dining", icon: Coffee, color: "bg-orange-500", type: "expense" },
  { id: 2, name: "Transportation", icon: Car, color: "bg-blue-500", type: "expense" },
  { id: 3, name: "Entertainment", icon: Film, color: "bg-purple-500", type: "expense" },
  { id: 4, name: "Shopping", icon: ShoppingCart, color: "bg-pink-500", type: "expense" },
  { id: 5, name: "Healthcare", icon: Heart, color: "bg-red-500", type: "expense" },
  { id: 6, name: "Education", icon: GraduationCap, color: "bg-green-500", type: "expense" },
  { id: 7, name: "Utilities", icon: Zap, color: "bg-yellow-500", type: "expense" },
  { id: 8, name: "Health & Fitness", icon: Dumbbell, color: "bg-cyan-500", type: "expense" },
  { id: 9, name: "Housing", icon: Home, color: "bg-indigo-500", type: "expense" },
  { id: 10, name: "Travel", icon: Plane, color: "bg-teal-500", type: "expense" },
];

const incomeCategories: Category[] = [
  { id: 11, name: "Salary", icon: Briefcase, color: "bg-green-600", type: "income" },
  { id: 12, name: "Freelance", icon: DollarSign, color: "bg-blue-600", type: "income" },
  { id: 13, name: "Investment", icon: TrendingUp, color: "bg-purple-600", type: "income" },
  { id: 14, name: "Side Business", icon: Gift, color: "bg-orange-600", type: "income" },
];

const allCategories = [...expenseCategories, ...incomeCategories];

const sampleTransactions: Transaction[] = [
  {
    id: 1,
    title: "Monthly Salary",
    amount: 5000.00,
    type: "income",
    category: { id: 11, name: "Salary", icon: Briefcase, color: "bg-green-600" },
    description: "Monthly salary payment from company",
    date: "2024-01-01",
    location: "",
    tags: ["monthly", "salary", "primary"],
    createdAt: "2024-01-01T09:00:00Z",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    amount: 125.50,
    type: "expense",
    category: { id: 1, name: "Food & Dining", icon: Coffee, color: "bg-orange-500" },
    description: "Weekly grocery shopping at supermarket",
    date: "2024-01-02",
    location: "SuperMart Plaza",
    tags: ["groceries", "weekly", "food"],
    createdAt: "2024-01-02T10:30:00Z",
  },
  {
    id: 3,
    title: "Freelance Website Project",
    amount: 750.00,
    type: "income",
    category: { id: 12, name: "Freelance", icon: DollarSign, color: "bg-blue-600" },
    description: "Payment for e-commerce website development",
    date: "2024-01-03",
    location: "",
    tags: ["freelance", "web-development", "client"],
    createdAt: "2024-01-03T14:20:00Z",
  },
  {
    id: 4,
    title: "Gas Station",
    amount: 45.75,
    type: "expense",
    category: { id: 2, name: "Transportation", icon: Car, color: "bg-blue-500" },
    description: "Fuel refill for daily commute",
    date: "2024-01-04",
    location: "Shell Station Downtown",
    tags: ["fuel", "car", "commute"],
    createdAt: "2024-01-04T08:45:00Z",
  },
  {
    id: 5,
    title: "Movie Night",
    amount: 32.00,
    type: "expense",
    category: { id: 3, name: "Entertainment", icon: Film, color: "bg-purple-500" },
    description: "Cinema tickets and popcorn with friends",
    date: "2024-01-05",
    location: "Cinema Plaza",
    tags: ["movies", "entertainment", "friends"],
    createdAt: "2024-01-05T19:30:00Z",
  },
  {
    id: 6,
    title: "Stock Dividend",
    amount: 150.25,
    type: "income",
    category: { id: 13, name: "Investment", icon: TrendingUp, color: "bg-purple-600" },
    description: "Quarterly dividend payment from tech stocks",
    date: "2024-01-06",
    location: "",
    tags: ["dividend", "stocks", "quarterly"],
    createdAt: "2024-01-06T11:00:00Z",
  },
  {
    id: 7,
    title: "Online Shopping",
    amount: 89.99,
    type: "expense",
    category: { id: 4, name: "Shopping", icon: ShoppingCart, color: "bg-pink-500" },
    description: "New clothes and accessories order",
    date: "2024-01-07",
    location: "Amazon",
    tags: ["clothes", "online", "fashion"],
    createdAt: "2024-01-07T16:15:00Z",
  },
  {
    id: 8,
    title: "Doctor Visit",
    amount: 120.00,
    type: "expense",
    category: { id: 5, name: "Healthcare", icon: Heart, color: "bg-red-500" },
    description: "Regular health checkup and consultation",
    date: "2024-01-08",
    location: "City Medical Center",
    tags: ["health", "checkup", "doctor"],
    createdAt: "2024-01-08T13:30:00Z",
  },
  {
    id: 9,
    title: "Online Course",
    amount: 99.00,
    type: "expense",
    category: { id: 6, name: "Education", icon: GraduationCap, color: "bg-green-500" },
    description: "React development masterclass subscription",
    date: "2024-01-09",
    location: "",
    tags: ["education", "programming", "course"],
    createdAt: "2024-01-09T20:00:00Z",
  },
  {
    id: 10,
    title: "Electricity Bill",
    amount: 85.40,
    type: "expense",
    category: { id: 7, name: "Utilities", icon: Zap, color: "bg-yellow-500" },
    description: "Monthly electricity bill payment",
    date: "2024-01-10",
    location: "",
    tags: ["utilities", "monthly", "electricity"],
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: 11,
    title: "Gym Membership",
    amount: 59.99,
    type: "expense",
    category: { id: 8, name: "Health & Fitness", icon: Dumbbell, color: "bg-cyan-500" },
    description: "Monthly gym membership renewal",
    date: "2024-01-11",
    location: "FitZone Gym",
    tags: ["fitness", "gym", "monthly"],
    createdAt: "2024-01-11T07:00:00Z",
  },
  {
    id: 12,
    title: "Side Business Revenue",
    amount: 320.00,
    type: "income",
    category: { id: 14, name: "Side Business", icon: Gift, color: "bg-orange-600" },
    description: "Revenue from online store sales",
    date: "2024-01-12",
    location: "",
    tags: ["business", "sales", "online"],
    createdAt: "2024-01-12T18:45:00Z",
  },
  {
    id: 13,
    title: "Home Internet",
    amount: 65.00,
    type: "expense",
    category: { id: 7, name: "Utilities", icon: Zap, color: "bg-yellow-500" },
    description: "Monthly internet service provider bill",
    date: "2024-01-13",
    location: "",
    tags: ["utilities", "internet", "monthly"],
    createdAt: "2024-01-13T12:00:00Z",
  },
  {
    id: 14,
    title: "Weekend Trip",
    amount: 280.75,
    type: "expense",
    category: { id: 10, name: "Travel", icon: Plane, color: "bg-teal-500" },
    description: "Hotel and transport for weekend getaway",
    date: "2024-01-14",
    location: "Beach Resort",
    tags: ["travel", "weekend", "vacation"],
    createdAt: "2024-01-14T06:30:00Z",
  },
  {
    id: 15,
    title: "Restaurant Dinner",
    amount: 67.80,
    type: "expense",
    category: { id: 1, name: "Food & Dining", icon: Coffee, color: "bg-orange-500" },
    description: "Anniversary dinner at fine dining restaurant",
    date: "2024-01-15",
    location: "Bella Vista Restaurant",
    tags: ["dining", "anniversary", "special"],
    createdAt: "2024-01-15T19:45:00Z",
  },
];

export default function Transactions() {
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredAndSortedTransactions = sampleTransactions
    .filter(transaction => {
      const matchesType = filterType === "all" || transaction.type === filterType;
      const matchesSearch = searchQuery === "" ||
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.name.localeCompare(b.category.name);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalIncome = sampleTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = sampleTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const transactionStats = [
    {
      title: "Total Transactions",
      value: sampleTransactions.length.toString(),
      icon: Receipt,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Income",
      value: `$${totalIncome.toFixed(2)}`,
      icon: ArrowUpCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toFixed(2)}`,
      icon: ArrowDownCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Net Balance",
      value: `$${netBalance.toFixed(2)}`,
      icon: Wallet,
      color: netBalance >= 0 ? "text-green-600" : "text-red-600",
      bgColor: netBalance >= 0 ? "bg-green-100" : "bg-red-100",
    },
  ];

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">All Transactions</h2>
            <p className="text-muted-foreground">Complete overview of your financial transactions</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {transactionStats.map((stat, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>Detailed view of all your financial activities</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-full sm:w-64"
                  />
                </div>
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger className="w-full sm:w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Income
                      </div>
                    </SelectItem>
                    <SelectItem value="expense">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        Expense
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="amount">Sort by Amount</SelectItem>
                    <SelectItem value="category">Sort by Category</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="shrink-0"
                >
                  {sortOrder === "asc" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAndSortedTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <Receipt className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No transactions found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredAndSortedTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                      <div
                        className={`w-14 h-14 rounded-full ${transaction.category.color} flex items-center justify-center shadow-lg`}
                      >
                        <transaction.category.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h4 className="font-semibold text-lg">{transaction.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${transaction.type === 'income' ? 'border-green-200 text-green-700 bg-green-50' : 'border-red-200 text-red-700 bg-red-50'}`}
                          >
                            <transaction.category.icon className="h-3 w-3 mr-1" />
                            {transaction.category.name}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{transaction.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(transaction.date)}
                          </div>
                          {transaction.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {transaction.location}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Tags className="h-3 w-3" />
                            {transaction.tags.slice(0, 2).join(", ")}
                            {transaction.tags.length > 2 && ` +${transaction.tags.length - 2}`}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            transaction.type === "income" 
                              ? "text-green-600" 
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>{formatTime(transaction.createdAt)}</span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {filteredAndSortedTransactions.length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Showing {filteredAndSortedTransactions.length} of {sampleTransactions.length} transactions</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Income: ${filteredAndSortedTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Expenses: ${filteredAndSortedTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
}