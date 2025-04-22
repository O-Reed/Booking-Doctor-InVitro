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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <CardTitle className="text-lg">My Appointments</CardTitle>
        </div>
      </CardHeader>
      
      {appointments.length === 0 ? (
        <CardContent className="text-gray-500 text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <svg className="w-16 h-16 mx-auto text-indigo-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-indigo-800 font-medium mb-1">No appointments booked</p>
          <p className="text-sm text-gray-600">Select a doctor to make your first appointment.</p>
        </CardContent>
      ) : (
        <CardContent>
          <div className="text-sm text-gray-600 mb-3">
            You have {appointments.length} upcoming appointment{appointments.length !== 1 ? 's' : ''}.
          </div>
          <ul className="space-y-3" role="list" aria-label="Your appointments">
            {appointments.map(({ id, doctor, time }) => (
              <li
                key={id}
                className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 hover:shadow-md transition-shadow"
                aria-label={`Appointment with ${doctor.name} on ${formatDate(time)}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img
                      src={doctor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&color=fff`}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-semibold text-gray-800">{doctor.name}</div>
                    <Badge variant="secondary" className="mt-1">{doctor.specialty}</Badge>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-indigo-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{formatDate(time)}</span>
                    </div>
                    
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-indigo-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{doctor.location}</span>
                    </div>
                  </div>
                  
                  <div className="ml-auto mt-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive/80" 
                      aria-label="Cancel appointment"
                      onClick={() => onDelete(id)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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