import React, { useState, useMemo } from "react";
import { format, parseISO, addDays } from "date-fns";
import { Clock, MapPin, Calendar as CalendarIcon, Clock3 } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

function BookingModal({ doctor, onClose, onConfirm }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Format date for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', 
      minute: 'numeric'
    }).format(date);
  };
  
  // Group available slots by date
  const availableSlotsByDate = useMemo(() => {
    const groupedSlots = {};
    
    // Sort availability by date/time
    const sortedAvailability = [...doctor.availability].sort((a, b) => new Date(a) - new Date(b));
    
    // Group by date
    sortedAvailability.forEach(slot => {
      const date = new Date(slot);
      const dateKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
      
      if (!groupedSlots[dateKey]) {
        groupedSlots[dateKey] = [];
      }
      
      groupedSlots[dateKey].push(slot);
    });
    
    return groupedSlots;
  }, [doctor.availability]);

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Handle confirmation
  const handleConfirm = () => {
    if (selectedSlot) {
      onConfirm(doctor, selectedSlot);
    }
  };

  // Get doctor initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogDescription className="sr-only">
          Select an available appointment time with {doctor.name}
        </DialogDescription>
        <DialogHeader>
          <div className="flex items-start">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarImage src={doctor.photo} alt={doctor.name} />
              <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <DialogTitle className="text-xl">Book Appointment</DialogTitle>
              <div className="mt-1 font-medium text-primary">{doctor.name}</div>
              <Badge variant="outline" className="mt-1">{doctor.specialty}</Badge>
            </div>
          </div>
        </DialogHeader>
        
        <Card className="mt-4 border-muted">
          <CardContent className="p-3 flex flex-wrap gap-3 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-primary mr-1.5" />
              <span className="text-muted-foreground">{doctor.location}</span>
            </div>
            {doctor.experience && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-primary mr-1.5" />
                <span className="text-muted-foreground">{doctor.experience}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-3">Available Appointments</h3>
          
          {Object.keys(availableSlotsByDate).length > 0 ? (
            <ScrollArea className="h-[300px] pr-3">
              <RadioGroup
                value={selectedSlot}
                onValueChange={handleSlotSelect}
                className="space-y-4"
              >
                {Object.entries(availableSlotsByDate).map(([dateKey, slots]) => (
                  <Card key={dateKey} className="mb-3">
                    <CardContent className="p-3 pt-2">
                      <div className="flex items-center py-1 border-b mb-2">
                        <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                        <h4 className="font-medium">{formatDate(dateKey)}</h4>
                      </div>
                      <div className="space-y-1">
                        {slots.map((slot) => (
                          <div 
                            key={slot} 
                            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
                          >
                            <RadioGroupItem value={slot} id={slot} />
                            <Label htmlFor={slot} className="flex items-center flex-1 cursor-pointer">
                              <Clock3 className="w-4 h-4 mr-2 text-muted-foreground" />
                              {formatTime(slot)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              <p>No available appointments</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!selectedSlot}>
            {selectedSlot ? 
              `Book for ${format(new Date(selectedSlot), 'MMM d, h:mm a')}` : 
              'Select a time'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookingModal;