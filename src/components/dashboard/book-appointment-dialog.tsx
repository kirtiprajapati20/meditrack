'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { doctors, patients, appointments } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CalendarPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type BookAppointmentDialogProps = {
  patientName?: string;
  trigger?: React.ReactNode;
};

export function BookAppointmentDialog({ patientName, trigger }: BookAppointmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAppointment = {
      id: `APT${Date.now().toString().slice(-3)}`,
      patientName: formData.get('patient') as string,
      doctorName: formData.get('doctor') as string,
      date: format(date!, 'yyyy-MM-dd'),
      time: formData.get('time') as string,
      status: 'Upcoming' as 'Upcoming' | 'Completed' | 'Cancelled',
    };
    
    // This is where you would typically handle the form submission,
    // e.g., by calling an API to save the appointment.
    // For now, we'll just add it to our mock data and show a toast.
    appointments.unshift(newAppointment);

    toast({
      title: "Appointment Booked!",
      description: `Appointment for ${newAppointment.patientName} with ${newAppointment.doctorName} has been scheduled.`,
    });

    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button>
      <CalendarPlus className="mr-2" />
      Book Appointment
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a new appointment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">Patient</Label>
              {patientName ? (
                 <Input id="patient" name="patient" defaultValue={patientName} className="col-span-3" required readOnly />
              ) : (
                <Select name="patient" required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                        {patients.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                    </SelectContent>
                </Select>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">Doctor</Label>
              <Select name="doctor" required>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                    {doctors.map(d => <SelectItem key={d.id} value={d.name}>{d.name} ({d.speciality})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input id="time" name="time" type="time" defaultValue="09:00" className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Book Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
