import React from "react";
import { getInitialsAvatar } from "../utils/imageUtiles";
import { MapPin, Calendar, Star, CheckCircle2, Clock } from "lucide-react";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

function DoctorCard({ doctor, onBook }) {
  const imgSrc = doctor.photo || getInitialsAvatar(doctor.name);
  
  // Get doctor initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Format next availability for easy reading
  const getNextAvailability = () => {
    if (doctor.availability.length === 0) {
      return null;
    }
    
    // Get the first available slot
    const nextSlot = doctor.availability[0];
    
    // Check if it's today
    const today = new Date().toLocaleDateString();
    const slotDate = new Date(nextSlot).toLocaleDateString();
    
    if (slotDate === today) {
      return `Today at ${new Date(nextSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`; 
    } else {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return new Date(nextSlot).toLocaleDateString(undefined, options);
    }
  };
  
  const nextAvailable = getNextAvailability();
  
  return (
    <Card className="overflow-hidden rounded-xl border-border/40 relative h-full flex flex-col">
      <CardContent className="p-3 sm:p-4 flex-grow">
        {/* Doctor profile with consistent layout */}
        <div className="flex mb-3">
          {/* Avatar - smaller on tablet */}
          <Avatar className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ring-1 ring-border shadow-sm mr-2 sm:mr-3 flex-shrink-0">
            <AvatarImage
              src={imgSrc}
              alt={`Photo of ${doctor.name}`}
              onError={(e) => {
                e.target.src = getInitialsAvatar(doctor.name);
              }}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {getInitials(doctor.name)}
            </AvatarFallback>
          </Avatar>

          {/* Doctor info with consistent alignment */}
          <div className="flex-1 min-w-0">
            {/* Rating always on top right */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-yellow-500 text-yellow-500 mr-1" />
                <span className="text-xs sm:text-sm font-medium">{doctor.rating}</span>
              </div>
            </div>
            
            {/* Featured badge positioned to not overlap with photo */}
            {doctor.featuredBadge && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-blue-500 text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded">
                {doctor.featuredBadge}
              </div>
            )}
            
            {/* Name always on one line */}
            <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
              {doctor.name}
            </h3>
            
            {/* Specialty always directly below name */}
            <Badge variant="outline" className="mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0 h-4 sm:h-5">
              <span className="text-[10px] sm:text-xs">{doctor.specialty}</span>
            </Badge>
            
            {/* Experience always below specialty */}
            <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
              <span>{doctor.experience}</span>
            </div>
          </div>
        </div>
        
        {/* Insurance info - simplified for smaller screens */}
        {doctor.insurance && doctor.insurance.length > 0 && (
          <div className="flex items-center mb-2 sm:mb-3">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 mr-1 sm:mr-1.5 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs text-muted-foreground truncate">Accepts {doctor.insurance[0]}{doctor.insurance.length > 1 ? ` +${doctor.insurance.length - 1}` : ''}</span>
          </div>
        )}
        
        {/* Location - consistent position */}
        <div className="flex items-center mb-2 sm:mb-3">
          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary mr-1 sm:mr-1.5 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{doctor.location}</span>
        </div>
        
        {/* Bio section with fixed size - same dimensions for all cards */}
        <div className="h-[60px] overflow-hidden mb-2">
          {doctor.bio ? (
            <div className="text-[10px] text-muted-foreground p-1.5 bg-muted/10 rounded-sm h-full overflow-y-auto">
              "{doctor.bio}"
            </div>
          ) : (
            <div className="h-full" />
          )}
        </div>
        
        {/* Availability information - fixed height section */}
        <div className="flex items-center justify-between border-t pt-2 border-border/30 h-[28px]">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 text-primary mr-1 flex-shrink-0" />
            <span className="text-[10px] truncate max-w-[100px]">
              {nextAvailable || "Not available"}
            </span>
          </div>
          
          <div className="ml-auto min-w-[40px] text-right">
            <span className="text-[10px] bg-muted/20 px-1 py-0.5 rounded">
              {doctor.availability.length} {doctor.availability.length === 1 ? 'slot' : 'slots'}
            </span>
          </div>
        </div>
      </CardContent>
      
      {/* Responsive booking button */}
      <CardFooter className="p-2 sm:p-3 pt-0">
        <Button
          className={cn(
            "w-full h-8 sm:h-9 text-xs sm:text-sm font-medium",
            doctor.availability.length === 0 && "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
          onClick={() => onBook(doctor)}
          aria-label={`Book appointment with ${doctor.name}`}
          disabled={doctor.availability.length === 0}
        >
          {doctor.availability.length > 0 ? "Book Appointment" : "No Availability"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DoctorCard;