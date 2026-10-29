/**
 * IntraShip UAM Common Mock Data & Accessors
 */

export interface StepItem {
  id: string;
  text: string;
}

export interface CurrentUser {
  name: string;
  role: string;
  initials: string;
}

export interface BrandingData {
  appName: string;
  appSubtitle: string;
  portalTag: string;
  headline: string;
  subheadline: string;
  steps: StepItem[];
  badgeText: string;
  helpSupportText: string;
  copyright: string;
}

export interface LoginValidation {
  requiredEmail: string;
  requiredPassword: string;
  invalidCredentials: string;
}

export interface LoginData {
  badge: string;
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  rememberMe: string;
  forgotPasswordLink: string;
  submitButton: string;
  loadingButton: string;
  supportTroubleText: string;
  supportContactText: string;
  securityNote: string;
  validation: LoginValidation;
}

export interface ForgotPasswordData {
  badge: string;
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitButton: string;
  loadingButton: string;
  backToLogin: string;
  footerNote: string;
  validation: {
    requiredEmail: string;
    invalidFormat: string;
  };
  confirmation: {
    title: string;
    message: string;
  };
  sidePanel: {
    tag: string;
    title: string;
    subtitle: string;
    items: StepItem[];
    footer: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  badge?: string;
  href: string;
}

export interface KpiCardItem {
  id: string;
  title: string;
  value: string;
  badge: string;
  badgeType: "success" | "warning" | "danger" | "neutral";
  comparison: string;
  iconType: "user" | "role" | "request" | "audit";
  graphicType: "sparkline" | "bars" | "progressDonut";
  progressValue?: number;
  progressLabel?: string;
  iconBg: string;
  iconColor: string;
}

export interface ActivityChartData {
  title: string;
  subtitle: string;
  days: string[];
  activeUsers: number[];
  newUsers: number[];
  highlight: {
    day: string;
    label: string;
  };
}

export interface RoleDistributionItem {
  name: string;
  count: number;
  percent: number;
  color: string;
}

export interface RoleDistributionData {
  title: string;
  subtitle: string;
  totalUsers: string;
  roles: RoleDistributionItem[];
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: "Active" | "Pending" | "Inactive";
  initials: string;
}

export interface SecurityOverviewData {
  title: string;
  mfaAdoptionRate: string;
  mfaAdoptionLabel: string;
  activeSessions: number;
  sessionTimeout: string;
  passwordPolicy: string;
  lastAuditExport: string;
}

export interface DashboardData {
  currentUser: CurrentUser;
  header: {
    breadcrumbRoot: string;
    breadcrumbCurrent: string;
    searchPlaceholder: string;
    language: string;
    dateBadge: string;
    greeting: string;
    subtitle: string;
  };
  navigation: NavigationItem[];
  helpBox: {
    title: string;
    description: string;
    buttonText: string;
  };
  kpiCards: KpiCardItem[];
  activityChart: ActivityChartData;
  roleDistribution: RoleDistributionData;
  recentUsers: RecentUser[];
  securityOverview: SecurityOverviewData;
  footerNote: string;
}

export interface MockDataSchema {
  branding: BrandingData;
  login: LoginData;
  forgotPassword: ForgotPasswordData;
  dashboard: DashboardData;
}

export const mockData: MockDataSchema = {
  branding: {
    appName: "IntraShip",
    appSubtitle: "USER & ACCESS MANAGEMENT",
    portalTag: "IntraShip • User & Access Management",
    headline: "Access your workspace.",
    subheadline: "Manage users, roles and permissions in one secure place.",
    steps: [
      { id: "01", text: "Sign in with your account" },
      { id: "02", text: "Verify identity when MFA is enabled" },
      { id: "03", text: "Choose an authorized workspace" }
    ],
    badgeText: "YOUR SECURE WORKSPACE",
    helpSupportText: "Help & support",
    copyright: "© 2026 IntraShip • User & Access Management"
  },
  login: {
    badge: "ACCOUNT ACCESS",
    title: "Welcome back",
    subtitle: "Sign in to continue to your workspace.",
    emailLabel: "Email or username",
    emailPlaceholder: "Enter your email or username",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPasswordLink: "Forgot password?",
    submitButton: "Sign in",
    loadingButton: "Signing in...",
    supportTroubleText: "Having trouble accessing your account?",
    supportContactText: "Contact your administrator",
    securityNote: "Protected sign-in for your organization",
    validation: {
      requiredEmail: "Enter your email or username to continue.",
      requiredPassword: "Enter your password to continue.",
      invalidCredentials: "The email/username or password you entered is incorrect."
    }
  },
  forgotPassword: {
    badge: "ACCOUNT RECOVERY",
    title: "Forgot your password?",
    subtitle: "No worries. Enter your registered email and we'll send you a secure verification code.",
    emailLabel: "Registered email",
    emailPlaceholder: "name@example.com",
    submitButton: "Send verification code",
    loadingButton: "Sending code...",
    backToLogin: "Back to sign in",
    footerNote: "Your account stays protected throughout the recovery process.",
    validation: {
      requiredEmail: "Registered email is required.",
      invalidFormat: "Check the email address format (e.g. name@example.com)."
    },
    confirmation: {
      title: "Verification code sent!",
      message: "If an account matches your email address, you will receive a secure 6-digit verification code shortly. Please check your inbox and spam folder."
    },
    sidePanel: {
      tag: "ACCOUNT RECOVERY",
      title: "A secure way back in",
      subtitle: "Verify your identity before resetting your password.",
      items: [
        { id: "01", text: "Verification sent to your registered email" },
        { id: "02", text: "One-time code protects your account" },
        { id: "03", text: "Create a new, strong password" }
      ],
      footer: "INTRASHIP • SECURE BY DESIGN"
    }
  },
  dashboard: {
    currentUser: {
      name: "Minhaj Khan",
      role: "Administrator",
      initials: "MK"
    },
    header: {
      breadcrumbRoot: "Workspace",
      breadcrumbCurrent: "Dashboard",
      searchPlaceholder: "Search users, roles...",
      language: "EN",
      dateBadge: "TUESDAY, 27 OCTOBER 2026",
      greeting: "Good afternoon, Minhaj 👋",
      subtitle: "Here's what's happening across your user access workspace."
    },
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        active: true,
        href: "/dashboard"
      },
      {
        id: "users",
        label: "Users",
        icon: "Users",
        active: false,
        href: "/dashboard"
      },
      {
        id: "roles",
        label: "Roles & Permissions",
        icon: "KeyRound",
        active: false,
        href: "/dashboard"
      },
      {
        id: "requests",
        label: "Access Requests",
        icon: "CheckCircle2",
        badge: "7",
        active: false,
        href: "/dashboard"
      },
      {
        id: "audit",
        label: "Audit Logs",
        icon: "ListChecks",
        active: false,
        href: "/dashboard"
      },
      {
        id: "settings",
        label: "Settings",
        icon: "Settings",
        active: false,
        href: "/dashboard"
      }
    ],
    helpBox: {
      title: "Need a hand?",
      description: "Visit the help center for account and access support.",
      buttonText: "Open help center →"
    },
    kpiCards: [
      {
        id: "kpi-users",
        title: "Total Users",
        value: "348",
        badge: "▲ 12.8%",
        badgeType: "success",
        comparison: "vs. last month",
        iconType: "user",
        graphicType: "sparkline",
        iconBg: "#dcfce7",
        iconColor: "#15803d"
      },
      {
        id: "kpi-roles",
        title: "Active Roles",
        value: "8",
        badge: "▲ 2 new",
        badgeType: "success",
        comparison: "roles configured",
        iconType: "role",
        graphicType: "bars",
        iconBg: "#e0f2fe",
        iconColor: "#0284c7"
      },
      {
        id: "kpi-requests",
        title: "Access Requests",
        value: "24",
        badge: "● 7 pending",
        badgeType: "warning",
        comparison: "need your review",
        iconType: "request",
        graphicType: "progressDonut",
        progressValue: 71,
        progressLabel: "reviewed",
        iconBg: "#fef3c7",
        iconColor: "#d97706"
      },
      {
        id: "kpi-audit",
        title: "Audit Events",
        value: "1,248",
        badge: "▲ 8.4%",
        badgeType: "success",
        comparison: "this month",
        iconType: "audit",
        graphicType: "sparkline",
        iconBg: "#f3e8ff",
        iconColor: "#7e22ce"
      }
    ],
    activityChart: {
      title: "User Activity Overview",
      subtitle: "New and active users over the past 7 days",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      activeUsers: [140, 190, 170, 260, 230, 300, 312],
      newUsers: [30, 50, 40, 90, 70, 110, 100],
      highlight: {
        day: "Sun",
        label: "312 active"
      }
    },
    roleDistribution: {
      title: "Users by Role",
      subtitle: "Distribution across workspace roles",
      totalUsers: "348",
      roles: [
        { name: "Teachers", count: 214, percent: 61, color: "#1e4d3a" },
        { name: "Administrators", count: 38, percent: 10, color: "#8fb07a" },
        { name: "Support staff", count: 61, percent: 17, color: "#d89a3a" },
        { name: "Other", count: 35, percent: 10, color: "#bcd3c4" }
      ]
    },
    recentUsers: [
      {
        id: "usr-1",
        name: "Ayesha Malik",
        email: "ayesha.m@example.com",
        role: "Teacher",
        lastActive: "2 minutes ago",
        status: "Active",
        initials: "AM"
      },
      {
        id: "usr-2",
        name: "Hamza Ali",
        email: "hamza.a@example.com",
        role: "Administrator",
        lastActive: "18 minutes ago",
        status: "Active",
        initials: "HA"
      },
      {
        id: "usr-3",
        name: "Sara Ahmed",
        email: "sara.ahmed@example.com",
        role: "Support staff",
        lastActive: "Yesterday",
        status: "Pending",
        initials: "SA"
      },
      {
        id: "usr-4",
        name: "Usman Tariq",
        email: "usman.t@example.com",
        role: "Teacher",
        lastActive: "3 days ago",
        status: "Inactive",
        initials: "UT"
      }
    ],
    securityOverview: {
      title: "Security Overview",
      mfaAdoptionRate: "89.2%",
      mfaAdoptionLabel: "Users with active Multi-Factor Authentication",
      activeSessions: 46,
      sessionTimeout: "30 minutes idle timeout",
      passwordPolicy: "Strict (12+ characters, upper, lower, numbers, symbols)",
      lastAuditExport: "26 Oct 2026, 4:45 PM"
    },
    footerNote: "IntraShip UAM • Dashboard overview concept • Sample data for design preview"
  }
};

// Feature-level data accessors
export const brandingData = mockData.branding;
export const loginData = mockData.login;
export const forgotPasswordData = mockData.forgotPassword;
export const dashboardData = mockData.dashboard;
