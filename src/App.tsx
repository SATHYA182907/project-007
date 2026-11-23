import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { AuthProvider } from './hooks/useAuth';

// Division Portals
import { EntryHubPage } from './pages/EntryHubPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { LifeSkillsPage } from './pages/LifeSkillsPage';

// Admin Portal Pages & Components
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminSubmissionsPage } from './pages/admin/AdminSubmissionsPage';
import { AdminSubmissionDetailPage } from './pages/admin/AdminSubmissionDetailPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminUserDetailPage } from './pages/admin/AdminUserDetailPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. New Website Entry Experience: Brand & Division Selection */}
          <Route path="/" element={<EntryHubPage />} />

          {/* 2. Events Division: Complete Public Events Portal */}
          <Route path="/events" element={<PortfolioPage />} />

          {/* 3. Life Skills Division: Dedicated Coming Soon Portal */}
          <Route path="/lifeskills" element={<LifeSkillsPage />} />
          <Route path="/education" element={<Navigate to="/lifeskills" replace />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="submissions" element={<AdminSubmissionsPage />} />
            <Route path="submissions/:id" element={<AdminSubmissionDetailPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="users/:id" element={<AdminUserDetailPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="activity" element={<AdminActivityPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Catch-all redirect to Division Selection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </MotionConfig>
  );
}

export default App;
