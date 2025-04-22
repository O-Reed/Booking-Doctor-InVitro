import React from 'react';
import { Users, Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

function MobileNav({ activeTab, setActiveTab }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 md:hidden z-50">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50">
          <TabsTrigger 
            value="doctors"
            className="flex flex-col py-2 px-0 data-[state=active]:bg-background data-[state=active]:shadow"
            aria-label="View doctors"
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs">Doctors</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="appointments"
            className="flex flex-col py-2 px-0 data-[state=active]:bg-background data-[state=active]:shadow"
            aria-label="View my appointments"
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-xs">My Appointments</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default MobileNav;