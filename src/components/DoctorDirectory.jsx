import React, { useState, useEffect } from "react";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import DoctorCard from "./DoctorCard";
import FilterBar from "./FilterBar";
import { specialties } from "../data/doctors";

function DoctorDirectory({ doctors, onBook, onInsuranceFilterChange, insuranceFilter }) {
  const [selectedSpecialties, setSelectedSpecialties] = useState(["All"]);
  const [selectedDate, setSelectedDate] = useState("any");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6; // Number of doctors to show per page

  // Filter doctors based on criteria
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by specialty - either 'All' is selected, or this doctor's specialty is in the selected specialties
    const specialtyMatch = selectedSpecialties.includes("All") || 
                          selectedSpecialties.includes(doctor.specialty);
    
    // Filter by date if a specific date was selected
    let dateMatch = true;
    if (selectedDate !== "any") {
      dateMatch = doctor.availability.some(slot => 
        slot.startsWith(selectedDate)
      );
    }
    
    return specialtyMatch && dateMatch;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSpecialties, selectedDate, insuranceFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Page navigation handlers
  const goToNextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1));
  };

  return (
    <div>
      <FilterBar
        specialties={specialties}
        selectedSpecialties={selectedSpecialties}
        onSpecialtiesChange={setSelectedSpecialties}
        onDateChange={setSelectedDate}
        insuranceFilter={insuranceFilter}
        onInsuranceChange={onInsuranceFilterChange}
      />
      
      {filteredDoctors.length === 0 ? (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <SearchX className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground text-center">
              No doctors available with the selected filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mt-3 sm:mt-4">
            {currentDoctors.map((doc) => (
              <div key={doc.id} className="transition duration-300 hover:transform hover:translate-y-[-2px]">
                <DoctorCard doctor={doc} onBook={onBook} />
              </div>
            ))}
          </div>
          
          {/* Fully Responsive Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/60">
              {/* Results summary - visible on sm+ screens */}
              <div className="hidden sm:flex items-center text-xs sm:text-sm text-muted-foreground">
                <span className="bg-muted/30 px-2 py-1 rounded mr-2 font-medium text-foreground">{indexOfFirstDoctor + 1}-{Math.min(indexOfLastDoctor, filteredDoctors.length)}</span> 
                of {filteredDoctors.length} specialists
              </div>
              
              {/* Touch-friendly pagination controls */}
              <div className="flex justify-center w-full sm:w-auto items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-muted-foreground/20 hover:bg-muted/60 transition-colors"
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                
                {/* Page indicator with responsive text */}
                <div className="flex items-center space-x-1.5 mx-2 sm:mx-3">
                  {/* On mobile, show dots for pages */}
                  <div className="flex space-x-1 sm:hidden">
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      // Logic to show at most 5 dots with current page centered
                      let pageNum = 1;
                      if (totalPages <= 5) {
                        pageNum = i + 1;  // Show all pages if 5 or fewer
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;  // Show first 5 pages
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;  // Show last 5 pages
                      } else {
                        pageNum = currentPage - 2 + i;  // Center current page
                      }
                      
                      return (
                        <div 
                          key={i} 
                          className={`h-1.5 w-1.5 rounded-full ${currentPage === pageNum ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* On larger screens, show actual page numbers */}
                  <div className="hidden sm:block text-sm font-medium text-center min-w-10">
                    {currentPage} / {totalPages}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-muted-foreground/20 hover:bg-muted/60 transition-colors"
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DoctorDirectory;