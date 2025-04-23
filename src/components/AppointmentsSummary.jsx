import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function AppointmentsSummary({ appointments, onDelete }) {
  // Format date for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric', 
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Card className="sm:border-border/40 sm:shadow-md overflow-hidden">
      <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3 border-b border-border/20">
        <div className="flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm sm:text-base font-medium">My Appointments</span>
        </div>
      </CardHeader>
      
      {appointments.length === 0 ? (
        <CardContent className="text-muted-foreground text-center py-6 sm:py-10 bg-muted/10 rounded-lg border border-dashed border-border">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-primary/20 mb-2 sm:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-primary font-medium mb-1">No appointments booked</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Select a doctor to make your first appointment.</p>
        </CardContent>
      ) : (
        <CardContent className="p-3 sm:p-4 pt-2 sm:pt-3">
          <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
            You have {appointments.length} upcoming appointment{appointments.length !== 1 ? 's' : ''}.
          </div>
          <ul className="space-y-2 sm:space-y-3" role="list" aria-label="Your appointments">
            {appointments.map(({ id, doctor, time }) => (
              <li
                key={id}
                className="bg-muted/10 hover:bg-muted/20 rounded-lg p-2 sm:p-3 border border-border/40 transition-colors"
                aria-label={`Appointment with ${doctor.name} on ${formatDate(time)}`}
              >
                <div className="flex items-start">
                  {/* Avatar with responsive sizing */}
                  <div className="flex-shrink-0">
                    <img
                      src={doctor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&color=fff`}
                      alt=""
                      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover border border-border shadow-sm"
                    />
                  </div>
                  
                  {/* Content with responsive text */}
                  <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base text-foreground truncate">{doctor.name}</div>
                    <Badge variant="outline" className="mt-0.5 sm:mt-1 px-1.5 py-0 h-4 sm:h-5 text-[10px] sm:text-xs">{doctor.specialty}</Badge>
                    
                    <div className="mt-1 sm:mt-2 flex items-center text-[10px] sm:text-xs text-muted-foreground">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium truncate">{formatDate(time)}</span>
                    </div>
                    
                    <div className="mt-0.5 sm:mt-1 flex items-center text-[10px] sm:text-xs text-muted-foreground">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/70 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{doctor.location}</span>
                    </div>
                  </div>
                  
                  {/* Delete button with responsive sizing */}
                  <div className="ml-1 mt-0.5">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10" 
                      aria-label="Cancel appointment"
                      onClick={() => onDelete(id)}
                    >
                      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}

export default AppointmentsSummary;