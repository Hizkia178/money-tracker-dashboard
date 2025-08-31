"use client";

import { useState } from "react";
import { Dashboard } from "../Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  User,
  Mail,
  Phone,
  Calendar,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Camera,
  Save,
  Edit,
  Lock,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Languages,
  Target,
  CheckCircle,
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  occupation: string;
  bio: string;
  dateOfBirth: string;
  avatar: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  transactionAlerts: boolean;
  budgetAlerts: boolean;
  goalReminders: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

interface PreferenceSettings {
  theme: string;
  language: string;
  currency: string;
  dateFormat: string;
  soundEnabled: boolean;
  autoSave: boolean;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    country: "United States",
    occupation: "Software Developer",
    bio: "Passionate about technology and financial planning. Love to code and explore new investment opportunities.",
    dateOfBirth: "1990-05-15",
    avatar: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    budgetAlerts: true,
    goalReminders: true,
    weeklyReports: false,
    monthlyReports: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: true,
    loginAlerts: true,
  });

  const [preferences, setPreferences] = useState<PreferenceSettings>({
    theme: "light",
    language: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    soundEnabled: true,
    autoSave: true,
  });

  const tabs = [
    { value: "profile", label: "Profile", icon: User },
    { value: "security", label: "Security", icon: Shield },
    { value: "notifications", label: "Notifications", icon: Bell },
  ];

  const countries = [
    { value: "us", label: "United States", flag: "🇺🇸" },
    { value: "ca", label: "Canada", flag: "🇨🇦" },
    { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
    { value: "au", label: "Australia", flag: "🇦🇺" },
    { value: "de", label: "Germany", flag: "🇩🇪" },
    { value: "fr", label: "France", flag: "🇫🇷" },
    { value: "jp", label: "Japan", flag: "🇯🇵" },
    { value: "sg", label: "Singapore", flag: "🇸🇬" },
    { value: "cn", label: "China", flag: "🇨🇳" },
    { value: "in", label: "India", flag: "🇮🇳" },
    { value: "br", label: "Brazil", flag: "🇧🇷" },
    { value: "es", label: "Spain", flag: "🇪🇸" },
    { value: "it", label: "Italy", flag: "🇮🇹" },
    { value: "kr", label: "South Korea", flag: "🇰🇷" },
    { value: "ru", label: "Russia", flag: "🇷🇺" },
    { value: "mx", label: "Mexico", flag: "🇲🇽" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
    { value: "zh", label: "Chinese" },
  ];

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
  ];

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const handleProfileSave = () => {
    setIsEditing(false);
  };

  const handleProfileEdit = () => {
    setIsEditing(true);
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: keyof SecuritySettings, value: string | boolean) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: keyof PreferenceSettings, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const notificationOptions = [
    { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email", icon: Mail },
    { key: "pushNotifications", label: "Push Notifications", description: "Browser push notifications", icon: Smartphone },
    { key: "smsNotifications", label: "SMS Notifications", description: "Text message notifications", icon: Phone },
    { key: "transactionAlerts", label: "Transaction Alerts", description: "Alert for new transactions", icon: CreditCard },
    { key: "budgetAlerts", label: "Budget Alerts", description: "Notifications when approaching budget limits", icon: Bell },
    { key: "goalReminders", label: "Goal Reminders", description: "Reminders about your financial goals", icon: Target },
    { key: "weeklyReports", label: "Weekly Reports", description: "Weekly financial summary reports", icon: Calendar },
    { key: "monthlyReports", label: "Monthly Reports", description: "Monthly financial summary reports", icon: Calendar },
  ];

  const securityOptions = [
    { key: "twoFactorAuth", label: "Two-Factor Authentication", description: "Add an extra layer of security", icon: Shield },
    { key: "loginAlerts", label: "Login Alerts", description: "Get notified of new login attempts", icon: Lock },
  ];

  return (
    <Dashboard>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
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

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details and profile information</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleProfileSave : handleProfileEdit}
                    className="flex items-center gap-2"
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-lg bg-accent-foreground shadow-lg text-white">
                      {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="flex items-center gap-2" disabled={!isEditing}>
                      <Camera className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={profile.occupation}
                      onChange={(e) => setProfile(prev => ({ ...prev, occupation: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={profile.city}
                        onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={profile.country}
                        onValueChange={(value) => setProfile(prev => ({ ...prev, country: value }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger id="country" name="country" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.label}>
                              <div className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                {country.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="h-30"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {securityOptions.map((option) => (
                    <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <option.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                      <Switch
                        id={option.key}
                        name={option.key}
                        checked={security[option.key as keyof SecuritySettings] as boolean}
                        onCheckedChange={(checked) => handleSecurityChange(option.key as keyof SecuritySettings, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified about account activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationOptions.map((option) => (
                    <div key={option.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <option.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                      <Switch
                        id={option.key}
                        name={option.key}
                        checked={notifications[option.key as keyof NotificationSettings]}
                        onCheckedChange={(checked) => handleNotificationChange(option.key as keyof NotificationSettings, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Application Preferences
                </CardTitle>
                <CardDescription>Customize your application experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value) => handlePreferenceChange("theme", value)}
                    >
                      <SelectTrigger id="theme" name="theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme.value} value={theme.value}>
                            <div className="flex items-center gap-2">
                              <theme.icon className="h-4 w-4" />
                              {theme.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => handlePreferenceChange("language", value)}
                    >
                      <SelectTrigger id="language" name="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.value} value={language.value}>
                            <div className="flex items-center gap-2">
                              <Languages className="h-4 w-4" />
                              {language.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={preferences.currency}
                      onValueChange={(value) => handlePreferenceChange("currency", value)}
                    >
                      <SelectTrigger id="currency" name="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              {currency.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={preferences.dateFormat}
                      onValueChange={(value) => handlePreferenceChange("dateFormat", value)}
                    >
                      <SelectTrigger id="dateFormat" name="dateFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {preferences.soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                      <div>
                        <div className="font-medium">Sound Effects</div>
                        <div className="text-sm text-muted-foreground">Enable sound notifications and feedback</div>
                      </div>
                    </div>
                    <Switch
                      id="soundEnabled"
                      name="soundEnabled"
                      checked={preferences.soundEnabled}
                      onCheckedChange={(checked) => handlePreferenceChange("soundEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Save className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Auto Save</div>
                        <div className="text-sm text-muted-foreground">Automatically save changes as you type</div>
                      </div>
                    </div>
                    <Switch
                      id="autoSave"
                      name="autoSave"
                      checked={preferences.autoSave}
                      onCheckedChange={(checked) => handlePreferenceChange("autoSave", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Summary
            </CardTitle>
            <CardDescription>Quick overview of your account status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <div className="font-medium">Account Verified</div>
                  <div className="text-sm text-muted-foreground">Email and phone verified</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-medium">Security Active</div>
                  <div className="text-sm text-muted-foreground">2FA enabled</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="font-medium">Member Since</div>
                  <div className="text-sm text-muted-foreground">January 2024</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
}