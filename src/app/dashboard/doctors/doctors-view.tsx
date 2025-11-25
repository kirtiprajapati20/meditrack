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
import { MoreHorizontal, PlusCircle, List, LayoutGrid, X, ChevronDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

type ViewMode = 'grid' | 'list';

export function DoctorsView() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const handleDelete = (id: string) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
    setSelectedDoctors(selectedDoctors.filter(doctorId => doctorId !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDoctors(doctors.map(doctor => doctor.id));
    } else {
      setSelectedDoctors([]);
    }
  };

  const handleSelectDoctor = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedDoctors([...selectedDoctors, id]);
    } else {
      setSelectedDoctors(selectedDoctors.filter(doctorId => doctorId !== id));
    }
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
      email: `${(formData.get('name') as string).toLowerCase().replace(' ', '.')}@meditrack.com`,
      phone: 'N/A',
      address: 'N/A'
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
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center gap-2">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
            </Button>
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
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="flex flex-col relative">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="flex justify-start items-start mb-4">
                  <Badge variant={doctor.status === 'Active' ? 'secondary' : 'outline'}>
                    {doctor.status}
                  </Badge>
                </div>
                <Link href={`/dashboard/doctors/${doctor.id}`} className="flex-grow flex flex-col">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.speciality}</p>
                  </div>
                </Link>
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedDoctors.length === doctors.length && doctors.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Speciality</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedDoctors.includes(doctor.id)}
                          onCheckedChange={(checked) => handleSelectDoctor(doctor.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Link href={`/dashboard/doctors/${doctor.id}`} className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={doctor.avatarUrl} alt="Avatar" />
                              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{doctor.name}</div>
                          </Link>
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
        )}
      
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
