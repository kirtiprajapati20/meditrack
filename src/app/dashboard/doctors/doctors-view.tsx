'use client';

import { useState } from 'react';
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
  } from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { doctors as initialDoctors, Doctor } from '@/lib/placeholder-data';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function DoctorsView() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  const handleAddDoctor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDoctor: Doctor = {
      id: `DOC${Date.now().toString().slice(-3)}`,
      name: formData.get('name') as string,
      speciality: formData.get('speciality') as string,
      status: formData.get('status') as 'Active' | 'On-leave',
      avatarUrl: `https://picsum.photos/seed/${Math.random()}/200/200`,
    };
    setDoctors([...doctors, newDoctor]);
    setAddDialogOpen(false);
  };
  
  const handleEditDoctor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingDoctor) return;
  
    const formData = new FormData(event.currentTarget);
    const updatedDoctor = {
      ...editingDoctor,
      name: formData.get('name') as string,
      speciality: formData.get('speciality') as string,
      status: formData.get('status') as 'Active' | 'On-leave',
    };
  
    setDoctors(
      doctors.map((doc) => (doc.id === updatedDoctor.id ? updatedDoctor : doc))
    );
    setEditingDoctor(null);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>
                  Fill out the form below to add a new doctor to the system.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddDoctor}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="speciality" className="text-right">Speciality</Label>
                    <Input id="speciality" name="speciality" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Status</Label>
                    <Select name="status" defaultValue="Active">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On-leave">On-leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Doctor</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Speciality</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={doctor.avatarUrl} alt="Avatar" />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{doctor.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{doctor.speciality}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={doctor.status === 'Active' ? 'secondary' : 'outline'}>
                      {doctor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingDoctor(doctor)}>
                          Edit
                        </DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete Dr. {doctor.name}.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(doctor.id)}>
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
      
      {/* Edit Doctor Dialog */}
      <Dialog open={!!editingDoctor} onOpenChange={(isOpen) => !isOpen && setEditingDoctor(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Doctor</DialogTitle>
              <DialogDescription>
                Make changes to the doctor's profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingDoctor && (
              <form onSubmit={handleEditDoctor}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                    <Input id="edit-name" name="name" defaultValue={editingDoctor.name} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-speciality" className="text-right">Speciality</Label>
                    <Input id="edit-speciality" name="speciality" defaultValue={editingDoctor.speciality} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-status" className="text-right">Status</Label>
                    <Select name="status" defaultValue={editingDoctor.status}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On-leave">On-leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary" onClick={() => setEditingDoctor(null)}>Cancel</Button>
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
