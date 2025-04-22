import React, { useState, useEffect } from "react";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import DoctorCard from "./DoctorCard";
import FilterBar from "./FilterBar";
import { specialties } from "../data/doctors";

function DoctorDirectory({ doctors, onBook, onInsuranceFilterChange, insuranceFilter }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedDate, setSelectedDate] = useState("any");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6; // Number of doctors to show per page

  // Filter doctors based on criteria
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by specialty
    const specialtyMatch = selectedSpecialty === "All" || 
                          doctor.specialty === selectedSpecialty;
    
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
  }, [selectedSpecialty, selectedDate, insuranceFilter]);

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
        selected={selectedSpecialty}
        onChange={setSelectedSpecialty}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {currentDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} onBook={onBook} />
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{indexOfFirstDoctor + 1}-{Math.min(indexOfLastDoctor, filteredDoctors.length)}</span> of <span className="font-medium text-foreground">{filteredDoctors.length}</span> specialists
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
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