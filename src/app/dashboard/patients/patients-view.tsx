'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { patients as initialPatients, Patient } from '@/lib/placeholder-data';
import { MoreHorizontal, PlusCircle, CalendarPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PatientsView() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const handleAddPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPatient: Patient = {
      id: `PT${Date.now().toString().slice(-3)}`,
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string, 10),
      gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
      lastAppointment: new Date().toISOString().split('T')[0],
      status: formData.get('status') as 'In Patient' | 'Out Patient',
      avatarUrl: `https://picsum.photos/seed/${Math.random()}/200/200`,
      location: formData.get('location') as string,
    };
    setPatients([newPatient, ...patients]);
    setAddDialogOpen(false);
  };
  
  const handleEditPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingPatient) return;
  
    const formData = new FormData(event.currentTarget);
    const updatedPatient = {
      ...editingPatient,
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string, 10),
      gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
      status: formData.get('status') as 'In Patient' | 'Out Patient',
      location: formData.get('location') as string,
    };
  
    setPatients(
      patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setEditingPatient(null);
  };


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3">
          <Input placeholder="Search Keyword" />
        </div>
        <div className="flex items-center gap-2">
            {/* Placeholder for view toggle icons */}
            <Button variant="outline" size="icon"><span className="sr-only">Grid View</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg></Button>
            <Button variant="ghost" size="icon"><span className="sr-only">List View</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg></Button>
             <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2" />
                    Add New Patient
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to add a new patient to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddPatient}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="age" className="text-right">Age</Label>
                        <Input id="age" name="age" type="number" className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">Location</Label>
                        <Input id="location" name="location" className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="gender" className="text-right">Gender</Label>
                        <Select name="gender" defaultValue="Female">
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select name="status" defaultValue="In Patient">
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In Patient">In Patient</SelectItem>
                            <SelectItem value="Out Patient">Out Patient</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Add Patient</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="flex flex-col">
            <CardContent className="p-6 text-center flex-grow">
              <div className="flex justify-between items-start">
                  <Badge variant={patient.status === 'In Patient' ? 'default' : 'outline'} className={cn(patient.status === 'In Patient' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800', 'border-none')}>
                    {patient.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingPatient(patient)}>Edit</DropdownMenuItem>
                      <AlertDialog>
                          <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the patient {patient.name}.
                              </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(patient.id)}>
                                  Continue
                              </AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
              <Avatar className="w-20 h-20 mx-auto mb-4 mt-2">
                <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground">{patient.id}</p>
              <h3 className="text-lg font-semibold">{patient.name}</h3>
              <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-sm mt-4 border-t pt-4">
                  <div className="font-medium text-muted-foreground">Last Visit</div>
                  <div className="font-medium text-muted-foreground">Gender</div>
                  <div className="font-medium text-muted-foreground">Location</div>
                  <div>{format(new Date(patient.lastAppointment), 'dd MMM yyyy')}</div>
                  <div>{patient.gender}</div>
                  <div>{patient.location}</div>
              </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Add Appointment
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Patient Dialog */}
      <Dialog open={!!editingPatient} onOpenChange={(isOpen) => !isOpen && setEditingPatient(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Patient</DialogTitle>
              <DialogDescription>
                Make changes to the patient's profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingPatient && (
              <form onSubmit={handleEditPatient}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                    <Input id="edit-name" name="name" defaultValue={editingPatient.name} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-age" className="text-right">Age</Label>
                    <Input id="edit-age" name="age" type="number" defaultValue={editingPatient.age} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-location" className="text-right">Location</Label>
                    <Input id="edit-location" name="location" defaultValue={editingPatient.location} className="col-span-3" required />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right">Gender</Label>
                    <Select name="gender" defaultValue={editingPatient.gender}>
                        <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-status" className="text-right">Status</Label>
                    <Select name="status" defaultValue={editingPatient.status}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Patient">In Patient</SelectItem>
                        <SelectItem value="Out Patient">Out Patient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary" onClick={() => setEditingPatient(null)}>Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
    </>
  );
}
