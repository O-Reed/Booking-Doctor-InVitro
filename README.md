### Recording product
https://www.loom.com/share/a432b8173064429f8bfcd81a8fd8c328

# InVitro Health - Doctor Booking Platform

## GitHub Repository

https://github.com/O-Reed/Booking-Doctor-InVitro

## Overview

InVitro Health is a responsive and accessible healthcare appointment booking platform designed to provide a seamless experience across all devices. The application allows users to browse doctors by specialty, check availability, book appointments, and manage their schedule.

## Features

- **Multi-select Specialty Filtering:** Browse doctors by multiple specialties simultaneously
- **Responsive Doctor Cards:** Clean, consistent presentation across all device sizes
- **Smart Date Filtering:** Find doctors with availability on specific dates
- **Insurance Filtering:** Filter doctors by accepted insurance providers
- **Appointment Management:** View and manage upcoming appointments
- **Accessible Interface:** ARIA-compliant with keyboard navigation support

## Tech Stack

- **Frontend Framework:** React with Vite for fast development
- **UI Components:** shadcn UI for consistent, accessible components
- **Styling:** TailwindCSS for responsive design
- **State Management:** Zustand for centralized application state
- **Testing:** Jest for unit and integration tests

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/O-Reed/Booking-Doctor-InVitro.git
   cd BOOKING-DOCTOR-INVITRO
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## AI Tool Usage

This project utilized AI tools to enhance development in the following ways:

### UI/UX Improvements

- **Filter Component Enhancement:** AI assistance was used to implement a multi-select specialty filter with horizontal scrolling and individual tag deletion functionality
- **Responsive Layout Optimization:** Enhanced component layouts for better display across different screen sizes
- **Visual Consistency:** Ensured consistent styling of UI elements including cards, filters, and buttons

### Code Quality

- **State Management Optimization:** Used AI to refactor components to use Zustand for centralized state management
- **Component Structure:** Improved component organization and reusability
- **Accessibility:** Added ARIA attributes and keyboard navigation support

## Known Limitations & Next Steps

### Current Limitations

- Limited test coverage for new components and functionality
- No backend integration - currently using mock data
- Calendar date selection is limited to predefined options

### Future Enhancements

1. **Data Persistence:** Implement localStorage or backend storage for user preferences and appointments
2. **Advanced Filtering:** Add distance-based filtering and more complex search options
3. **Enhanced Calendar:** Implement a full calendar interface for appointment selection
4. **Animation:** Add subtle animations for smoother user experience
5. **Comprehensive Testing:** Add full unit and integration test coverage
6. **Doctor Profiles:** Create detailed doctor profile pages with ratings and reviews

## Accessibility Features

- Keyboard navigation support for all interactive elements
- ARIA attributes for screen readers
- Focus management in modal dialogs and dropdowns
- Color contrast compliance with WCAG guidelines
- Responsive design for all device sizes including tablet and mobile
- Multi-select dropdown with keyboard support

## Questions?

Please feel free to reach out with any questions about setup, implementation details, or enhancement suggestions.
