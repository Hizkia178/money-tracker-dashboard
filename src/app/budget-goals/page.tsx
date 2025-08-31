"use client";

import { useState } from "react";
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
import {
  Plus,
  Target,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Trophy,
  Zap,
  Car,
  Home,
  ShoppingCart,
  Heart,
  Briefcase,
  GraduationCap,
  Plane,
  Gift,
  Edit,
  Trash2,
  PiggyBank,
  Save,
  XCircle,
  Flame,
  Star,
  Check,
  Calendar,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";

interface BudgetGoal {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline: string;
  status: string;
  priority: string;
}

interface GoalCategory {
  value: string;
  label: string;
  icon: any;
  color: string;
}

interface GoalStatus {
  value: string;
  label: string;
  icon: any;
  color: string;
}

interface GoalPriority {
  value: string;
  label: string;
  color: string;
  icon: any;
}

interface FormData {
  title: string;
  description: string;
  targetAmount: string;
  currentAmount: string;
  category: string;
  deadline: string;
  status: string;
  priority: string;
}

export default function BudgetGoals() {
  const [goals, setGoals] = useState<BudgetGoal[]>([
    {
      id: 1,
      title: "Emergency Fund",
      description: "Build an emergency fund for unexpected expenses",
      targetAmount: 10000,
      currentAmount: 3500,
      category: "savings",
      deadline: "2025-12-31",
      status: "active",
      priority: "high",
    },
    {
      id: 2,
      title: "New Car",
      description: "Save for a new electric vehicle",
      targetAmount: 25000,
      currentAmount: 8200,
      category: "transport",
      deadline: "2026-06-30",
      status: "active",
      priority: "medium",
    },
    {
      id: 3,
      title: "Vacation to Europe",
      description: "Family trip to Europe for 2 weeks",
      targetAmount: 8000,
      currentAmount: 8000,
      category: "travel",
      deadline: "2025-07-15",
      status: "completed",
      priority: "low",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<BudgetGoal | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      targetAmount: "",
      currentAmount: "",
      category: "",
      deadline: "",
      status: "active",
      priority: "medium",
    },
  });

  const goalCategories: GoalCategory[] = [
    { value: "savings", label: "Savings", icon: PiggyBank, color: "text-blue-600" },
    { value: "transport", label: "Transport", icon: Car, color: "text-purple-600" },
    { value: "housing", label: "Housing", icon: Home, color: "text-green-600" },
    { value: "education", label: "Education", icon: GraduationCap, color: "text-indigo-600" },
    { value: "travel", label: "Travel", icon: Plane, color: "text-orange-600" },
    { value: "shopping", label: "Shopping", icon: ShoppingCart, color: "text-pink-600" },
    { value: "health", label: "Health", icon: Heart, color: "text-red-600" },
    { value: "business", label: "Business", icon: Briefcase, color: "text-gray-600" },
    { value: "other", label: "Other", icon: Gift, color: "text-yellow-600" },
  ];

  const goalStatuses: GoalStatus[] = [
    { value: "active", label: "Active", icon: Clock, color: "bg-blue-100 text-blue-800" },
    { value: "completed", label: "Completed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
    { value: "paused", label: "Paused", icon: AlertCircle, color: "bg-yellow-100 text-yellow-800" },
  ];

  const goalPriorities: GoalPriority[] = [
    { value: "high", label: "High", color: "bg-red-100 text-red-800", icon: Flame },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800", icon: Star },
    { value: "low", label: "Low", color: "bg-green-100 text-green-800", icon: Check },
  ];

  const onSubmit = (data: FormData) => {
    if (editingGoal) {
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoal.id
            ? {
                ...goal,
                title: data.title,
                description: data.description,
                targetAmount: parseFloat(data.targetAmount),
                currentAmount: parseFloat(data.currentAmount),
                category: data.category,
                deadline: data.deadline,
                status: data.status,
                priority: data.priority,
              }
            : goal
        )
      );
      setEditingGoal(null);
    } else {
      const newGoal: BudgetGoal = {
        id: goals.length + 1,
        title: data.title,
        description: data.description,
        targetAmount: parseFloat(data.targetAmount),
        currentAmount: parseFloat(data.currentAmount),
        category: data.category,
        deadline: data.deadline,
        status: data.status,
        priority: data.priority,
      };
      setGoals([newGoal, ...goals]);
    }
    reset();
    setOpen(false);
  };

  const handleEdit = (goal: BudgetGoal) => {
    setEditingGoal(goal);
    reset({
      title: goal.title,
      description: goal.description,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      category: goal.category,
      deadline: goal.deadline,
      status: goal.status,
      priority: goal.priority,
    });
    setOpen(true);
  };

  const handleDelete = (goalId: number) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const activeGoals = goals.filter((g) => g.status === "active").length;
  const totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  const stats = [
    {
      title: "Total Goals",
      value: totalGoals.toString(),
      icon: Target,
      color: "text-blue-600",
      description: "Goals created",
    },
    {
      title: "Active Goals",
      value: activeGoals.toString(),
      icon: Zap,
      color: "text-orange-600",
      description: "In progress",
    },
    {
      title: "Completed",
      value: completedGoals.toString(),
      icon: Trophy,
      color: "text-green-600",
      description: "Goals achieved",
    },
    {
      title: "Total Progress",
      value: `${overallProgress.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      description: "Overall completion",
    },
  ];

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Budget Goals</h2>
            <p className="text-muted-foreground">Set and track your financial objectives</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center w-fit gap-2 shadow-lg">
                <Plus className="h-4 w-4" />
                Add Budget Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {editingGoal ? "Edit Goal" : "Add New Budget Goal"}
                </DialogTitle>
                <DialogDescription>
                  {editingGoal ? "Update your budget goal details below." : "Create a new financial goal to track your progress."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Goal Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Goal title is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="title"
                          placeholder="e.g., Emergency Fund, New Car"
                        />
                      )}
                    />
                    {errors.title && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
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
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Describe your goal in detail..."
                          rows={3}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount</Label>
                    <Controller
                      name="targetAmount"
                      control={control}
                      rules={{
                        required: "Target amount is required",
                        pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Invalid amount format" },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="targetAmount"
                          type="number"
                          step="0.01"
                          placeholder="10000.00"
                        />
                      )}
                    />
                    {errors.targetAmount && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.targetAmount.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentAmount">Current Amount</Label>
                    <Controller
                      name="currentAmount"
                      control={control}
                      rules={{
                        required: "Current amount is required",
                        pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Invalid amount format" },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="currentAmount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                        />
                      )}
                    />
                    {errors.currentAmount && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.currentAmount.message}
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
                        >
                          <SelectTrigger id="category" className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {goalCategories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <div className="flex items-center gap-2">
                                  <category.icon className={`h-4 w-4 ${category.color}`} />
                                  {category.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Target Date</Label>
                    <Controller
                      name="deadline"
                      control={control}
                      rules={{ 
                        required: "Target date is required",
                        pattern: {
                          value: /^\d{4}-\d{2}-\d{2}$/,
                          message: "Date must be in YYYY-MM-DD format"
                        }
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="deadline"
                          type="date"
                          placeholder="YYYY-MM-DD"
                        />
                      )}
                    />
                    {errors.deadline && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.deadline.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                          <SelectTrigger id="status" className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {goalStatuses.map((status) => (
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
                    {errors.status && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="priority" className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {goalPriorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                <div className="flex items-center gap-2">
                                  <priority.icon className="h-4 w-4" />
                                  {priority.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.priority && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.priority.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      setEditingGoal(null);
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
                    {editingGoal ? (
                      <>
                        <Save className="h-4 w-4" />
                        Update Goal
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Create Goal
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {goals.map((goal) => {
            const category = goalCategories.find((c) => c.value === goal.category);
            const status = goalStatuses.find((s) => s.value === goal.status);
            const priority = goalPriorities.find((p) => p.value === goal.priority);
            const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
            const isCompleted = goal.status === "completed";
            const remainingAmount = goal.targetAmount - goal.currentAmount;

            return (
              <Card key={goal.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {category && <category.icon className={`h-5 w-5 ${category.color}`} />}
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(goal)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{goal.description}</CardDescription>
                  <div className="flex gap-2 mt-2">
                    {status && (
                      <Badge variant="secondary" className={status.color}>
                        <status.icon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    )}
                    {priority && (
                      <Badge variant="secondary" className={priority.color}>
                        <priority.icon className="h-3 w-3 mr-1" />
                        {priority.label}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${goal.currentAmount.toLocaleString("en-US")}</span>
                      <span>${goal.targetAmount.toLocaleString("en-US")}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Remaining
                      </span>
                      <span className={`font-medium ${isCompleted ? "text-green-600" : "text-orange-600"}`}>
                        {isCompleted ? "Goal Achieved!" : `$${remainingAmount.toLocaleString("en-US")}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Deadline
                      </span>
                      <span className="font-medium">{new Date(goal.deadline).toLocaleDateString("en-US")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5" />
              Financial Overview
            </CardTitle>
            <CardDescription>Summary of your financial goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Total Target</span>
                </div>
                <span className="font-bold text-green-600">${totalTargetAmount.toLocaleString("en-US")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Current Saved</span>
                </div>
                <span className="font-bold text-blue-600">${totalCurrentAmount.toLocaleString("en-US")}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Still Needed</span>
                </div>
                <span className="font-bold text-orange-600">
                  ${(totalTargetAmount - totalCurrentAmount).toLocaleString("en-US")}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{overallProgress.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(overallProgress, 100)} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
}