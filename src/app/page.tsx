"use client"

import { Dashboard } from "./Dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { useConfirmNavigation } from "@/lib/useConfirmNavigation"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  Plus,
  ShoppingCart,
  Car,
  Film,
  GraduationCap,
  Heart,
  Coffee,
  Briefcase,
  Calculator,
  MapPin,
  Home as HomeIcon} from 'lucide-react'

export default function Home() {
  const router = useRouter()

  const handleClick = async () => {
    const result = await Swal.fire({
      title: "Go to Add Transaction?",
      text: "You will be redirected to the Add Transaction page.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, go",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      router.push("/add-transaction")
    }
  }

  const stats = [
    {
      title: "Total Balance",
      value: "$12,450.00",
      change: "+12.5%",
      changeType: "increase",
      icon: Wallet,
      description: "Across all accounts"
    },
    {
      title: "Monthly Income",
      value: "$5,200.00",
      change: "+8.2%",
      changeType: "increase",
      icon: TrendingUp,
      description: "This month"
    },
    {
      title: "Monthly Expenses",
      value: "$3,850.00",
      change: "-3.1%",
      changeType: "decrease",
      icon: TrendingDown,
      description: "This month"
    },
    {
      title: "Net Savings",
      value: "$1,350.00",
      change: "+24.6%",
      changeType: "increase",
      icon: DollarSign,
      description: "This month"
    }
  ]

  const recentTransactions = [
    {
      id: 1,
      title: "Grocery Store",
      amount: -85.50,
      type: "expense",
      category: { id: 1, name: "Food & Dining", icon: ShoppingCart, color: "bg-orange-500" },
      description: "Weekly grocery shopping",
      date: "2024-12-28",
      location: "Supermarket Plaza",
      tags: ["groceries", "weekly"],
      createdAt: "2024-12-28T16:45:00Z"
    },
    {
      id: 2,
      title: "Salary Deposit",
      amount: 2600.00,
      type: "income",
      category: { id: 11, name: "Salary", icon: Briefcase, color: "bg-green-600" },
      description: "Monthly salary deposit",
      date: "2024-12-28",
      location: "",
      tags: ["monthly", "salary"],
      createdAt: "2024-12-28T09:00:00Z"
    },
    {
      id: 3,
      title: "Coffee Shop",
      amount: -12.75,
      type: "expense",
      category: { id: 1, name: "Food & Dining", icon: Coffee, color: "bg-orange-500" },
      description: "Morning coffee and pastry",
      date: "2024-12-28",
      location: "Downtown Café",
      tags: ["coffee", "breakfast"],
      createdAt: "2024-12-28T08:30:00Z"
    },
    {
      id: 4,
      title: "Uber Ride",
      amount: -18.30,
      type: "expense",
      category: { id: 2, name: "Transportation", icon: Car, color: "bg-blue-500" },
      description: "Ride to meeting",
      date: "2024-12-27",
      location: "Business District",
      tags: ["uber", "business"],
      createdAt: "2024-12-27T14:20:00Z"
    },
    {
      id: 5,
      title: "Freelance Project",
      amount: 350.00,
      type: "income",
      category: { id: 12, name: "Freelance", icon: DollarSign, color: "bg-blue-600" },
      description: "Web development project",
      date: "2024-12-27",
      location: "",
      tags: ["freelance", "web-dev"],
      createdAt: "2024-12-27T18:30:00Z"
    },
    {
      id: 6,
      title: "Gas Station",
      amount: -45.20,
      type: "expense",
      category: { id: 2, name: "Transportation", icon: Car, color: "bg-blue-500" },
      description: "Fill up gas tank",
      date: "2024-12-26",
      location: "Shell Station",
      tags: ["gas", "car"],
      createdAt: "2024-12-26T19:15:00Z"
    }
  ]

  const budgetGoals = [
    {
      id: 1,
      name: "Food & Dining",
      icon: Coffee,
      color: "bg-orange-500",
      totalSpent: 485.50,
      budget: 600,
      transactionCount: 24,
      percentage: 80.9,
      description: "Restaurants, groceries, coffee"
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
      description: "Gas, uber, public transport"
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
      description: "Movies, streaming, games"
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
      description: "Clothes, electronics, misc"
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
      description: "Medical, pharmacy, insurance"
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
      description: "Courses, books, training"
    }
  ]

  const quickActions = [
    { icon: Plus, label: "Add Income", color: "text-green-600", path: "/add-transaction" },
    { icon: TrendingDown, label: "Add Expense", color: "text-red-600", path: "/add-transaction" },
    { icon: PieChart, label: "View Reports", color: "text-blue-600", path: "/reports" },
    { icon: Calculator, label: "Budget Tool", color: "text-purple-600", path: "/budget-goals" },
  ]

  const { confirmAndNavigate } = useConfirmNavigation()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getBudgetStatus = (
    percentage: number
  ): { variant: "destructive" | "secondary" | "default" | "outline"; label: string } => {
    if (percentage >= 90) return { variant: "destructive", label: "Over Budget" }
    if (percentage >= 80) return { variant: "secondary", label: "Near Limit" }
    if (percentage >= 60) return { variant: "default", label: "On Track" }
    return { variant: "outline", label: "Under Budget" }
  }

  return (
    <>
      <Dashboard>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">Here's what's happening with your money today.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                    <span className="ml-1">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your latest financial activity</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleClick}>View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                          <div
                            className={`w-12 h-12 rounded-full ${transaction.category.color} flex items-center justify-center shadow-lg`}
                          >
                            <transaction.category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-medium">{transaction.title}</h4>
                              <Badge variant="outline" className="text-xs sm:text-xs">
                                {transaction.category.name}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{transaction.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
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
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-3 sm:mt-0">
                          <div className="text-right">
                            <div
                              className={`text-lg font-bold ${
                                transaction.type === "income" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(transaction.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
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
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Budget Goals
                </CardTitle>
                <CardDescription>Monthly spending progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {budgetGoals.map((goal) => (
                      <div key={goal.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${goal.color} flex items-center justify-center shadow-lg`}>
                              <goal.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">{goal.name}</h4>
                              <p className="text-xs text-muted-foreground">{goal.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>${goal.totalSpent.toFixed(2)} / ${goal.budget.toFixed(2)}</span>
                            <Badge variant={getBudgetStatus(goal.percentage).variant} className="text-xs">
                              {Math.round(goal.percentage)}%
                            </Badge>
                          </div>
                          <Progress value={goal.percentage} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{goal.transactionCount} transactions</span>
                            <span>${(goal.budget - goal.totalSpent).toFixed(2)} remaining</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your finances efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 w-full flex-col gap-2 shadow-lg"
                      onClick={() =>
                        confirmAndNavigate(
                          action.path,
                          `Do you want to continue to ${action.label}?`
                        )
                      }
                    >
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>This Month Summary</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    December 2024
                  </Badge>
                </div>
                <CardDescription>Your monthly financial overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium">Total Income</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">$5,200.00</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-sm font-medium">Total Expenses</span>
                    </div>
                    <span className="text-sm font-bold text-red-600">$3,850.00</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-sm font-medium">Net Savings</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">$1,350.00</span>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs text-muted-foreground mb-2">Savings Rate</div>
                    <Progress value={26} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">26% of income saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Dashboard>
    </>
  )
}