"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "../Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ShoppingCart,
  Car,
  Film,
  GraduationCap,
  Heart,
  Zap,
  Dumbbell,
  Coffee,
  Briefcase,
  Gift,
  Home,
  Plane,
  Music,
  GamepadIcon,
  Shirt,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle,
  Save,
  XCircle,
  PiggyBank,
  Utensils,
  Building,
  Book,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

interface Category {
  id: number;
  name: string;
  icon: any;
  color: string;
  totalSpent?: number;
  totalAmount?: number;
  budget?: number;
  transactionCount: number;
  percentage?: number;
  description: string;
  type: "expense" | "income";
}

interface FormData {
  name: string;
  description: string;
  type: "expense" | "income";
  icon: string;
  color: string;
  budget: string;
}

const availableIcons = [
  { value: "Coffee", label: "Coffee", icon: Coffee },
  { value: "Car", label: "Car", icon: Car },
  { value: "Film", label: "Film", icon: Film },
  { value: "ShoppingCart", label: "Shopping Cart", icon: ShoppingCart },
  { value: "Heart", label: "Heart", icon: Heart },
  { value: "GraduationCap", label: "Education", icon: GraduationCap },
  { value: "Zap", label: "Utilities", icon: Zap },
  { value: "Dumbbell", label: "Fitness", icon: Dumbbell },
  { value: "Home", label: "Home", icon: Home },
  { value: "Plane", label: "Travel", icon: Plane },
  { value: "Briefcase", label: "Business", icon: Briefcase },
  { value: "Gift", label: "Gift", icon: Gift },
  { value: "Music", label: "Music", icon: Music },
  { value: "GamepadIcon", label: "Gaming", icon: GamepadIcon },
  { value: "Shirt", label: "Clothing", icon: Shirt },
  { value: "DollarSign", label: "Money", icon: DollarSign },
  { value: "PiggyBank", label: "Savings", icon: PiggyBank },
  { value: "Utensils", label: "Food", icon: Utensils },
  { value: "Building", label: "Building", icon: Building },
  { value: "Book", label: "Book", icon: Book },
];

const availableColors = [
  { value: "bg-orange-500", label: "Orange", color: "bg-orange-500" },
  { value: "bg-blue-500", label: "Blue", color: "bg-blue-500" },
  { value: "bg-purple-500", label: "Purple", color: "bg-purple-500" },
  { value: "bg-pink-500", label: "Pink", color: "bg-pink-500" },
  { value: "bg-red-500", label: "Red", color: "bg-red-500" },
  { value: "bg-green-500", label: "Green", color: "bg-green-500" },
  { value: "bg-yellow-500", label: "Yellow", color: "bg-yellow-500" },
  { value: "bg-cyan-500", label: "Cyan", color: "bg-cyan-500" },
  { value: "bg-indigo-500", label: "Indigo", color: "bg-indigo-500" },
  { value: "bg-teal-500", label: "Teal", color: "bg-teal-500" },
  { value: "bg-gray-500", label: "Gray", color: "bg-gray-500" },
  { value: "bg-emerald-500", label: "Emerald", color: "bg-emerald-500" },
];

