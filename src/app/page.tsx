"use client"

import { Dashboard } from "./Dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  Zap,
  Dumbbell,
  TrendingUpDown,
  HelpCircle,
  Coffee,
  CreditCard,
  Briefcase,
  Gift,
  Calculator
} from 'lucide-react'

export default function Home() {
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
    { id: 1, description: "Grocery Store", amount: -85.50, category: "Food", date: "Today", type: "expense", icon: ShoppingCart },
    { id: 2, description: "Salary Deposit", amount: 2600.00, category: "Income", date: "Today", type: "income", icon: Briefcase },
    { id: 3, description: "Coffee Shop", amount: -12.75, category: "Food", date: "Today", type: "expense", icon: Coffee },
    { id: 4, description: "Uber Ride", amount: -18.30, category: "Transportation", date: "Yesterday", type: "expense", icon: Car },
    { id: 5, description: "Netflix Subscription", amount: -15.99, category: "Entertainment", date: "Yesterday", type: "expense", icon: Film },
    { id: 6, description: "Gas Station", amount: -45.20, category: "Transportation", date: "Yesterday", type: "expense", icon: Car },
    { id: 7, description: "Online Course", amount: -89.99, category: "Education", date: "2 days ago", type: "expense", icon: GraduationCap },
    { id: 8, description: "Freelance Work", amount: 350.00, category: "Income", date: "2 days ago", type: "income", icon: CreditCard },
    { id: 9, description: "Pharmacy", amount: -24.50, category: "Healthcare", date: "2 days ago", type: "expense", icon: Heart },
    { id: 10, description: "Amazon Purchase", amount: -67.89, category: "Shopping", date: "3 days ago", type: "expense", icon: ShoppingCart },
    { id: 11, description: "Gym Membership", amount: -49.99, category: "Health", date: "3 days ago", type: "expense", icon: Dumbbell },
    { id: 12, description: "Investment Dividend", amount: 125.00, category: "Investment", date: "3 days ago", type: "income", icon: TrendingUpDown },
    { id: 13, description: "Electricity Bill", amount: -89.50, category: "Utilities", date: "4 days ago", type: "expense", icon: Zap },
    { id: 14, description: "Restaurant", amount: -42.80, category: "Food", date: "4 days ago", type: "expense", icon: Coffee },
    { id: 15, description: "Side Project", amount: 275.00, category: "Income", date: "5 days ago", type: "income", icon: Gift }
  ]

  const budgetGoals = [
    { category: "Food", spent: 485, budget: 600, color: "bg-blue-500", icon: Coffee, status: "On Track" },
    { category: "Transportation", spent: 240, budget: 300, color: "bg-green-500", icon: Car, status: "Good" },
    { category: "Entertainment", spent: 135, budget: 150, color: "bg-purple-500", icon: Film, status: "Near Limit" },
    { category: "Shopping", spent: 387, budget: 400, color: "bg-orange-500", icon: ShoppingCart, status: "Warning" },
    { category: "Healthcare", spent: 125, budget: 200, color: "bg-red-500", icon: Heart, status: "Excellent" },
    { category: "Education", spent: 89, budget: 150, color: "bg-yellow-500", icon: GraduationCap, status: "Great" },
    { category: "Utilities", spent: 165, budget: 200, color: "bg-gray-500", icon: Zap, status: "Good" },
    { category: "Health & Fitness", spent: 99, budget: 120, color: "bg-pink-500", icon: Dumbbell, status: "On Track" },
    { category: "Investment", spent: 500, budget: 600, color: "bg-indigo-500", icon: TrendingUpDown, status: "Good" },
    { category: "Miscellaneous", spent: 78, budget: 100, color: "bg-cyan-500", icon: HelpCircle, status: "Excellent" }
  ]

  const quickActions = [
    { icon: Plus, label: "Add Income", color: "text-green-600" },
    { icon: TrendingDown, label: "Add Expense", color: "text-red-600" },
    { icon: PieChart, label: "View Reports", color: "text-blue-600" },
    { icon: Calculator, label: "Budget Tool", color: "text-purple-600" }
  ]

  return (
    <>
      <Dashboard>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">Here's what's happening with your money today.</p>
            </div>
            <div className="flex gap-2">
              <Button className="shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-betweevn space-y-0 pb-2">
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
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3  rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-8 rounded-full shadow-lg ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <div>
                            <p className="text-sm font-medium">{transaction.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'} className="text-xs flex items-center gap-1">
                                <transaction.icon className="h-3 w-3" />
                                {transaction.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{transaction.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
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
                  <div className="space-y-3">
                    {budgetGoals.map((goal, index) => (
                      <div key={index} className="space-y-2 p-3 rounded-lg border  hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full shadow-lg ${goal.color} flex items-center justify-center`}>
                              <goal.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">{goal.category}</span>
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {Math.round((goal.spent / goal.budget) * 100)}%
                            </Badge>
                          </div>
                          <span className="text-muted-foreground">
                            ${goal.spent}/${goal.budget}
                          </span>
                        </div>
                        <Progress 
                          value={(goal.spent / goal.budget) * 100} 
                          className="h-2"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>${goal.budget - goal.spent} remaining</span>
                          <div className="flex items-center gap-2">
                            {(goal.spent / goal.budget) > 0.8 && (
                              <Badge variant="destructive" className="text-xs flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                Near limit
                              </Badge>
                            )}
                            {(goal.spent / goal.budget) > 0.5 && (goal.spent / goal.budget) <= 0.8 && (
                              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                On track
                              </Badge>
                            )}
                            {(goal.spent / goal.budget) <= 0.5 && (
                              <Badge variant="default" className="text-xs bg-green-500 flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {goal.status}
                              </Badge>
                            )}
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
                    <Button key={index} variant="outline" className="h-20 flex-col gap-2 shadow-lg">
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