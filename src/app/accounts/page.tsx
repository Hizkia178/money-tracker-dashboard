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
  Wallet,
  CreditCard,
  PiggyBank,
  Building2,
  Smartphone,
  Banknote,
  Bitcoin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Save,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

interface Account {
  id: number;
  name: string;
  type: "checking" | "savings" | "credit" | "investment" | "cash" | "crypto";
  balance: number;
  currency: string;
  icon: any;
  color: string;
  description: string;
  bankName?: string;
  accountNumber?: string;
  isActive: boolean;
  lastTransaction?: string;
  monthlyChange: number;
  changeType: "increase" | "decrease";
}

interface FormData {
  name: string;
  type: "checking" | "savings" | "credit" | "investment" | "cash" | "crypto";
  balance: string;
  currency: string;
  icon: string;
  color: string;
  description: string;
  bankName: string;
  accountNumber: string;
}

const availableIcons = [
  { value: "Wallet", label: "Wallet", icon: Wallet },
  { value: "CreditCard", label: "Credit Card", icon: CreditCard },
  { value: "PiggyBank", label: "Savings", icon: PiggyBank },
  { value: "Building2", label: "Bank", icon: Building2 },
  { value: "Smartphone", label: "Digital Wallet", icon: Smartphone },
  { value: "Banknote", label: "Cash", icon: Banknote },
  { value: "Bitcoin", label: "Cryptocurrency", icon: Bitcoin },
  { value: "DollarSign", label: "Investment", icon: DollarSign },
];

const availableColors = [
  { value: "bg-blue-500", label: "Blue", color: "bg-blue-500" },
  { value: "bg-green-500", label: "Green", color: "bg-green-500" },
  { value: "bg-purple-500", label: "Purple", color: "bg-purple-500" },
  { value: "bg-orange-500", label: "Orange", color: "bg-orange-500" },
  { value: "bg-red-500", label: "Red", color: "bg-red-500" },
  { value: "bg-indigo-500", label: "Indigo", color: "bg-indigo-500" },
  { value: "bg-pink-500", label: "Pink", color: "bg-pink-500" },
  { value: "bg-teal-500", label: "Teal", color: "bg-teal-500" },
  { value: "bg-cyan-500", label: "Cyan", color: "bg-cyan-500" },
  { value: "bg-emerald-500", label: "Emerald", color: "bg-emerald-500" },
  { value: "bg-amber-500", label: "Amber", color: "bg-amber-500" },
  { value: "bg-gray-500", label: "Gray", color: "bg-gray-500" },
];

const currencies = [
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "GBP", label: "GBP (£)", symbol: "£" },
  { value: "JPY", label: "JPY (¥)", symbol: "¥" },
  { value: "IDR", label: "IDR (Rp)", symbol: "Rp" },
];

const accountTypes = [
  { value: "checking", label: "Checking Account" },
  { value: "savings", label: "Savings Account" },
  { value: "credit", label: "Credit Card" },
  { value: "investment", label: "Investment Account" },
  { value: "cash", label: "Cash" },
  { value: "crypto", label: "Cryptocurrency" },
];

