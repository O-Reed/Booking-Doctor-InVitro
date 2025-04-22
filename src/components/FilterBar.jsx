import React from "react";
import { Filter, User2, Calendar, Shield } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

function FilterBar({ specialties, selected, onChange, onDateChange, insuranceFilter, onInsuranceChange }) {
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
    <Card className="mb-5">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-primary mr-2" />
          <CardTitle className="text-lg">Filters</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div>
          <h3 className="text-sm font-medium text-foreground/80 mb-3 flex items-center">
            <User2 className="w-4 h-4 text-primary mr-1.5" />
            Specialty
          </h3>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Specialty filters">
            {specialties.map((spec) => (
              <Button
                key={spec}
                variant={selected === spec ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => onChange(spec)}
                role="tab"
                aria-selected={selected === spec}
              >
                {spec}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-foreground/80 mb-3 flex items-center">
            <Calendar className="w-4 h-4 text-primary mr-1.5" />
            Date Availability
          </h3>
          <Select
            defaultValue="any"
            onValueChange={(value) => onDateChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a date" />
            </SelectTrigger>
            <SelectContent>
              {dates.map(date => (
                <SelectItem key={date.value} value={date.value}>
                  {date.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Additional filter options */}
        <div>
          <h3 className="text-sm font-medium text-foreground/80 mb-3 flex items-center">
            <Shield className="w-4 h-4 text-primary mr-1.5" />
            Insurance
          </h3>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Insurance filters">
            {[
              { value: '', label: 'Any' },
              { value: 'Medicare', label: 'Medicare' }, 
              { value: 'Blue Cross', label: 'Blue Cross' }, 
              { value: 'Aetna', label: 'Aetna' }, 
              { value: 'Cigna', label: 'Cigna' }
            ].map((ins) => (
              <Badge 
                key={ins.value} 
                variant={insuranceFilter === ins.value ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent"
                onClick={() => onInsuranceChange(ins.value)}
                role="tab"
                aria-selected={insuranceFilter === ins.value}
              >
                {ins.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilterBar;