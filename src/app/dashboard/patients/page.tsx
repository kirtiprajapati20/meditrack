'use client';

import { useState } from 'react';
import PageHeader from '@/components/dashboard/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { patients as initialPatients, Patient } from '@/lib/placeholder-data';
import { MoreHorizontal, PlusCircle } from 'lucide-react';

export default function PatientsPage() {
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
      status: formData.get('status') as 'Active' | 'Inactive',
      avatarUrl: `https://picsum.photos/seed/${Math.random()}/200/200`,
    };
    setPatients([...patients, newPatient]);
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
      status: formData.get('status') as 'Active' | 'Inactive',
    };
  
    setPatients(
      patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setEditingPatient(null);
  };


  return (
    <>
      <PageHeader title="Patients">
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
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
                  <Select name="status" defaultValue="Active">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
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
      </PageHeader>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Gender</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead className="hidden sm:table-cell">Last Appointment</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={patient.avatarUrl} alt="Avatar" />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{patient.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={patient.status === 'Active' ? 'secondary' : 'outline'}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{patient.gender}</TableCell>
                  <TableCell className="hidden md:table-cell">{patient.age}</TableCell>
                  <TableCell className="hidden sm:table-cell">{patient.lastAppointment}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Patient Dialog */}
      <Dialog open={!!editingPatient} onOpenChange={(isOpen) => !isOpen && setEditingPatient(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Patient</DialogTitle>
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
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
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