export default function Accounts() {
  const [open, setOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [showBalances, setShowBalances] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      type: "checking",
      balance: "",
      currency: "USD",
      icon: "Wallet",
      color: "bg-blue-500",
      description: "",
      bankName: "",
      accountNumber: "",
    },
  });

  const watchedIcon = watch("icon");
  const watchedColor = watch("color");

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      name: "Main Checking",
      type: "checking",
      balance: 2850.75,
      currency: "USD",
      icon: Wallet,
      color: "bg-blue-500",
      description: "Primary checking account for daily expenses",
      bankName: "Chase Bank",
      accountNumber: "****1234",
      isActive: true,
      lastTransaction: "2 hours ago",
      monthlyChange: 12.5,
      changeType: "increase",
    },
    {
      id: 2,
      name: "Emergency Fund",
      type: "savings",
      balance: 15000.00,
      currency: "USD",
      icon: PiggyBank,
      color: "bg-green-500",
      description: "Emergency savings account",
      bankName: "Bank of America",
      accountNumber: "****5678",
      isActive: true,
      lastTransaction: "1 day ago",
      monthlyChange: 8.2,
      changeType: "increase",
    },
    {
      id: 3,
      name: "Credit Card",
      type: "credit",
      balance: -1250.30,
      currency: "USD",
      icon: CreditCard,
      color: "bg-red-500",
      description: "Main credit card for purchases",
      bankName: "American Express",
      accountNumber: "****9876",
      isActive: true,
      lastTransaction: "1 hour ago",
      monthlyChange: -5.8,
      changeType: "decrease",
    },
    {
      id: 4,
      name: "Investment Portfolio",
      type: "investment",
      balance: 8750.45,
      currency: "USD",
      icon: DollarSign,
      color: "bg-purple-500",
      description: "Stock and bond investments",
      bankName: "Fidelity",
      accountNumber: "****3456",
      isActive: true,
      lastTransaction: "3 days ago",
      monthlyChange: 15.7,
      changeType: "increase",
    },
    {
      id: 5,
      name: "Digital Wallet",
      type: "cash",
      balance: 450.20,
      currency: "USD",
      icon: Smartphone,
      color: "bg-indigo-500",
      description: "PayPal and digital payments",
      bankName: "PayPal",
      accountNumber: "****7890",
      isActive: true,
      lastTransaction: "30 minutes ago",
      monthlyChange: 3.4,
      changeType: "increase",
    },
    {
      id: 6,
      name: "Crypto Wallet",
      type: "crypto",
      balance: 2100.80,
      currency: "USD",
      icon: Bitcoin,
      color: "bg-orange-500",
      description: "Bitcoin and cryptocurrency holdings",
      bankName: "Coinbase",
      accountNumber: "****btc1",
      isActive: true,
      lastTransaction: "5 hours ago",
      monthlyChange: -12.3,
      changeType: "decrease",
    },
  ]);

  const onSubmit = (data: FormData) => {
    const IconComponent = availableIcons.find((icon) => icon.value === data.icon)?.icon || Wallet;

    if (editingAccount) {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === editingAccount.id
            ? {
                ...acc,
                name: data.name,
                type: data.type,
                balance: parseFloat(data.balance),
                currency: data.currency,
                icon: IconComponent,
                color: data.color,
                description: data.description,
                bankName: data.bankName,
                accountNumber: data.accountNumber,
              }
            : acc
        )
      );
      Swal.fire({
        title: "Updated!",
        text: `${data.name} account has been updated.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const newAccount: Account = {
        id: Math.max(...accounts.map((a) => a.id)) + 1,
        name: data.name,
        type: data.type,
        balance: parseFloat(data.balance),
        currency: data.currency,
        icon: IconComponent,
        color: data.color,
        description: data.description,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        isActive: true,
        lastTransaction: "Just now",
        monthlyChange: 0,
        changeType: "increase",
      };

      setAccounts((prev) => [...prev, newAccount]);
      Swal.fire({
        title: "Created!",
        text: `${data.name} account has been created.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    reset();
    setEditingAccount(null);
    setOpen(false);
  };

  const handleAddAccount = () => {
    setEditingAccount(null);
    reset({
      name: "",
      type: "checking",
      balance: "",
      currency: "USD",
      icon: "Wallet",
      color: "bg-blue-500",
      description: "",
      bankName: "",
      accountNumber: "",
    });
    setOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    reset({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      currency: account.currency,
      icon: availableIcons.find((icon) => icon.icon === account.icon)?.value || "Wallet",
      color: account.color,
      description: account.description,
      bankName: account.bankName || "",
      accountNumber: account.accountNumber || "",
    });
    setOpen(true);
  };

  const handleDeleteAccount = async (account: Account) => {
    const result = await Swal.fire({
      title: `Delete ${account.name}?`,
      text: "This action cannot be undone. All transactions in this account will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      setAccounts((prev) => prev.filter((acc) => acc.id !== account.id));
      await Swal.fire({
        title: "Deleted!",
        text: `${account.name} account has been deleted.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const toggleAccountStatus = (accountId: number) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, isActive: !acc.isActive } : acc
      )
    );
  };

  const getTotalBalance = () => {
    return accounts
      .filter((acc) => acc.type !== "credit")
      .reduce((sum, acc) => sum + acc.balance, 0);
  };

  const getTotalDebt = () => {
    return accounts
      .filter((acc) => acc.type === "credit")
      .reduce((sum, acc) => sum + Math.abs(acc.balance), 0);
  };

  const getNetWorth = () => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  };

  const getCurrencySymbol = (currency: string) => {
    return currencies.find((c) => c.value === currency)?.symbol || "$";
  };

  const formatBalance = (balance: number, currency: string) => {
    if (!showBalances) return "****";
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "checking": return "bg-blue-100 text-blue-800";
      case "savings": return "bg-green-100 text-green-800";
      case "credit": return "bg-red-100 text-red-800";
      case "investment": return "bg-purple-100 text-purple-800";
      case "cash": return "bg-gray-100 text-gray-800";
      case "crypto": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPreviewIcon = () => {
    const IconComponent = availableIcons.find((icon) => icon.value === watchedIcon)?.icon || Wallet;
    return IconComponent;
  };

  const accountStats = [
    {
      title: "Total Assets",
      value: formatBalance(getTotalBalance(), "USD"),
      change: "+$250.30",
      changeType: "increase",
      icon: TrendingUp,
      description: "Across all accounts",
    },
    {
      title: "Total Debt",
      value: formatBalance(getTotalDebt(), "USD"),
      change: "-$50.20",
      changeType: "decrease",
      icon: TrendingDown,
      description: "Credit cards",
    },
    {
      title: "Net Worth",
      value: formatBalance(getNetWorth(), "USD"),
      change: "+$300.50",
      changeType: "increase",
      icon: Target,
      description: "Assets - Debt",
    },
    {
      title: "Active Accounts",
      value: accounts.filter(acc => acc.isActive).length.toString(),
      change: "6 of 6",
      changeType: "stable",
      icon: Activity,
      description: "Currently active",
    },
  ];

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      case "stable":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Accounts</h2>
            <p className="text-muted-foreground">Manage your wallets, bank accounts, and financial assets</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center gap-2"
            >
              {showBalances ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide Balances
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show Balances
                </>
              )}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center w-fit gap-2 shadow-lg" onClick={handleAddAccount}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    {editingAccount ? "Edit Account" : "Add New Account"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingAccount ? "Update your account details below." : "Create a new account to track your finances."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Account Name</Label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Account name is required",
                          maxLength: {
                            value: 50,
                            message: "Account name cannot exceed 50 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="name"
                            placeholder="e.g., Main Checking, Emergency Fund"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Account Type</Label>
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Account type is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="type" className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {accountTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="balance">Current Balance</Label>
                      <Controller
                        name="balance"
                        control={control}
                        rules={{
                          required: "Balance is required",
                          pattern: {
                            value: /^-?\d+(\.\d{1,2})?$/,
                            message: "Please enter a valid amount (e.g., 1000.00)",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="balance"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                          />
                        )}
                      />
                      {errors.balance && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.balance.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Controller
                        name="currency"
                        control={control}
                        rules={{ required: "Currency is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="currency" className="w-full">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                  {currency.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.currency && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.currency.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        required: "Description is required",
                        maxLength: {
                          value: 200,
                          message: "Description cannot exceed 200 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Describe this account's purpose..."
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank/Institution</Label>
                      <Controller
                        name="bankName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="bankName"
                            placeholder="e.g., Chase Bank, PayPal"
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Controller
                        name="accountNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="accountNumber"
                            placeholder="e.g., ****1234"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon</Label>
                      <Controller
                        name="icon"
                        control={control}
                        rules={{ required: "Icon is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="icon" className="w-full">
                              <SelectValue placeholder="Select icon" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableIcons.map((icon) => (
                                <SelectItem key={icon.value} value={icon.value}>
                                  <div className="flex items-center gap-2">
                                    <icon.icon className="h-4 w-4" />
                                    {icon.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.icon && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.icon.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Controller
                        name="color"
                        control={control}
                        rules={{ required: "Color is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="color" className="w-full">
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableColors.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full ${color.color}`}></div>
                                    {color.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.color && (
                        <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.color.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <Label className="text-sm font-medium mb-2 block">Preview</Label>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${watchedColor} flex items-center justify-center shadow-lg`}>
                        {(() => {
                          const IconComponent = getPreviewIcon();
                          return <IconComponent className="h-5 w-5 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h4 className="font-medium">{watch("name") || "Account Name"}</h4>
                        <p className="text-xs text-muted-foreground">{watch("description") || "Account description"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset();
                        setEditingAccount(null);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button type="submit" className="flex items-center gap-2">
                      {editingAccount ? (
                        <>
                          <Save className="h-4 w-4" />
                          Update Account
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Create Account
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
          {accountStats.map((stat, index) => (
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

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-green-600" />
                    Asset Accounts
                  </CardTitle>
                  <CardDescription>Your savings, checking, and investment accounts</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs w-fit">
                  {accounts.filter(acc => acc.type !== "credit").length} Accounts
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {accounts.filter(acc => acc.type !== "credit").map((account) => (
                  <div key={account.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${account.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <account.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h4 className="font-medium text-sm sm:text-base truncate">{account.name}</h4>
                            <Badge className={`${getAccountTypeColor(account.type)} text-xs w-fit`} variant="secondary">
                              {accountTypes.find(t => t.value === account.type)?.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{account.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                            <span className="text-xs text-muted-foreground truncate">{account.bankName}</span>
                            <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                            <span className="text-xs text-muted-foreground">{account.accountNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleAccountStatus(account.id)}
                        >
                          {account.isActive ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => handleDeleteAccount(account)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-green-600 truncate">
                          {formatBalance(account.balance, account.currency)}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {account.changeType === "increase" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm ${account.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                            {account.monthlyChange.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span className="text-xs text-muted-foreground truncate">Last: {account.lastTransaction}</span>
                        <Badge variant={account.isActive ? "default" : "secondary"} className="text-xs w-fit">
                          {account.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Total Assets</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {formatBalance(getTotalBalance(), "USD")}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Across {accounts.filter(acc => acc.type !== "credit").length} asset accounts
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-red-600" />
                    Credit Accounts
                  </CardTitle>
                  <CardDescription>Your credit cards and debt accounts</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs w-fit">
                  {accounts.filter(acc => acc.type === "credit").length} Cards
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {accounts.filter(acc => acc.type === "credit").map((account) => (
                  <div key={account.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${account.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <account.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h4 className="font-medium text-sm sm:text-base truncate">{account.name}</h4>
                            <Badge className={`${getAccountTypeColor(account.type)} text-xs w-fit`} variant="secondary">
                              Credit Card
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{account.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                            <span className="text-xs text-muted-foreground truncate">{account.bankName}</span>
                            <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                            <span className="text-xs text-muted-foreground">{account.accountNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleAccountStatus(account.id)}
                        >
                          {account.isActive ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => handleDeleteAccount(account)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-red-600 truncate">
                          -{formatBalance(Math.abs(account.balance), account.currency)}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {account.changeType === "decrease" ? (
                            <ArrowDownRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm ${account.changeType === "decrease" ? "text-green-600" : "text-red-600"}`}>
                            {Math.abs(account.monthlyChange).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span className="text-xs text-muted-foreground truncate">Last: {account.lastTransaction}</span>
                        <Badge variant={account.isActive ? "default" : "secondary"} className="text-xs w-fit">
                          {account.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-800">Total Credit Debt</span>
                  <CreditCard className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {formatBalance(getTotalDebt(), "USD")}
                </div>
                <div className="text-xs text-red-600 mt-1">
                  Across {accounts.filter(acc => acc.type === "credit").length} credit accounts
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Account Overview
            </CardTitle>
            <CardDescription>Summary of all your financial accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-green-600" />
                  Savings & Checking
                </h4>
                {accounts.filter(acc => acc.type === "checking" || acc.type === "savings").map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${account.color} flex items-center justify-center`}>
                        <account.icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">{account.name}</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {formatBalance(account.balance, account.currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  Investments & Crypto
                </h4>
                {accounts.filter(acc => acc.type === "investment" || acc.type === "crypto").map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${account.color} flex items-center justify-center`}>
                        <account.icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">{account.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-purple-600">
                        {formatBalance(account.balance, account.currency)}
                      </span>
                      {account.changeType === "increase" ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600" />
                  Cash & Digital
                </h4>
                {accounts.filter(acc => acc.type === "cash").map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${account.color} flex items-center justify-center`}>
                        <account.icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">{account.name}</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {formatBalance(account.balance, account.currency)}
                    </span>
                  </div>
                ))}
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-800">Net Worth</span>
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {formatBalance(getNetWorth(), "USD")}
                  </div>
                  <div className="text-xs text-blue-600">
                    Total assets minus debt
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
}