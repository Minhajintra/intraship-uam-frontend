// TypeScript interfaces for IntraShip UAM data structures

export interface StepItem {
  id: string;
  text: string;
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

export interface CurrentUser {
  name: string;
  role: string;
  initials: string;
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
