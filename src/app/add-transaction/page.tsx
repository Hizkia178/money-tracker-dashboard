"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { Dashboard } from "../Dashboard";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingCart,
  Car,
  Home,
  Briefcase,
  Heart,
  Zap,
  Film,
  Gift,
  AlertCircle,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";

interface Category {
  value: string;
  label: string;
}

interface Transaction {
  id: number;
  type: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status: string;
}

interface FormData {
  type: string;
  amount: string;
  category: string;
  description: string;
  date: string;
  status: string;
}

interface Categories {
  income: Category[];
  expense: Category[];
}

export default function AddTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [open, setOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      type: "",
      amount: "",
      category: "",
      description: "",
      date: "",
      status: "completed",
    },
  });

  const selectedType = watch("type");

  const categoryIcons = {
    salary: Briefcase,
    freelance: Briefcase,
    investment: TrendingUp,
    business: Briefcase,
    rent: Home,
    groceries: ShoppingCart,
    utilities: Zap,
    transport: Car,
    entertainment: Film,
    healthcare: Heart,
    other: Gift,
  };

  const getCategoryIcon = (category: string) => {
    return categoryIcons[category as keyof typeof categoryIcons] || Gift;
  };

  const transactionTypes = [
    { value: "income", label: "Income", icon: TrendingUp, color: "text-green-600" },
    { value: "expense", label: "Expense", icon: TrendingDown, color: "text-red-600" },
  ];

  const categories: Categories = {
    income: [
      { value: "salary", label: "Salary" },
      { value: "freelance", label: "Freelance" },
      { value: "investment", label: "Investment" },
      { value: "business", label: "Business" },
      { value: "other", label: "Other" },
    ],
    expense: [
      { value: "rent", label: "Rent" },
      { value: "groceries", label: "Groceries" },
      { value: "utilities", label: "Utilities" },
      { value: "transport", label: "Transport" },
      { value: "entertainment", label: "Entertainment" },
      { value: "healthcare", label: "Healthcare" },
      { value: "other", label: "Other" },
    ],
  };

  const statusOptions = [
    { value: "all", label: "All Status", color: "bg-gray-100 text-gray-800", icon: Activity },
    { value: "completed", label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
  ];

  const onSubmit = (data: FormData) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      ...data,
      amount: parseFloat(data.amount),
    };
    setTransactions([newTransaction, ...transactions]);
    reset();
    setOpen(false);
  };

  const handleDelete = (transaction: Transaction) => {
    Swal.fire({
      title: "Manage Transaction",
      html: `
        <div class="text-left sm:text-start text-sm text-gray-600">
          You are about to delete the following transaction:
          <div class="mt-2 space-y-1">
            <div><strong>Description:</strong> ${transaction.description}</div>
            <div><strong>Amount:</strong> $${transaction.amount.toFixed(2)}</div>
            <div><strong>Category:</strong> ${transaction.category.replace(/([A-Z])/g, " $1").trim()}</div>
            <div><strong>Date:</strong> ${transaction.date}</div>
            <div><strong>Status:</strong> ${statusOptions.find((s) => s.value === transaction.status)?.label}</div>
          </div>
          <div class="flex items-center gap-2 mt-3 text-red-600 flex-wrap">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="inline-block bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded max-w-[80%]">
              Warning: This action is permanent and cannot be undone.
            </span>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Close",
      confirmButtonText: "Delete Transaction",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: "max-w-[90vw] sm:max-w-lg",
        htmlContainer: "text-left sm:text-start",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setTransactions(transactions.filter((t) => t.id !== transaction.id));
      }
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const stats = [
    {
      title: "Total Balance",
      value: `$${balance.toFixed(2)}`,
      icon: Wallet,
      color: balance >= 0 ? "text-green-600" : "text-red-600",
      change: "0.0%",
      changeType: "increase",
      description: "Across all accounts",
    },
    {
      title: "Total Income",
      value: `$${totalIncome.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-green-600",
      change: "0.0%",
      changeType: "increase",
      description: "This month",
    },
    {
      title: "Total Expenses",
      value: `$${totalExpense.toFixed(2)}`,
      icon: TrendingDown,
      color: "text-red-600",
      change: "0.0%",
      changeType: "decrease",
      description: "This month",
    },
    {
      title: "Transactions",
      value: transactions.length.toString(),
      icon: Activity,
      color: "text-blue-600",
      change: "0.0%",
      changeType: "increase",
      description: "Total count",
    },
  ];

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
            <p className="text-muted-foreground">Manage your income and expenses efficiently</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center w-fit gap-2 shadow-lg">
                  <Plus className="h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Transaction
                  </DialogTitle>
                  <DialogDescription>
                    Fill out the form below to add a new transaction record to your tracker.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Transaction Type</Label>
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Transaction type is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id="type" className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {transactionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <type.icon className={`h-4 w-4 ${type.color}`} />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              ))}
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
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Controller
                        name="amount"
                        control={control}
                        rules={{
                          required: "Amount is required",
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Please enter a valid amount",
                          },
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            disabled={!selectedType}
                          >
                            <SelectTrigger id="category" className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedType &&
                                categories[selectedType as keyof Categories]?.map((category: Category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    <div className="flex items-center gap-2">
                                      {(() => {
                                        const CategoryIcon = getCategoryIcon(category.value);
                                        return <CategoryIcon className="h-4 w-4" />;
                                      })()}
                                      {category.label}
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.category && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Controller
                        name="date"
                        control={control}
                        rules={{ 
                          required: "Date is required",
                          pattern: {
                            value: /^\d{4}-\d{2}-\d{2}$/,
                            message: "Date must be in YYYY-MM-DD format"
                          }
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="date"
                            type="date"
                            placeholder="YYYY-MM-DD"
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
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.slice(1).map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                <div className="flex items-center gap-2">
                                  <status.icon className="h-4 w-4" />
                                  {status.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Add a description for this transaction..."
                          rows={3}
                          className="h-30"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Add Transaction
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={`stat-${index}`} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-start space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.changeType === "increase" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Complete history of your financial activities</CardDescription>
                </div>
                <div className="gap-2 hidden sm:flex">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            <status.icon className="h-4 w-4" />
                            {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Search by description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[200px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {filteredTransactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <XCircle className="h-12 w-12 mb-4" />
                    <p className="text-lg font-medium">No Transactions Found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTransactions.map((transaction) => {
                      const CategoryIcon = getCategoryIcon(transaction.category);
                      return (
                        <div
                          key={`transaction-${transaction.id}`}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleDelete(transaction)}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-2 h-8 rounded-full shadow-lg ${transaction.type === "income" ? "bg-green-500" : "bg-red-500"}`}
                            />
                            <div>
                              <p className="text-sm font-medium">{transaction.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={transaction.type === "income" ? "default" : "secondary"}
                                  className="text-xs flex items-center gap-1"
                                >
                                  <CategoryIcon className="h-3 w-3" />
                                  {transaction.category.replace(/([A-Z])/g, " $1").trim()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={statusOptions.find((s) => s.value === transaction.status)?.color}
                              variant="secondary"
                            >
                              {statusOptions.find((s) => s.value === transaction.status)?.label}
                            </Badge>
                            <p
                              className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.type === "income" ? "+" : "-"}$
                              {transaction.amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Transaction Status</CardTitle>
              <CardDescription>Status breakdown of your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {statusOptions.slice(1).map((status) => {
                  const count = transactions.filter((t) => t.status === status.value).length;
                  const percentage = transactions.length ? (count / transactions.length) * 100 : 0;
                  return (
                    <div key={`status-${status.value}`} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <status.icon className="h-4 w-4" />
                          <span className="font-medium">{status.label}</span>
                        </div>
                        <span className="text-muted-foreground">{count} transactions</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {percentage.toFixed(1)}% of all transactions
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
}