export default function Categories() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      type: "expense",
      icon: "Coffee",
      color: "bg-orange-500",
      budget: "",
    },
  });

  const watchedIcon = watch("icon");
  const watchedColor = watch("color");

  const [expenseCategories, setExpenseCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Food & Dining",
      icon: Coffee,
      color: "bg-orange-500",
      totalSpent: 485.50,
      budget: 600,
      transactionCount: 24,
      percentage: 80.9,
      description: "Restaurants, groceries, coffee",
      type: "expense",
    },
    {
      id: 2,
      name: "Transportation",
      icon: Car,
      color: "bg-blue-500",
      totalSpent: 240.30,
      budget: 300,
      transactionCount: 12,
      percentage: 80.1,
      description: "Gas, uber, public transport",
      type: "expense",
    },
    {
      id: 3,
      name: "Entertainment",
      icon: Film,
      color: "bg-purple-500",
      totalSpent: 135.99,
      budget: 150,
      transactionCount: 8,
      percentage: 90.7,
      description: "Movies, streaming, games",
      type: "expense",
    },
    {
      id: 4,
      name: "Shopping",
      icon: ShoppingCart,
      color: "bg-pink-500",
      totalSpent: 387.89,
      budget: 400,
      transactionCount: 15,
      percentage: 97.0,
      description: "Clothes, electronics, misc",
      type: "expense",
    },
    {
      id: 5,
      name: "Healthcare",
      icon: Heart,
      color: "bg-red-500",
      totalSpent: 125.50,
      budget: 200,
      transactionCount: 5,
      percentage: 62.8,
      description: "Medical, pharmacy, insurance",
      type: "expense",
    },
    {
      id: 6,
      name: "Education",
      icon: GraduationCap,
      color: "bg-green-500",
      totalSpent: 89.99,
      budget: 150,
      transactionCount: 3,
      percentage: 60.0,
      description: "Courses, books, training",
      type: "expense",
    },
    {
      id: 7,
      name: "Utilities",
      icon: Zap,
      color: "bg-yellow-500",
      totalSpent: 165.75,
      budget: 200,
      transactionCount: 6,
      percentage: 82.9,
      description: "Electric, water, internet",
      type: "expense",
    },
    {
      id: 8,
      name: "Health & Fitness",
      icon: Dumbbell,
      color: "bg-cyan-500",
      totalSpent: 99.98,
      budget: 120,
      transactionCount: 7,
      percentage: 83.3,
      description: "Gym, supplements, sports",
      type: "expense",
    },
    {
      id: 9,
      name: "Housing",
      icon: Home,
      color: "bg-indigo-500",
      totalSpent: 1250.00,
      budget: 1300,
      transactionCount: 2,
      percentage: 96.2,
      description: "Rent, maintenance, furniture",
      type: "expense",
    },
    {
      id: 10,
      name: "Travel",
      icon: Plane,
      color: "bg-teal-500",
      totalSpent: 0.00,
      budget: 300,
      transactionCount: 0,
      percentage: 0,
      description: "Flights, hotels, vacation",
      type: "expense",
    },
  ]);

  const [incomeCategories, setIncomeCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Salary",
      icon: Briefcase,
      color: "bg-green-600",
      totalAmount: 2600.00,
      transactionCount: 1,
      percentage: 83.9,
      description: "Primary job income",
      type: "income",
    },
    {
      id: 2,
      name: "Freelance",
      icon: DollarSign,
      color: "bg-blue-600",
      totalAmount: 350.00,
      transactionCount: 2,
      percentage: 11.3,
      description: "Contract work, projects",
      type: "income",
    },
    {
      id: 3,
      name: "Investment",
      icon: TrendingUp,
      color: "bg-purple-600",
      totalAmount: 125.00,
      transactionCount: 1,
      percentage: 4.0,
      description: "Dividends, stocks, crypto",
      type: "income",
    },
    {
      id: 4,
      name: "Side Business",
      icon: Gift,
      color: "bg-orange-600",
      totalAmount: 25.00,
      transactionCount: 1,
      percentage: 0.8,
      description: "Business income, sales",
      type: "income",
    },
  ]);

  const onSubmit = (data: FormData) => {
    const IconComponent = availableIcons.find((icon) => icon.value === data.icon)?.icon || Coffee;

    if (editingCategory) {
      if (editingCategory.type === "expense") {
        setExpenseCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id
              ? {
                  ...cat,
                  name: data.name,
                  description: data.description,
                  icon: IconComponent,
                  color: data.color,
                  budget: data.budget ? parseFloat(data.budget) : cat.budget,
                  percentage: data.budget ? (cat.totalSpent || 0) / parseFloat(data.budget) * 100 : cat.percentage,
                }
              : cat
          )
        );
      } else {
        setIncomeCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id
              ? {
                  ...cat,
                  name: data.name,
                  description: data.description,
                  icon: IconComponent,
                  color: data.color,
                }
              : cat
          )
        );
      }
      Swal.fire({
        title: "Updated!",
        text: `${data.name} category has been updated.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const newCategory: Category = {
        id: Math.max(...expenseCategories.map((c) => c.id), ...incomeCategories.map((c) => c.id)) + 1,
        name: data.name,
        icon: IconComponent,
        color: data.color,
        description: data.description,
        transactionCount: 0,
        type: data.type as "expense" | "income",
      };

      if (data.type === "expense") {
        setExpenseCategories((prev) => [
          ...prev,
          {
            ...newCategory,
            totalSpent: 0,
            budget: data.budget ? parseFloat(data.budget) : 0,
            percentage: 0,
          },
        ]);
      } else {
        setIncomeCategories((prev) => [
          ...prev,
          {
            ...newCategory,
            totalAmount: 0,
            percentage: 0,
          },
        ]);
      }
      Swal.fire({
        title: "Created!",
        text: `${data.name} category has been created.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    reset();
    setEditingCategory(null);
    setOpen(false);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    reset({
      name: "",
      description: "",
      type: "expense",
      icon: "Coffee",
      color: "bg-orange-500",
      budget: "",
    });
    setOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    reset({
      name: category.name,
      description: category.description,
      type: category.type,
      icon: availableIcons.find((icon) => icon.icon === category.icon)?.value || "Coffee",
      color: category.color,
      budget: category.type === "expense" && category.budget ? category.budget.toString() : "",
    });
    setOpen(true);
  };

  const handleDeleteCategory = async (category: Category) => {
    const result = await Swal.fire({
      title: `Delete ${category.name}?`,
      text: "This action cannot be undone. All transactions in this category will be moved to 'Uncategorized'.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      if (category.type === "expense") {
        setExpenseCategories((prev) => prev.filter((cat) => cat.id !== category.id));
      } else {
        setIncomeCategories((prev) => prev.filter((cat) => cat.id !== category.id));
      }
      await Swal.fire({
        title: "Deleted!",
        text: `${category.name} category has been deleted.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const categoryStats = [
    {
      title: "Total Categories",
      value: (expenseCategories.length + incomeCategories.length).toString(),
      change: "+2 new",
      changeType: "increase",
      icon: PieChart,
      description: "Active categories",
    },
    {
      title: "Highest Spending",
      value: "Housing",
      change: "96.2% of budget",
      changeType: "warning",
      icon: Home,
      description: "$1,250 spent",
    },
    {
      title: "Best Performer",
      value: "Travel",
      change: "Under budget",
      changeType: "increase",
      icon: Target,
      description: "$0 spent",
    },
    {
      title: "Avg Budget Usage",
      value: "72.8%",
      change: "+5.2%",
      changeType: "increase",
      icon: BarChart3,
      description: "Across all categories",
    },
  ];

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 90) return { variant: "destructive" as const, label: "Over Budget" };
    if (percentage >= 80) return { variant: "secondary" as const, label: "Near Limit" };
    if (percentage >= 60) return { variant: "default" as const, label: "On Track" };
    return { variant: "outline" as const, label: "Under Budget" };
  };

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

  const getPreviewIcon = () => {
    const IconComponent = availableIcons.find((icon) => icon.value === watchedIcon)?.icon || Coffee;
    return IconComponent;
  };

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
            <p className="text-muted-foreground">Manage your income and expense categories</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center w-fit gap-2 shadow-lg" onClick={handleAddCategory}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory ? "Update your category details below." : "Create a new category to organize your transactions."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name</Label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Category name is required",
                          maxLength: {
                            value: 50,
                            message: "Category name cannot exceed 50 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="name"
                            placeholder="e.g., Food & Dining, Salary"
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
                            placeholder="Describe what this category includes..."
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
                      <Label htmlFor="type">Category Type</Label>
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Category type is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="type" className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="expense">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-red-600" />
                                  Expense
                                </div>
                              </SelectItem>
                              <SelectItem value="income">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-green-600" />
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
                    {watch("type") === "expense" && (
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget (Optional)</Label>
                        <Controller
                          name="budget"
                          control={control}
                          rules={{
                            pattern: {
                              value: /^\d+(\.\d{1,2})?$/,
                              message: "Please enter a valid amount (e.g., 100.00)",
                            },
                            validate: (value) =>
                              !value || parseFloat(value) > 0 || "Budget must be greater than 0",
                          }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="budget"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                            />
                          )}
                        />
                        {errors.budget && (
                          <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.budget.message}
                          </p>
                        )}
                      </div>
                    )}
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
                        <h4 className="font-medium">{watch("name") || "Category Name"}</h4>
                        <p className="text-xs text-muted-foreground">{watch("description") || "Category description"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset();
                        setEditingCategory(null);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button type="submit" className="flex items-center gap-2">
                      {editingCategory ? (
                        <>
                          <Save className="h-4 w-4" />
                          Update Category
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Create Category
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
          {categoryStats.map((stat, index) => (
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
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Expense Categories</CardTitle>
                  <CardDescription>Your spending categories and budget progress</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {expenseCategories.length} Categories
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-200">
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center shadow-lg`}>
                            <category.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-xs text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditCategory(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => handleDeleteCategory(category)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>${(category.totalSpent || 0).toFixed(2)} / ${(category.budget || 0).toFixed(2)}</span>
                          <Badge {...getBudgetStatus(category.percentage || 0)} className="text-xs">
                            {Math.round(category.percentage || 0)}%
                          </Badge>
                        </div>
                        <Progress value={category.percentage || 0} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{category.transactionCount} transactions</span>
                          <span>${((category.budget || 0) - (category.totalSpent || 0)).toFixed(2)} remaining</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Income Categories</CardTitle>
                  <CardDescription>Your income sources and distribution</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {incomeCategories.length} Sources
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeCategories.map((category) => (
                  <div key={category.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center shadow-lg`}>
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-xs text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          ${(category.totalAmount || 0).toFixed(2)}
                        </span>
                        <Badge variant="default" className="text-xs bg-green-500">
                          {(category.percentage || 0).toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {category.transactionCount} transactions this month
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">Total Monthly Income</span>
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${incomeCategories.reduce((sum, cat) => sum + (cat.totalAmount || 0), 0).toFixed(2)}
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    From {incomeCategories.reduce((sum, cat) => sum + cat.transactionCount, 0)} transactions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Category Performance Overview
            </CardTitle>
            <CardDescription>Monthly spending vs budget analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {expenseCategories.slice(0, 6).map((category) => (
                <div key={category.id} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full ${category.color} flex items-center justify-center`}>
                      <category.icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    ${(category.totalSpent || 0).toFixed(2)} of ${(category.budget || 0).toFixed(2)}
                  </div>
                  <Progress value={category.percentage || 0} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
}