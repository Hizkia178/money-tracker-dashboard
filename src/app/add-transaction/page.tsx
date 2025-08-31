"use client";

import { useState } from "react";
import { Dashboard } from "../Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
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
  AlertCircle,
  CheckCircle,
  Save,
  XCircle,
  Filter,
  Search,
  Receipt,
  MapPin,
  Tags,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

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

interface FormData {
  title: string;
  amount: string;
  type: "income" | "expense";
  categoryId: string;
  description: string;
  date: string;
  location: string;
  tags: string;
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

export default function AddTransactions() {
  const [open, setOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      amount: "",
      type: "expense",
      categoryId: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      location: "",
      tags: "",
    },
  });

  const watchedType = watch("type");
  const watchedCategoryId = watch("categoryId");

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      title: "Lunch at Restaurant",
      amount: 25.50,
      type: "expense",
      category: { id: 1, name: "Food & Dining", icon: Coffee, color: "bg-orange-500" },
      description: "Business lunch with client",
      date: "2024-12-28",
      location: "Downtown Restaurant",
      tags: ["business", "lunch"],
      createdAt: "2024-12-28T12:30:00Z",
    },
    {
      id: 2,
      title: "Salary Payment",
      amount: 3500.00,
      type: "income",
      category: { id: 11, name: "Salary", icon: Briefcase, color: "bg-green-600" },
      description: "Monthly salary deposit",
      date: "2024-12-25",
      location: "",
      tags: ["monthly", "salary"],
      createdAt: "2024-12-25T09:00:00Z",
    },
    {
      id: 3,
      title: "Grocery Shopping",
      amount: 89.45,
      type: "expense",
      category: { id: 1, name: "Food & Dining", icon: Coffee, color: "bg-orange-500" },
      description: "Weekly grocery shopping",
      date: "2024-12-27",
      location: "Supermarket Plaza",
      tags: ["groceries", "weekly"],
      createdAt: "2024-12-27T16:45:00Z",
    },
    {
      id: 4,
      title: "Uber Ride",
      amount: 12.75,
      type: "expense",
      category: { id: 2, name: "Transportation", icon: Car, color: "bg-blue-500" },
      description: "Ride to airport",
      date: "2024-12-26",
      location: "Airport",
      tags: ["uber", "airport"],
      createdAt: "2024-12-26T14:20:00Z",
    },
    {
      id: 5,
      title: "Freelance Project",
      amount: 450.00,
      type: "income",
      category: { id: 12, name: "Freelance", icon: DollarSign, color: "bg-blue-600" },
      description: "Web development project completion",
      date: "2024-12-24",
      location: "",
      tags: ["freelance", "web-dev"],
      createdAt: "2024-12-24T18:30:00Z",
    },
  ]);

  const onSubmit = (data: FormData) => {
    const selectedCategory = allCategories.find(cat => cat.id === parseInt(data.categoryId));
    const tags = data.tags ? data.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [];

    if (editingTransaction) {
      setTransactions(prev =>
        prev.map(transaction =>
          transaction.id === editingTransaction.id
            ? {
                ...transaction,
                title: data.title,
                amount: parseFloat(data.amount),
                type: data.type,
                category: selectedCategory!,
                description: data.description,
                date: data.date,
                location: data.location,
                tags,
              }
            : transaction
        )
      );
      Swal.fire({
        title: "Updated!",
        text: `Transaction "${data.title}" has been updated.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const newTransaction: Transaction = {
        id: Math.max(...transactions.map(t => t.id)) + 1,
        title: data.title,
        amount: parseFloat(data.amount),
        type: data.type,
        category: selectedCategory!,
        description: data.description,
        date: data.date,
        location: data.location,
        tags,
        createdAt: new Date().toISOString(),
      };

      setTransactions(prev => [newTransaction, ...prev]);
      Swal.fire({
        title: "Added!",
        text: `Transaction "${data.title}" has been added.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    reset();
    setEditingTransaction(null);
    setOpen(false);
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    reset({
      title: "",
      amount: "",
      type: "expense",
      categoryId: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      location: "",
      tags: "",
    });
    setOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    reset({
      title: transaction.title,
      amount: transaction.amount.toString(),
      type: transaction.type,
      categoryId: transaction.category.id.toString(),
      description: transaction.description,
      date: transaction.date,
      location: transaction.location || "",
      tags: transaction.tags.join(", "),
    });
    setOpen(true);
  };

  const handleDeleteTransaction = async (transaction: Transaction) => {
    const result = await Swal.fire({
      title: `Delete "${transaction.title}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      setTransactions(prev => prev.filter(t => t.id !== transaction.id));
      await Swal.fire({
        title: "Deleted!",
        text: `Transaction "${transaction.title}" has been deleted.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesSearch = searchQuery === "" || 
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const availableCategories = allCategories.filter(cat => cat.type === watchedType);

  const transactionStats = [
    {
      title: "Total Transactions",
      value: transactions.length.toString(),
      change: "+3 today",
      changeType: "increase",
      icon: Receipt,
      description: "All transactions",
    },
    {
      title: "This Month Income",
      value: `$${transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}`,
      change: "+12.5%",
      changeType: "increase",
      icon: TrendingUp,
      description: "Total income",
    },
    {
      title: "This Month Expenses",
      value: `$${transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0).toFixed(2)}`,
      change: "+8.2%",
      changeType: "increase",
      icon: TrendingDown,
      description: "Total expenses",
    },
    {
      title: "Net Balance",
      value: `$${(transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0) - transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}`,
      change: "+4.3%",
      changeType: "increase",
      icon: DollarSign,
      description: "Income - Expenses",
    },
  ];

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSelectedCategory = () => {
    return allCategories.find(cat => cat.id === parseInt(watchedCategoryId));
  };

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
            <p className="text-muted-foreground">Manage your income and expense transactions</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center w-fit gap-2 shadow-lg" onClick={handleAddTransaction}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTransaction ? "Update your transaction details below." : "Create a new transaction to track your income or expenses."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Transaction Title</Label>
                      <Controller
                        name="title"
                        control={control}
                        rules={{
                          required: "Transaction title is required",
                          maxLength: {
                            value: 100,
                            message: "Title cannot exceed 100 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="title"
                            placeholder="e.g., Lunch at Restaurant, Salary Payment"
                          />
                        )}
                      />
                      {errors.title && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Controller
                        name="description"
                        control={control}
                        rules={{
                          required: "Description is required",
                          maxLength: {
                            value: 300,
                            message: "Description cannot exceed 300 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="description"
                            placeholder="Provide additional details about this transaction..."
                            rows={3}
                          />
                        )}
                      />
                      {errors.description && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Controller
                        name="amount"
                        control={control}
                        rules={{
                          required: "Amount is required",
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Please enter a valid amount (e.g., 100.00)",
                          },
                          validate: (value) =>
                            parseFloat(value) > 0 || "Amount must be greater than 0",
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                          />
                        )}
                      />
                      {errors.amount && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.amount.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Transaction Type</Label>
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Transaction type is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="type" className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="expense">
                                <div className="flex items-center gap-2">
                                  <TrendingDown className="h-4 w-4 text-red-600" />
                                  Expense
                                </div>
                              </SelectItem>
                              <SelectItem value="income">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  Income
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.type && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.type.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryId">Category</Label>
                      <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="categoryId" className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  <div className="flex items-center gap-2">
                                    <category.icon className="h-4 w-4" />
                                    {category.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.categoryId && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.categoryId.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Controller
                        name="date"
                        control={control}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="date"
                            type="date"
                          />
                        )}
                      />
                      {errors.date && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Optional)</Label>
                      <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="location"
                            placeholder="e.g., Downtown Restaurant, Online"
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (Optional)</Label>
                      <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="tags"
                            placeholder="e.g., business, lunch, weekly"
                          />
                        )}
                      />
                    </div>
                  </div>
                  {(watchedCategoryId && watchedType) && (
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <Label className="text-sm font-medium mb-2 block">Preview</Label>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${getSelectedCategory()?.color} flex items-center justify-center shadow-lg`}>
                          {getSelectedCategory() && (() => {
                            const Icon = getSelectedCategory()!.icon;
                            return <Icon className="h-5 w-5 text-white" />;
                          })()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{watch("title") || "Transaction Title"}</h4>
                            <span className={`font-bold ${watchedType === "income" ? "text-green-600" : "text-red-600"}`}>
                              {watchedType === "income" ? "+" : "-"}${watch("amount") || "0.00"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{watch("description") || "Transaction description"}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {getSelectedCategory()?.name}
                            </Badge>
                            {watch("location") && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {watch("location")}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset();
                        setEditingTransaction(null);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button type="submit" className="flex items-center gap-2">
                      {editingTransaction ? (
                        <>
                          <Save className="h-4 w-4" />
                          Update Transaction
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Add Transaction
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {transactionStats.map((stat, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className={getChangeColor(stat.changeType)}>{stat.change}</span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest income and expense transactions</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No transactions found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${transaction.category.color} flex items-center justify-center shadow-lg`}>
                        <transaction.category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{transaction.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {transaction.category.name}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{transaction.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
                          {transaction.tags.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Tags className="h-3 w-3" />
                              {transaction.tags.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditTransaction(transaction)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => handleDeleteTransaction(transaction)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>


      </div>
    </Dashboard>
  );
}