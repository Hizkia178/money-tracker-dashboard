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
import { ScrollArea } from "@/components/ui/scroll-area";
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
  MapPin,
  Smartphone,
  Coffee,
  Gamepad2,
  Building,
  Dumbbell,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

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
      description: "Build an emergency fund for unexpected expenses and financial security",
      targetAmount: 10000,
      currentAmount: 3500,
      category: "savings",
      deadline: "2025-12-31",
      status: "active",
      priority: "high",
    },
    {
      id: 2,
      title: "New Electric Vehicle",
      description: "Save for a new Tesla Model 3 with advanced autopilot features",
      targetAmount: 45000,
      currentAmount: 15200,
      category: "transport",
      deadline: "2026-06-30",
      status: "active",
      priority: "medium",
    },
    {
      id: 3,
      title: "European Adventure",
      description: "Family vacation to Europe visiting Paris, Rome, and Barcelona",
      targetAmount: 12000,
      currentAmount: 12000,
      category: "travel",
      deadline: "2025-07-15",
      status: "completed",
      priority: "low",
    },
    {
      id: 4,
      title: "Home Down Payment",
      description: "Save 20% down payment for a new house in the suburbs",
      targetAmount: 60000,
      currentAmount: 22000,
      category: "housing",
      deadline: "2027-03-15",
      status: "active",
      priority: "high",
    },
    {
      id: 5,
      title: "Master's Degree",
      description: "MBA program at local university for career advancement",
      targetAmount: 25000,
      currentAmount: 8500,
      category: "education",
      deadline: "2026-08-30",
      status: "active",
      priority: "medium",
    },
    {
      id: 6,
      title: "Gaming Setup Upgrade",
      description: "High-end gaming PC and accessories for streaming",
      targetAmount: 3500,
      currentAmount: 1200,
      category: "entertainment",
      deadline: "2025-11-30",
      status: "paused",
      priority: "low",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<BudgetGoal | null>(null);

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
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
    { value: "savings", label: "Savings & Emergency", icon: PiggyBank, color: "bg-blue-500" },
    { value: "transport", label: "Transportation", icon: Car, color: "bg-purple-500" },
    { value: "housing", label: "Housing & Real Estate", icon: Home, color: "bg-green-500" },
    { value: "education", label: "Education & Learning", icon: GraduationCap, color: "bg-indigo-500" },
    { value: "travel", label: "Travel & Vacation", icon: Plane, color: "bg-orange-500" },
    { value: "shopping", label: "Shopping & Retail", icon: ShoppingCart, color: "bg-pink-500" },
    { value: "health", label: "Health & Wellness", icon: Heart, color: "bg-red-500" },
    { value: "business", label: "Business & Investment", icon: Briefcase, color: "bg-gray-600" },
    { value: "entertainment", label: "Entertainment & Hobbies", icon: Gamepad2, color: "bg-yellow-500" },
    { value: "technology", label: "Technology & Gadgets", icon: Smartphone, color: "bg-cyan-500" },
    { value: "fitness", label: "Fitness & Sports", icon: Dumbbell, color: "bg-emerald-500" },
    { value: "other", label: "Other Goals", icon: Gift, color: "bg-teal-500" },
  ];

  const goalStatuses: GoalStatus[] = [
    { value: "active", label: "Active", icon: Clock, color: "bg-blue-100 text-blue-800" },
    { value: "completed", label: "Completed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
    { value: "paused", label: "Paused", icon: AlertCircle, color: "bg-yellow-100 text-yellow-800" },
    { value: "cancelled", label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-800" },
  ];

  const goalPriorities: GoalPriority[] = [
    { value: "high", label: "High Priority", color: "bg-red-100 text-red-800", icon: Flame },
    { value: "medium", label: "Medium Priority", color: "bg-yellow-100 text-yellow-800", icon: Star },
    { value: "low", label: "Low Priority", color: "bg-green-100 text-green-800", icon: Check },
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
      Swal.fire({
        title: "Updated!",
        text: `${data.title} goal has been updated successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const newGoal: BudgetGoal = {
        id: Math.max(...goals.map(g => g.id)) + 1,
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
      Swal.fire({
        title: "Created!",
        text: `${data.title} goal has been created successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    reset();
    setOpen(false);
  };

  const handleAddGoal = () => {
    setEditingGoal(null);
    reset({
      title: "",
      description: "",
      targetAmount: "",
      currentAmount: "",
      category: "",
      deadline: "",
      status: "active",
      priority: "medium",
    });
    setOpen(true);
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

  const handleDelete = async (goal: BudgetGoal) => {
    const result = await Swal.fire({
      title: `Delete "${goal.title}"?`,
      text: "This action cannot be undone. All progress data will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      setGoals(goals.filter((g) => g.id !== goal.id));
      await Swal.fire({
        title: "Deleted!",
        text: `${goal.title} goal has been deleted.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const activeGoals = goals.filter((g) => g.status === "active").length;
  const pausedGoals = goals.filter((g) => g.status === "paused").length;
  const totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  const stats = [
    {
      title: "Total Goals",
      value: totalGoals.toString(),
      icon: Target,
      color: "text-blue-600",
      description: `${activeGoals} active, ${completedGoals} completed`,
      change: "+2 new",
      changeType: "increase",
    },
    {
      title: "Total Progress",
      value: `${overallProgress.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      description: "Overall completion rate",
      change: "+5.2%",
      changeType: "increase",
    },
    {
      title: "Amount Saved",
      value: `$${(totalCurrentAmount / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "text-green-600",
      description: `of $${(totalTargetAmount / 1000).toFixed(0)}K target`,
      change: "+$2.1K",
      changeType: "increase",
    },
    {
      title: "Completed Goals",
      value: completedGoals.toString(),
      icon: Trophy,
      color: "text-yellow-600",
      description: "Successfully achieved",
      change: `${pausedGoals} paused`,
      changeType: "warning",
    },
  ];

  const getProgressStatus = (progress: number) => {
    if (progress >= 100) return { variant: "default" as const, label: "Completed", color: "bg-green-500" };
    if (progress >= 80) return { variant: "default" as const, label: "Near Goal", color: "bg-blue-500" };
    if (progress >= 50) return { variant: "secondary" as const, label: "On Track", color: "bg-yellow-500" };
    return { variant: "outline" as const, label: "Getting Started", color: "bg-gray-400" };
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "increase": return "text-green-600";
      case "decrease": return "text-red-600";
      case "warning": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getPreviewIcon = () => {
    const selectedCategory = goalCategories.find(cat => cat.value === watch("category"));
    return selectedCategory ? selectedCategory.icon : Target;
  };

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Budget Goals</h2>
            <p className="text-muted-foreground">Set, track, and achieve your financial objectives</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center w-fit gap-2 shadow-lg" onClick={handleAddGoal}>
                <Plus className="h-4 w-4" />
                Add Budget Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {editingGoal ? "Edit Budget Goal" : "Create New Budget Goal"}
                </DialogTitle>
                <DialogDescription>
                  {editingGoal ? "Update your financial goal details below." : "Set up a new financial objective to track your savings progress."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Goal Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      rules={{
                        required: "Goal title is required",
                        maxLength: { value: 60, message: "Title cannot exceed 60 characters" }
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="title"
                          placeholder="e.g., Emergency Fund, Dream Car, Vacation"
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
                      rules={{
                        required: "Description is required",
                        maxLength: { value: 200, message: "Description cannot exceed 200 characters" }
                      }}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Describe your goal and why it's important to you..."
                          rows={3}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="flex items-center gap-1 text-red-600 text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.description.message}
                      </p>
                    )}
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
                        validate: (value) => parseFloat(value) > 0 || "Amount must be greater than 0"
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
                        validate: (value) => parseFloat(value) >= 0 || "Amount cannot be negative"
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
                                  <div className={`w-4 h-4 rounded-full ${category.color} flex items-center justify-center`}>
                                    <category.icon className="h-2.5 w-2.5 text-white" />
                                  </div>
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
                        validate: (value) => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          return selectedDate > today || "Target date must be in the future";
                        }
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="deadline"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
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
                  </div>
                </div>
                {watch("category") && (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <Label className="text-sm font-medium mb-2 block">Preview</Label>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const IconComponent = getPreviewIcon();
                        const selectedCategory = goalCategories.find(cat => cat.value === watch("category"));
                        return (
                          <div className={`w-10 h-10 rounded-full ${selectedCategory?.color || 'bg-gray-500'} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                        );
                      })()}
                      <div>
                        <h4 className="font-medium">{watch("title") || "Goal Title"}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {watch("description") || "Goal description will appear here"}
                        </p>
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
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className={getChangeColor(stat.changeType)}>{stat.change}</span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Goals</CardTitle>
                  <CardDescription>Goals currently in progress</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activeGoals} Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {goals.filter(goal => goal.status === "active").map((goal) => {
                    const category = goalCategories.find((c) => c.value === goal.category);
                    const priority = goalPriorities.find((p) => p.value === goal.priority);
                    const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
                    const remainingAmount = goal.targetAmount - goal.currentAmount;
                    const daysRemaining = getDaysRemaining(goal.deadline);
                    const progressStatus = getProgressStatus(progress);

                    return (
                      <div key={goal.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {category && (
                              <div className={`w-10 h-10 aspect-square rounded-full ${category.color} flex items-center justify-center shadow-lg`}>
                                <category.icon className="h-5 w-5 text-white" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium">{goal.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEdit(goal)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => handleDelete(goal)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Badge {...progressStatus} className="text-xs">
                              {progress.toFixed(1)}%
                            </Badge>
                            {priority && (
                              <Badge variant="secondary" className={priority.color}>
                                <priority.icon className="h-3 w-3 mr-1" />
                                {priority.label}
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>${goal.currentAmount.toLocaleString("en-US")} / ${goal.targetAmount.toLocaleString("en-US")}</span>
                              <span className="font-medium">{progress.toFixed(1)}%</span>
                            </div>
                            <Progress value={Math.min(progress, 100)} className="h-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              <span>${remainingAmount.toLocaleString("en-US")} remaining</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className={daysRemaining < 30 ? "text-orange-600" : ""}>
                                {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Completed & Other Goals</CardTitle>
                  <CardDescription>Finished goals and paused objectives</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {goals.length - activeGoals} Goals
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {goals.filter(goal => goal.status !== "active").map((goal) => {
                    const category = goalCategories.find((c) => c.value === goal.category);
                    const status = goalStatuses.find((s) => s.value === goal.status);
                    const priority = goalPriorities.find((p) => p.value === goal.priority);
                    const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
                    const isCompleted = goal.status === "completed";

                    return (
                      <div key={goal.id} className={`p-4 border rounded-lg transition-colors ${
                        isCompleted ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {category && (
                              <div className={`w-10 h-10 aspect-square rounded-full ${category.color} flex items-center justify-center shadow-lg ${
                                isCompleted ? "ring-2 ring-green-300" : ""
                              }`}>
                                <category.icon className="h-5 w-5 text-white" />
                              </div>
                            )}
                            <div>
                              <h4 className={`font-medium ${isCompleted ? "text-green-800" : ""}`}>
                                {goal.title}
                                {isCompleted && <Trophy className="inline h-4 w-4 ml-1 text-yellow-500" />}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEdit(goal)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => handleDelete(goal)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            {status && (
                              <Badge variant="secondary" className={status.color}>
                                <status.icon className="h-3 w-3 mr-1" />
                                {status.label}
                              </Badge>
                            )}
                            {priority && (
                              <Badge variant="outline" className={priority.color}>
                                <priority.icon className="h-3 w-3 mr-1" />
                                {priority.label}
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>${goal.currentAmount.toLocaleString("en-US")} / ${goal.targetAmount.toLocaleString("en-US")}</span>
                              <span className="font-medium">{progress.toFixed(1)}%</span>
                            </div>
                            <Progress value={Math.min(progress, 100)} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(goal.deadline).toLocaleDateString("en-US")}</span>
                            </div>
                            {isCompleted && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                <span className="font-medium">Goal Achieved!</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                Financial Summary
              </CardTitle>
              <CardDescription>Overall goal financial overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Total Target</span>
                  </div>
                  <span className="font-bold text-blue-600">${totalTargetAmount.toLocaleString("en-US")}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Amount Saved</span>
                  </div>
                  <span className="font-bold text-green-600">${totalCurrentAmount.toLocaleString("en-US")}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
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
                <div className="text-xs text-muted-foreground text-center mt-2">
                  {overallProgress >= 50 ? "Great progress! Keep it up!" : "You're just getting started!"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Goal Categories
              </CardTitle>
              <CardDescription>Goals by category breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goalCategories
                  .filter(category => goals.some(goal => goal.category === category.value))
                  .map((category) => {
                    const categoryGoals = goals.filter(goal => goal.category === category.value);
                    const totalCategoryTarget = categoryGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
                    const totalCategorySaved = categoryGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
                    const categoryProgress = totalCategoryTarget > 0 ? (totalCategorySaved / totalCategoryTarget) * 100 : 0;
                    
                    return (
                      <div key={category.value} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${category.color} flex items-center justify-center`}>
                              <category.icon className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">{category.label}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {categoryGoals.length} goals
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>${totalCategorySaved.toLocaleString("en-US")} / ${totalCategoryTarget.toLocaleString("en-US")}</span>
                            <span>{categoryProgress.toFixed(0)}%</span>
                          </div>
                          <Progress value={categoryProgress} className="h-1" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Goals with nearest target dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals
                  .filter(goal => goal.status === "active")
                  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                  .slice(0, 5)
                  .map((goal) => {
                    const daysRemaining = getDaysRemaining(goal.deadline);
                    const category = goalCategories.find(c => c.value === goal.category);
                    const urgencyColor = daysRemaining < 30 ? "text-red-600" : daysRemaining < 90 ? "text-orange-600" : "text-green-600";
                    
                    return (
                      <div key={goal.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {category && (
                            <div className={`w-6 h-6 rounded-full ${category.color} flex items-center justify-center`}>
                              <category.icon className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <span className="text-sm font-medium line-clamp-1">{goal.title}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {new Date(goal.deadline).toLocaleDateString("en-US")}
                          </span>
                          <span className={`text-xs font-medium ${urgencyColor}`}>
                            {daysRemaining > 0 ? `${daysRemaining} days` : "Overdue"}
                          </span>
                        </div>
                        <div className="mt-2">
                          <Progress 
                            value={(goal.currentAmount / goal.targetAmount) * 100} 
                            className="h-1" 
                          />
                        </div>
                      </div>
                    );
                  })}
                {goals.filter(goal => goal.status === "active").length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <Target className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">No active goals found</p>
                    <p className="text-xs">Create your first goal to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
}