import React from "react";
import { Search, Calendar, Shield } from "lucide-react";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

// CSS to hide scrollbar but keep scrolling functionality
const noScrollbarStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

function FilterBar({ specialties, selectedSpecialties, onSpecialtiesChange, onDateChange, insuranceFilter, onInsuranceChange }) {
  const [specialtyDropdownOpen, setSpecialtyDropdownOpen] = React.useState(false);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  
  const dates = [
    { value: "any", label: "Any Date" },
    { value: today.toISOString().split('T')[0], label: "Today" },
    { value: tomorrow.toISOString().split('T')[0], label: "Tomorrow" },
    { value: dayAfter.toISOString().split('T')[0], label: "Day After" },
  ];

  return (
    <>
      <style>{noScrollbarStyle}</style>
      <Card className="mb-3 shadow-md border-border/40 rounded-xl overflow-hidden">
        <CardContent className="p-0">
        {/* Multi-select specialty dropdown */}
        <div className="bg-muted/20 pt-3 px-2 pb-2">
          <div className="flex items-center gap-1.5" aria-label="Specialty filters">
            {/* Custom multi-select dropdown for specialties */}
            <div className="relative w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSpecialtyDropdownOpen(!specialtyDropdownOpen)}
                className="w-full justify-between text-left h-9 border border-input/50 font-normal px-3 text-sm"
              >
                <div className="flex items-center gap-1 w-full overflow-x-auto no-scrollbar py-1" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                  {selectedSpecialties.length === 0 || (selectedSpecialties.length === 1 && selectedSpecialties[0] === 'All') ? (
                    <>
                      <span className="mr-1 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="12" y1="3" x2="12" y2="21"></line>
                          <line x1="3" y1="12" x2="21" y2="12"></line>
                        </svg>
                      </span>
                      <span>All Specialties</span>
                    </>
                  ) : (
                    <>
                      {/* Show first 5 categories */}
                      {selectedSpecialties.slice(0, 5).map(spec => (
                        <Badge
                          key={spec}
                          variant="outline"
                          className="px-1.5 py-0 h-5 bg-primary/5 border-primary/20 text-[10px]"
                        >
                          <span className="mr-1">{spec}</span>
                          <button
                            type="button"
                            className="rounded-full hover:bg-muted inline-flex items-center justify-center h-3 w-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newSelection = selectedSpecialties.filter(s => s !== spec);
                              // If removing the last specialty, default back to 'All'
                              if (newSelection.length === 0) {
                                onSpecialtiesChange(['All']);
                              } else {
                                onSpecialtiesChange(newSelection);
                              }
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </button>
                        </Badge>
                      ))}
                      
                      {/* Show +X more indicator if more than 5 categories are selected */}
                      {selectedSpecialties.length > 5 && (
                        <Badge className="px-1.5 py-0 h-5 bg-primary/10 text-[10px] text-primary">
                          +{selectedSpecialties.length - 5} more
                        </Badge>
                      )}
                    </>
                  )}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto h-4 w-4 shrink-0 opacity-50">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </Button>
              
              {specialtyDropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-background shadow-lg">
                  <div className="max-h-60 overflow-auto p-1">
                    <div className="flex flex-col gap-1">
                      {/* Special 'All' option */}
                      <div
                        className={`flex items-center rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-muted ${selectedSpecialties.includes('All') ? 'bg-primary/5' : ''}`}
                        onClick={() => {
                          onSpecialtiesChange(['All']);
                          setSpecialtyDropdownOpen(false);
                        }}
                      >
                        <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                          {selectedSpecialties.includes('All') && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.5 2.5L3.5 7.5L1.5 5.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="ml-2 font-medium">All Specialties</span>
                      </div>
                      
                      {/* Individual specialty options */}
                      {specialties.filter(spec => spec !== 'All').map((spec) => {
                        const isSelected = selectedSpecialties.includes(spec);
                        
                        return (
                          <div
                            key={spec}
                            className={`flex items-center rounded-md px-2 py-2 text-sm cursor-pointer ${isSelected ? 'bg-primary/5' : 'hover:bg-muted'}`}
                            onClick={() => {
                              // Handle multi-select logic
                              const newSelection = [...selectedSpecialties];
                              
                              // Remove 'All' if it's selected
                              if (newSelection.includes('All')) {
                                newSelection.splice(newSelection.indexOf('All'), 1);
                              }
                              
                              // Toggle the selection
                              if (isSelected) {
                                newSelection.splice(newSelection.indexOf(spec), 1);
                                // If nothing is selected, default to 'All'
                                if (newSelection.length === 0) {
                                  newSelection.push('All');
                                }
                              } else {
                                newSelection.push(spec);
                              }
                              
                              onSpecialtiesChange(newSelection);
                            }}
                          >
                            <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                              {isSelected && (
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.5 2.5L3.5 7.5L1.5 5.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="ml-2">{spec}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Dropdown footer with Done button */}
                    <div className="flex items-center justify-end mt-2 pt-2 border-t border-border/30">
                      <Button
                        type="button"
                        size="sm"
                        className="text-xs h-7 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setSpecialtyDropdownOpen(false)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Filter controls optimized for iPad Mini */}
        <div className="grid grid-cols-2 gap-2 p-2">
          {/* Date Filter - compact for iPad Mini */}
          <div>
            <Select
              defaultValue="any"
              onValueChange={(value) => onDateChange(value)}
            >
              <SelectTrigger className="w-full border-input/50 rounded h-8 text-xs transition-all">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <SelectValue placeholder="Date" />
                </div>
              </SelectTrigger>
              <SelectContent sideOffset={4} className="rounded-md min-w-[120px]">
                {dates.map(date => (
                  <SelectItem key={date.value} value={date.value} className="text-xs">
                    {date.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Insurance Filter - compact for iPad Mini */}
          <div>
            <Select
              value={insuranceFilter}
              onValueChange={(value) => onInsuranceChange(value)}
            >
              <SelectTrigger className="w-full border-input/50 rounded h-8 text-xs transition-all">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  <SelectValue placeholder="Insurance" />
                </div>
              </SelectTrigger>
              <SelectContent sideOffset={4} className="rounded-md min-w-[120px]">
                <SelectItem value="all" className="text-xs">All Plans</SelectItem>
                <SelectItem value="Medicare" className="text-xs">Medicare</SelectItem>
                <SelectItem value="Blue Cross" className="text-xs">Blue Cross</SelectItem>
                <SelectItem value="Aetna" className="text-xs">Aetna</SelectItem>
                <SelectItem value="Cigna" className="text-xs">Cigna</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Search status indicator - simplified for iPad Mini */}
          <div className="col-span-2 flex items-center justify-between mt-1 px-1">
            <div className="flex items-center">
              <Search className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Filtered results</span>
            </div>
            
            <Button
              variant="link"
              className="text-[10px] text-primary h-6 p-0"
              onClick={() => {
                onChange("All");
                onDateChange("any");
                onInsuranceChange("all");
              }}
            >
              All specialists
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
}

export default FilterBar;