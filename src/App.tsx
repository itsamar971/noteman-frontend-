import { Switch, Route, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import SemesterPage from "@/pages/SemesterPage";
import SubjectPage from "@/pages/SubjectPage";
import ResourcesPage from "@/pages/ResourcesPage";
import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminManageResources from "@/pages/AdminManageResources";
import AboutPage from "@/pages/AboutPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ContributePage from "@/pages/ContributePage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";
import ExamModePage from "@/pages/ExamModePage";
import { AuthProvider } from "./hooks/useAuth";
import { NavigationProvider } from "./hooks/useNavigation";
import ScrollToTop from "@/components/ScrollToTop";
import ExamBanner from "@/components/layout/ExamBanner";
import TelegramFab from "@/components/ui/TelegramFab";

function App() {
  const [location] = useLocation();
  const isDashboardOrAuth = location === "/login" || location.startsWith("/admin");

  return (
    <AuthProvider>
      <NavigationProvider>
        {!isDashboardOrAuth && <ExamBanner />}
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className={`flex-grow ${isDashboardOrAuth ? "" : "pt-16"}`}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/branch/:branch" component={SemesterPage} />
              <Route path="/branch/:branch/semester/:semester" component={SubjectPage} />
              <Route path="/branch/:branch/semester/:semester/subject/:subject" component={ResourcesPage} />
              <Route path="/exam-mode" component={ExamModePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/admin/dashboard" component={AdminDashboard} />
              <Route path="/admin/manage-resources" component={AdminManageResources} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/terms" component={TermsPage} />
              <Route path="/privacy" component={PrivacyPage} />
              <Route path="/contribute" component={ContributePage} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </NavigationProvider>
    </AuthProvider>
  );
}

export default App;
