import { create } from 'zustand';
import { doctors as initialDoctors } from '../data/doctors';

/**
 * Main application store using Zustand
 * 
 * Manages all application state including:
 * - Doctors data and filtering
 * - Appointments management
 * - UI state (loading, modals, active tab)
 */
const useAppStore = create((set, get) => ({
  // Data state
  doctors: initialDoctors,
  insuranceFilter: '',
  appointments: [],
  
  // UI state
  loading: true, 
  showModal: false,
  selectedDoctor: null,
  activeTab: 'doctors',
  
  // State actions

  
  // Actions
  setLoading: (isLoading) => set({ loading: isLoading }),
  
  setInsuranceFilter: (insurance) => set({ insuranceFilter: insurance }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Doctor selection and modal
  bookDoctor: (doctor) => set({ 
    selectedDoctor: doctor, 
    showModal: true 
  }),
  
  closeModal: () => set({ 
    showModal: false, 
    selectedDoctor: null 
  }),
  
  // Appointment management
  confirmAppointment: (doctor, time) => {
    const { doctors } = get();
    
    // Add appointment
    set((state) => ({
      appointments: [
        ...state.appointments,
        { 
          id: Date.now(), 
          doctor, 
          time 
        },
      ],
      
      // Remove time slot from doctor's availability
      doctors: doctors.map(doc => {
        if (doc.id === doctor.id) {
          return {
            ...doc,
            availability: doc.availability.filter(slot => slot !== time)
          };
        }
        return doc;
      }),
      
      // Close modal after booking
      showModal: false,
      selectedDoctor: null
    }));
  },
  
  deleteAppointment: (appointmentId) => {
    const { appointments, doctors } = get();
    const appointmentToDelete = appointments.find(app => app.id === appointmentId);
    
    if (appointmentToDelete) {
      set({
        // Remove the appointment
        appointments: appointments.filter(app => app.id !== appointmentId),
        
        // Add the time slot back to the doctor's availability
        doctors: doctors.map(doc => {
          if (doc.id === appointmentToDelete.doctor.id) {
            // Add the time back to availability and sort
            const updatedAvailability = [...doc.availability, appointmentToDelete.time]
              .sort((a, b) => new Date(a) - new Date(b));
              
            return {
              ...doc,
              availability: updatedAvailability
            };
          }
          return doc;
        })
      });
    }
  },
  
  // Initialize app (simulates API loading)
  initializeApp: () => {
    set({ loading: true });
    
    // Simulate API loading
    setTimeout(() => {
      set({ loading: false });
    }, 1000);
  }
}));

export default useAppStore;
