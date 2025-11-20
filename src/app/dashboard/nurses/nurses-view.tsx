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
import { nurses as initialNurses, Nurse } from '@/lib/placeholder-data';
import { MoreHorizontal, PlusCircle, List, LayoutGrid } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type ViewMode = 'grid' | 'list';

export function NursesView() {
  const [nurses, setNurses] = useState<Nurse[]>(initialNurses);
  const [editingNurse, setEditingNurse] = useState<Nurse | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleDelete = (id: string) => {
    setNurses(nurses.filter((nurse) => nurse.id !== id));
  };

  const handleAddNurse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newNurse: Nurse = {
      id: `NRS${Date.now().toString().slice(-3)}`,
      name: formData.get('name') as string,
      department: formData.get('department') as string,
      status: formData.get('status') as 'Active' | 'On-leave',
      avatarUrl: `https://picsum.photos/seed/${Math.random()}/200/200`,
    };
    setNurses([...nurses, newNurse]);
    setAddDialogOpen(false);
  };
  
  const handleEditNurse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingNurse) return;
  
    const formData = new FormData(event.currentTarget);
    const updatedNurse = {
      ...editingNurse,
      name: formData.get('name') as string,
      department: formData.get('department') as string,
      status: formData.get('status') as 'Active' | 'On-leave',
    };
  
    setNurses(
      nurses.map((nurse) => (nurse.id === updatedNurse.id ? updatedNurse : nurse))
    );
    setEditingNurse(null);
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
                    Add Nurse
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Nurse</DialogTitle>
                    <DialogDescription>
                    Fill out the form below to add a new nurse to the system.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddNurse}>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">Department</Label>
                        <Input id="department" name="department" className="col-span-3" required />
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
                    <Button type="submit">Add Nurse</Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurses.map((nurse) => (
            <Card key={nurse.id} className="flex flex-col">
              <CardContent className="p-6 text-center flex flex-col flex-grow">
                 <div className="flex justify-between items-start">
                    <Badge variant={nurse.status === 'Active' ? 'secondary' : 'outline'}>
                        {nurse.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingNurse(nurse)}>
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
                                    This action cannot be undone. This will permanently delete nurse {nurse.name}.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(nurse.id)}>
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Avatar className="w-20 h-20 mx-auto mb-4 mt-2">
                  <AvatarImage src={nurse.avatarUrl} alt={nurse.name} />
                  <AvatarFallback>{nurse.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{nurse.name}</h3>
                    <p className="text-sm text-muted-foreground">{nurse.department}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Department</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {nurses.map((nurse) => (
                    <TableRow key={nurse.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={nurse.avatarUrl} alt="Avatar" />
                            <AvatarFallback>{nurse.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{nurse.name}</div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{nurse.department}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant={nurse.status === 'Active' ? 'secondary' : 'outline'}>
                        {nurse.status}
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
                            <DropdownMenuItem onClick={() => setEditingNurse(nurse)}>
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
                                        This action cannot be undone. This will permanently delete nurse {nurse.name}.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(nurse.id)}>
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
      
      {/* Edit Nurse Dialog */}
      <Dialog open={!!editingNurse} onOpenChange={(isOpen) => !isOpen && setEditingNurse(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Nurse</DialogTitle>
              <DialogDescription>
                Make changes to the nurse's profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {editingNurse && (
              <form onSubmit={handleEditNurse}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                    <Input id="edit-name" name="name" defaultValue={editingNurse.name} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-department" className="text-right">Department</Label>
                    <Input id="edit-department" name="department" defaultValue={editingNurse.department} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-status" className="text-right">Status</Label>
                    <Select name="status" defaultValue={editingNurse.status}>
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
                    <Button type="button" variant="secondary" onClick={() => setEditingNurse(null)}>Cancel</Button>
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
