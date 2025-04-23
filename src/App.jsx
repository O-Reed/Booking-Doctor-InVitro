import React, { useEffect } from "react";
import DoctorDirectory from "./components/DoctorDirectory";
import BookingModal from "./components/BookingModal";
import AppointmentsSummary from "./components/AppointmentsSummary";
import MobileNav from "./components/MobileNav";
import { Icons } from "./components/ui/icons";
import useAppStore from "./store/useAppStore";

function App() {
  // Destructure values and actions from the Zustand store
  // Use individual selectors for better performance and to avoid infinite loops
  const loading = useAppStore(state => state.loading);
  const showModal = useAppStore(state => state.showModal);
  const selectedDoctor = useAppStore(state => state.selectedDoctor);
  const appointments = useAppStore(state => state.appointments);
  const activeTab = useAppStore(state => state.activeTab);
  const insuranceFilter = useAppStore(state => state.insuranceFilter);
  const doctors = useAppStore(state => state.doctors);

  // Actions
  const setActiveTab = useAppStore(state => state.setActiveTab);
  const setInsuranceFilter = useAppStore(state => state.setInsuranceFilter);
  const bookDoctor = useAppStore(state => state.bookDoctor);
  const closeModal = useAppStore(state => state.closeModal);
  const confirmAppointment = useAppStore(state => state.confirmAppointment);
  const deleteAppointment = useAppStore(state => state.deleteAppointment);
  const initializeApp = useAppStore(state => state.initializeApp);
  
  // Create filtered doctors list here instead of in the store
  const filteredDoctors = React.useMemo(() => {
    // Check for both empty string and 'all' value (the no-filter cases)
    return insuranceFilter && insuranceFilter !== 'all'
      ? doctors.filter(doctor => doctor.insurance && doctor.insurance.includes(insuranceFilter))
      : doctors;
  }, [doctors, insuranceFilter]);

  useEffect(() => {
    // Initialize app with loading effect
    initializeApp();
  }, []);
  
  // Handle insurance filter change
  const handleInsuranceFilterChange = (insurance) => {
    setInsuranceFilter(insurance);
  };
  
  const handleBook = (doctor) => {
    bookDoctor(doctor);
  };

  const handleConfirm = (doctor, time) => {
    confirmAppointment(doctor, time);
  };
  
  const handleDeleteAppointment = (appointmentId) => {
    deleteAppointment(appointmentId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Icons.clipboard className="w-16 h-16 text-primary/20 mx-auto mb-6" />
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium text-lg">Loading doctor profiles...</div>
          <p className="text-muted-foreground mt-2">Please wait while we connect you with our specialists</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-16 md:pb-4">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <Icons.clipboard className="w-8 h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">InVitro Health</h1>
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl">Connect with top specialists for virtual consultations from the comfort of your home.</p>
      </header>
      
      {/* Main container */}
      <div className="max-w-7xl mx-auto">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-white shadow-sm border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icons.doctors className="w-5 h-5 text-primary" />
              Available Specialists
            </h2>
            <DoctorDirectory
              doctors={filteredDoctors}
              onBook={handleBook}
              onInsuranceFilterChange={handleInsuranceFilterChange}
              insuranceFilter={insuranceFilter}
            />
          </div>
          <div className="bg-white shadow-sm border border-border/50 rounded-xl p-6">
            <AppointmentsSummary appointments={appointments} onDelete={handleDeleteAppointment} />
          </div>
        </div>
        
        {/* Mobile layout */}
        <div className="block md:hidden bg-white shadow-sm border border-border/50 rounded-xl p-4">
          {activeTab === 'doctors' && (
            <>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icons.doctors className="w-5 h-5 text-primary" />
                Available Specialists
              </h2>
              <DoctorDirectory
                doctors={filteredDoctors}
                onBook={handleBook}
                onInsuranceFilterChange={handleInsuranceFilterChange}
                insuranceFilter={insuranceFilter}
              />
            </>
          )}
          {activeTab === 'appointments' && (
            <AppointmentsSummary appointments={appointments} onDelete={handleDeleteAppointment} />
          )}
        </div>
      </div>
      
      {/* Mobile navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Modal */}
      {showModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default App;