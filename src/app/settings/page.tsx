"use client";

import { useState } from "react";
import { Dashboard } from "../Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import {
  Settings,
  Trash2,
  Download,
  FileText,
  Database,
  Shield,
  Lock,
  Unlock,
  Archive,
  RefreshCw,
  AlertTriangle,
  Clock,
  Calendar,
  Zap,
} from "lucide-react";

interface AccountSettings {
  autoLogout: boolean;
  sessionTimeout: number;
  dataRetention: number;
  accountFreeze: boolean;
}

interface PrivacySettings {
  dataCollection: boolean;
  analyticsTracking: boolean;
  marketingEmails: boolean;
  thirdPartySharing: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    autoLogout: true,
    sessionTimeout: 30,
    dataRetention: 365,
    accountFreeze: false,
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    dataCollection: false,
    analyticsTracking: true,
    marketingEmails: false,
    thirdPartySharing: false,
  });

  const tabs = [
    { value: "account", label: "Account", icon: Settings },
    { value: "privacy", label: "Privacy", icon: Shield },
    { value: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  const sessionTimeouts = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "120", label: "2 hours" },
    { value: "240", label: "4 hours" },
    { value: "480", label: "8 hours" },
  ];

  const dataRetentionOptions = [
    { value: "90", label: "3 months" },
    { value: "180", label: "6 months" },
    { value: "365", label: "1 year" },
    { value: "730", label: "2 years" },
    { value: "1095", label: "3 years" },
    { value: "-1", label: "Forever" },
  ];

  const accountOptions = [
    {
      key: "autoLogout",
      label: "Auto Logout",
      description: "Automatically log out when inactive",
      icon: Lock,
    },
    {
      key: "accountFreeze",
      label: "Account Freeze",
      description: "Temporarily disable account access",
      icon: Unlock,
    },
  ];

  const privacyOptions = [
    {
      key: "dataCollection",
      label: "Data Collection",
      description: "Allow collection of usage data for improvements",
      icon: Database,
    },
    {
      key: "analyticsTracking",
      label: "Analytics Tracking",
      description: "Enable analytics to track app usage",
      icon: Zap,
    },
    {
      key: "marketingEmails",
      label: "Marketing Emails",
      description: "Receive promotional and marketing emails",
      icon: FileText,
    },
    {
      key: "thirdPartySharing",
      label: "Third Party Sharing",
      description: "Share data with trusted third-party services",
      icon: Shield,
    },
  ];

  const dangerActions = [
    {
      key: "export",
      label: "Export Data",
      description: "Download all your account data",
      icon: Download,
      action: () => setShowExportDialog(true),
      variant: "outline" as const,
    },
    {
      key: "reset",
      label: "Reset Settings",
      description: "Reset all settings to default values",
      icon: RefreshCw,
      action: () => handleResetSettings(),
      variant: "outline" as const,
    },
    {
      key: "archive",
      label: "Archive Account",
      description: "Archive account but keep data",
      icon: Archive,
      action: () => handleArchiveAccount(),
      variant: "outline" as const,
    },
    {
      key: "delete",
      label: "Delete Account",
      description: "Permanently delete your account and all data",
      icon: Trash2,
      action: () => setShowDeleteDialog(true),
      variant: "destructive" as const,
    },
  ];

  const handleAccountChange = (key: keyof AccountSettings, value: boolean | number) => {
    setAccountSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion initiated");
    setShowDeleteDialog(false);
  };

  const handleExportData = () => {
    console.log("Data export initiated");
    setShowExportDialog(false);
  };

  const handleResetSettings = () => {
    setAccountSettings({
      autoLogout: true,
      sessionTimeout: 30,
      dataRetention: 365,
      accountFreeze: false,
    });
    setPrivacySettings({
      dataCollection: false,
      analyticsTracking: true,
      marketingEmails: false,
      thirdPartySharing: false,
    });
  };

  const handleArchiveAccount = () => {
    console.log("Account archive initiated");
  };

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Application Settings</h2>
            <p className="text-muted-foreground">Configure your account preferences and security options</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account behavior and session preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                    <Select
                      value={accountSettings.sessionTimeout.toString()}
                      onValueChange={(value) => handleAccountChange("sessionTimeout", parseInt(value))}
                    >
                      <SelectTrigger id="sessionTimeout">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sessionTimeouts.map((timeout) => (
                          <SelectItem key={timeout.value} value={timeout.value}>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {timeout.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention Period</Label>
                    <Select
                      value={accountSettings.dataRetention.toString()}
                      onValueChange={(value) => handleAccountChange("dataRetention", parseInt(value))}
                    >
                      <SelectTrigger id="dataRetention">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dataRetentionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {accountOptions.map((option) => (
                    <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <option.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                      <Switch
                        checked={accountSettings[option.key as keyof AccountSettings] as boolean}
                        onCheckedChange={(checked) => handleAccountChange(option.key as keyof AccountSettings, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control your data privacy and sharing preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {privacyOptions.map((option) => (
                    <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <option.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings[option.key as keyof PrivacySettings]}
                        onCheckedChange={(checked) => handlePrivacyChange(option.key as keyof PrivacySettings, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger" className="space-y-6">
            <Card className="shadow-lg border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions that affect your account and data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dangerActions.map((action) => (
                    <div key={action.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <action.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{action.label}</div>
                          <div className="text-sm text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                      <Button variant={action.variant} onClick={action.action} className="flex items-center gap-2">
                        <action.icon className="h-4 w-4" />
                        {action.label}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <Trash2 className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Delete Account</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers. 
                Type "DELETE" to confirm.
              </p>
              <Input placeholder="Type DELETE to confirm" className="w-full mb-4" />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        )}

        {showExportDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <div className="flex items-center gap-2 mb-4">
                <Download className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Export Data</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We'll prepare a complete export of your account data. This may take a few minutes. You'll receive an email when it's ready for download.
              </p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleExportData}>
                  Start Export
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
}