"use client"

import { useState } from "react"
import { DashboardSidebar } from "./Dashboad-Sidebar"
import { MobileNav } from "./Mobile-Nav"
import { Button } from "@/components/ui/button"
import { Menu, Bell, User, LogOut, MessageSquare, Headphones } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardProps {
    children: React.ReactNode
}

export function Dashboard({ children }: DashboardProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="flex h-screen bg-background">
            <div className="hidden md:block fixed left-0 top-0 h-full z-10">
                <DashboardSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
            </div>
            <div
                className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? "md:ml-16" : "md:ml-64"
                    }`}
            >
                <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <MobileNav />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden md:flex"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <Menu className="h-4 w-4" />
                        </Button>

                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold leading-tight">Finance Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Monitor cash flow and stay on top of your goals</p>
                        </div>

                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            <Bell className="h-4 w-4" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-40" align="end" forceMount>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>View Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Feedback</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Headphones className="mr-2 h-4 w-4" />
                                    <span>Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </header>

                <main className="flex-1 overflow-auto p-6">
                    <div className="max-w-full mx-auto space-y-8">{children}</div>
                </main>
            </div>
        </div>
    )
}