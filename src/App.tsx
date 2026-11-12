/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CrisisBanner } from './components/CrisisBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { BookingPage } from './pages/BookingPage';
import { BookingLookupPage } from './pages/BookingLookupPage';
import { BlogPage } from './pages/BlogPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { FAQPage } from './pages/FAQPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

import { TheraConnectStore } from './services/store';
import { Service } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [initialBookingServiceId, setInitialBookingServiceId] = useState<string | undefined>(undefined);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    TheraConnectStore.isAdminAuthenticated()
  );

  useEffect(() => {
    setIsAdminAuthenticated(TheraConnectStore.isAdminAuthenticated());
  }, [activeTab]);

  const handleNavigate = (tab: string, serviceId?: string) => {
    if (serviceId) {
      setInitialBookingServiceId(serviceId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceModal = (service: Service) => {
    setSelectedServiceForModal(service);
  };

  const handleCloseServiceModal = () => {
    setSelectedServiceForModal(null);
  };

  const handleSelectBookingFromModal = (serviceId: string) => {
    setSelectedServiceForModal(null);
    setInitialBookingServiceId(serviceId);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    TheraConnectStore.adminLogout();
    setIsAdminAuthenticated(false);
    setActiveTab('home');
  };

  // If viewing the Admin module and authenticated, display the dedicated full-screen SaaS dashboard
  if (activeTab === 'admin' && isAdminAuthenticated) {
    return (
      <AdminDashboard
        onLogout={handleAdminLogout}
        onNavigateHome={() => setActiveTab('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#242B29]">
      
      {/* 24/7 Clinical Emergency Support Notice */}
      <CrisisBanner />

      {/* Top Navigation conforming to strict 3-zone contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdminAuthenticated}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenServiceModal={handleOpenServiceModal}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            onSelectBooking={(serviceId) => handleNavigate('booking', serviceId)}
            onOpenServiceModal={handleOpenServiceModal}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onNavigateBooking={() => handleNavigate('booking')}
          />
        )}

        {activeTab === 'booking' && (
          <BookingPage
            initialServiceId={initialBookingServiceId}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'confirmation' && (
          <BookingLookupPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooking={() => handleNavigate('booking')}
          />
        )}

        {activeTab === 'blog' && <BlogPage />}

        {activeTab === 'resources' && <ResourcesPage />}

        {activeTab === 'faq' && <FAQPage />}

        {activeTab === 'testimonials' && (
          <TestimonialsPage
            onNavigateBooking={() => handleNavigate('booking')}
          />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {(activeTab === 'privacy' || activeTab === 'terms') && <LegalPage />}

        {activeTab === 'admin' && !isAdminAuthenticated && (
          <AdminLoginPage
            onLoginSuccess={handleAdminLoginSuccess}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* High-Editorial Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Clinical Service Details Modal / Drawer */}
      <ServiceModal
        service={selectedServiceForModal}
        isOpen={Boolean(selectedServiceForModal)}
        onClose={handleCloseServiceModal}
        onSelectBooking={handleSelectBookingFromModal}
      />

    </div>
  );
}
