"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
    Home,
    HelpCircle,
    User,
    BarChart3,
    TrendingUp,
    Mail,
    Settings,
    RefreshCw,
    Wallet,
    ArrowLeftRight,
    Calendar,
    Target,
    PlusCircle,
    List,
    PieChart,
} from "lucide-react"

interface DashboardSidebarProps {
    collapsed: boolean
    onToggle: () => void
}
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

export function DashboardSidebar({ collapsed }: DashboardSidebarProps) {
    return (
        <div
            className={cn(
                "relative bg-sidebar border-r border-sidebar-border transition-all duration-300 shadow",
                collapsed ? "w-16" : "w-64",
            )}
        >
            <ScrollArea className="h-screen">
                <div className="p-4">
                    <div className={cn("flex items-center gap-2 mb-6", collapsed && "justify-center")}>
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-primary-foreground" />
                        </div>
                        {!collapsed && (
                            <span className="font-semibold text-sidebar-foreground">Money Tracker</span>
                        )}
                    </div>


                    <nav className="space-y-6">
                        {navigationItems.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                {!collapsed && (
                                    <h3 className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2">
                                        {section.title}
                                    </h3>
                                )}
                                <div className="space-y-1">
                                    {section.items.map((item, itemIndex) => (
                                        <Button
                                            key={itemIndex}
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                                collapsed ? "px-2" : "px-3",
                                            )}
                                            title={collapsed ? item.label : undefined}
                                            asChild
                                        >
                                            <Link href={item.href}>
                                                <item.icon className={cn("h-4 w-4 shrink-0", collapsed ? "mx-auto" : "mr-2")} />
                                                {!collapsed && (
                                                    <>
                                                        <span className="truncate">{item.label}</span>
                                                        {item.badge && (
                                                            <Badge variant="secondary" className="ml-auto text-xs">
                                                                {item.badge}
                                                            </Badge>
                                                        )}
                                                    </>
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
        </div>
    )
}