import React from "react";
import { getInitialsAvatar } from "../utils/imageUtiles";
import { MapPin, Clock, Languages, Calendar, Star } from "lucide-react";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

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
  
  return (
    <Card className="transition-all hover:shadow-md h-full flex flex-col overflow-hidden border-border">
      <CardContent className="pt-6 pb-0 px-6 flex-grow relative">
        {/* Featured Badge */}
        {doctor.featuredBadge && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="text-xs font-medium text-primary">
              {doctor.featuredBadge}
            </Badge>
          </div>
        )}
        
        <div className="flex items-start mb-5 relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/20"></div>
          <Avatar className="w-20 h-20 border-2 border-border shadow-sm">
            <AvatarImage
              src={imgSrc}
              alt={`Photo of ${doctor.name}`}
              onError={(e) => {
                e.target.src = getInitialsAvatar(doctor.name);
              }}
            />
            <AvatarFallback className="bg-secondary text-primary font-bold">{getInitials(doctor.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
            <Badge variant="outline" className="mt-1 text-primary">{doctor.specialty}</Badge>
            <div className="flex items-center mt-2" aria-label={`Rating: ${doctor.rating} out of 5`}>
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="ml-1 text-muted-foreground">{doctor.rating}</span>
            </div>
          </div>
        </div>
      {/* Additional Info */}
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {/* Location & Experience */}
          <div className="flex text-sm text-muted-foreground gap-x-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-primary mr-1.5" />
              <span>{doctor.location}</span>
            </div>
            {doctor.experience && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-primary mr-1.5" />
                <span>{doctor.experience}</span>
              </div>
            )}
          </div>
          
          {/* Languages */}
          {doctor.languages && doctor.languages.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center mb-1">
                <Languages className="w-4 h-4 text-primary mr-1.5" />
                <span className="font-medium">Languages:</span>
              </div>
              <div className="flex flex-wrap gap-1 ml-5.5">
                {doctor.languages.map(lang => (
                  <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Bio - truncated */}
          {doctor.bio && (
            <div className="text-sm text-muted-foreground line-clamp-2 italic">
              "{doctor.bio}"
            </div>
          )}
          
          {/* Availability */}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-primary mr-1.5" />
            <span className="text-sm font-medium text-primary">
              {doctor.availability.length > 0 
                ? `${doctor.availability.length} time slots available` 
                : "No availability"}
            </span>
          </div>
        </div>
      </CardContent>
      
      {/* Book Button */}
      <CardFooter className="px-6 pt-3 pb-5">
        <Button
          className="w-full"
          onClick={() => onBook(doctor)}
          aria-label={`Book appointment with ${doctor.name}`}
          disabled={doctor.availability.length === 0}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DoctorCard;