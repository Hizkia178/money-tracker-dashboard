"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { VisuallyHidden } from "@/lib/visually-hidden"
import Link from "next/link"
import { ArrowLeftRight, Calendar, List, Mail, Menu, PieChart, PlusCircle, RefreshCw, Settings, Target, Wallet } from "lucide-react"
import {
    Home,
    HelpCircle,
    User,
    BarChart3,
    TrendingUp,
} from "lucide-react"

const navigationItems = [
  {
    title: "Main",
    items: [
      { icon: Home, label: "Dashboard", badge: "0", href: "/" },
      { icon: PlusCircle, label: "Add Transaction", href: "/add-transaction" },
      { icon: List, label: "All Transactions", badge: "0", href: "/transactions" },
      { icon: PieChart, label: "Categories", href: "/categories" },
    ],
  },
  {
    title: "Reports & Insights",
    items: [
      { icon: BarChart3, label: "Monthly Report", href: "/reports/monthly" },
      { icon: Calendar, label: "Yearly Report", href: "/reports/yearly" },
      { icon: TrendingUp, label: "Spending Trends", href: "/reports/trends" },
      { icon: Target, label: "Budget Goals", badge: "0", href: "/budget-goals" },
    ],
  },
  {
    title: "Accounts",
    items: [
      { icon: Wallet, label: "My Wallets / Accounts", href: "/accounts" },
      { icon: RefreshCw, label: "Recurring Transactions", badge: "0", href: "/recurring" },
      { icon: ArrowLeftRight, label: "Transfers", href: "/transfers" },
    ],
  },
  {
    title: "User",
    items: [
      { icon: User, label: "Profile", href: "/profile" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ],
  },
  {
    title: "Extras",
    items: [
      { icon: HelpCircle, label: "Help / FAQ", href: "/faq" },
      { icon: Mail, label: "Contact", href: "/contact" },
    ],
  },
]

export function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-0 shadow-lg">
                <VisuallyHidden>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Access your dashboard, reports, and accounts</SheetDescription>
                </VisuallyHidden>


                <ScrollArea className="h-full">
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                <Wallet className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-semibold">Money Tracker</span>

                        </div>

                        <nav className="space-y-6">
                            {navigationItems.map((section, sectionIndex) => (
                                <div key={sectionIndex}>
                                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                        {section.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {section.items.map((item, itemIndex) => (
                                            <Button
                                                key={itemIndex}
                                                variant="ghost"
                                                className="w-full justify-start"
                                                asChild
                                                onClick={() => setOpen(false)}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon className="h-4 w-4 mr-2" />
                                                    <span className="truncate">{item.label}</span>
                                                    {item.badge && (
                                                        <Badge variant="secondary" className="ml-auto text-xs">
                                                            {item.badge}
                                                        </Badge>
                                                    )}
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}