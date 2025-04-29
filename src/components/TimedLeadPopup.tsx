
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DownloadReportForm } from './DownloadReportForm';

interface TimedLeadPopupProps {
  // Time in milliseconds before popup appears
  delay?: number;
}

export function TimedLeadPopup({ delay = 15000 }: TimedLeadPopupProps) {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  
  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasBeenShown = sessionStorage.getItem('lead-popup-shown') === 'true';
    
    if (!hasBeenShown) {
      // Set a timer to show the popup after the delay
      const timer = setTimeout(() => {
        setOpen(true);
        setHasShown(true);
        // Mark that the popup has been shown in this session
        sessionStorage.setItem('lead-popup-shown', 'true');
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  // Close the popup
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-infomineo-blue/90 to-indigo-900/90 backdrop-blur p-0 border-none rounded-xl overflow-hidden shadow-xl">
        <div className="relative">
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close popup</span>
          </Button>
        </div>
        
        <div className="py-8 px-6">
          <h2 className="text-2xl font-bold mb-2 text-center text-white">
            Stay ahead of global trade trends
          </h2>
          <p className="text-white/80 mb-6 text-center">
            Get exclusive reports and insights delivered to your inbox
          </p>
          <DownloadReportForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
