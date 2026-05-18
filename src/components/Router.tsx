import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import StrategicAdvisoryPage from '@/components/pages/StrategicAdvisoryPage';
import HighStakesCasesPage from '@/components/pages/HighStakesCasesPage';
import ExpertisePage from '@/components/pages/ExpertisePage';
import ExpertiseDetailPage from '@/components/pages/ExpertiseDetailPage';
import PublicationsPage from '@/components/pages/PublicationsPage';
import PublicationDetailPage from '@/components/pages/PublicationDetailPage';
import TrainingPage from '@/components/pages/TrainingPage';
import TrainingCourseDetailPage from '@/components/pages/TrainingCourseDetailPage';
import JurisprudencePage from '@/components/pages/JurisprudencePage';
import TeamPage from '@/components/pages/TeamPage';
import TeamDetailPage from '@/components/pages/TeamDetailPage';
import GlobalPresencePage from '@/components/pages/GlobalPresencePage';
import AboutPage from '@/components/pages/AboutPage';
import ConsultationPage from '@/components/pages/ConsultationPage';
import ContactPage from '@/components/pages/ContactPage';
import AILegalInfrastructurePage from '@/components/pages/AILegalInfrastructurePage';
import TalentNetworkPage from '@/components/pages/TalentNetworkPage';
import ResearchPublicationsPage from '@/components/pages/ResearchPublicationsPage';
import LegalAdvisoryPage from '@/components/pages/LegalAdvisoryPage';
import BusinessDevelopmentPage from '@/components/pages/BusinessDevelopmentPage';
import ComplianceGovernancePage from '@/components/pages/ComplianceGovernancePage';
import TaxStructuringPage from '@/components/pages/TaxStructuringPage';
import CrossBorderExpertsPage from '@/components/pages/CrossBorderExpertsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "strategic-advisory",
        element: <StrategicAdvisoryPage />,
      },
      {
        path: "high-stakes-cases",
        element: <HighStakesCasesPage />,
      },
      {
        path: "expertise",
        element: <ExpertisePage />,
      },
      {
        path: "expertise/:id",
        element: <ExpertiseDetailPage />,
      },
      {
        path: "publications",
        element: <PublicationsPage />,
      },
      {
        path: "publications/:id",
        element: <PublicationDetailPage />,
      },
      {
        path: "training",
        element: <TrainingPage />,
      },
      {
        path: "training/:id",
        element: <TrainingCourseDetailPage />,
      },
      {
        path: "jurisprudence",
        element: <JurisprudencePage />,
      },
      {
        path: "team",
        element: <TeamPage />,
      },
      {
        path: "team/:id",
        element: <TeamDetailPage />,
      },
      {
        path: "global-presence",
        element: <GlobalPresencePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "consultation",
        element: <ConsultationPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "ai-legal-infrastructure",
        element: <AILegalInfrastructurePage />,
      },
      {
        path: "talent-network",
        element: <TalentNetworkPage />,
      },
      {
        path: "talent-network/research-publications",
        element: <ResearchPublicationsPage />,
      },
      {
        path: "talent-network/legal-advisory",
        element: <LegalAdvisoryPage />,
      },
      {
        path: "talent-network/business-development",
        element: <BusinessDevelopmentPage />,
      },
      {
        path: "talent-network/compliance-governance",
        element: <ComplianceGovernancePage />,
      },
      {
        path: "talent-network/tax-structuring",
        element: <TaxStructuringPage />,
      },
      {
        path: "talent-network/cross-border-experts",
        element: <CrossBorderExpertsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
