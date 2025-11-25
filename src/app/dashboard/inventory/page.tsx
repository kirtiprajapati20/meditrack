'use client';

import { useState } from 'react';
import PageHeader from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { inventory as initialInventory, InventoryItem } from '@/lib/placeholder-data';
import { PlusCircle, X, Check, ChevronDown } from 'lucide-react';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const getBadgeVariant = (status: 'In Stock' | 'Low Stock' | 'Out of Stock'): 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'In Stock':
        return 'secondary';
      case 'Low Stock':
        return 'outline';
      case 'Out of Stock':
        return 'destructive';
    }
  };

  const calculateStatus = (quantity: number, reorderLevel: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  const handleAddItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const quantity = parseInt(formData.get('quantity') as string);
    const reorderLevel = parseInt(formData.get('reorderLevel') as string);
    
    const newItem: InventoryItem = {
      id: `INV${Date.now().toString().slice(-3)}`,
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      quantity: quantity,
      reorderLevel: reorderLevel,
      status: calculateStatus(quantity, reorderLevel),
    };
    setInventory([...inventory, newItem]);
    setAddDialogOpen(false);
    // Reset form
    event.currentTarget.reset();
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(inventory.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const handleDelete = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Inventory
          </h1>
       
        </div>
        <div className="flex items-center gap-3">
        
          <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new item to the inventory.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddItem}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Item Name</Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sku" className="text-right">SKU</Label>
                  <Input id="sku" name="sku" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input 
                    id="quantity" 
                    name="quantity" 
                    type="number" 
                    min="0"
                    className="col-span-3" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reorderLevel" className="text-right">Reorder Level</Label>
                  <Input 
                    id="reorderLevel" 
                    name="reorderLevel" 
                    type="number" 
                    min="0"
                    className="col-span-3" 
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Item</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === inventory.length && inventory.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead className="hidden sm:table-cell">SKU</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Reorder Level</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id} className={item.status === 'Low Stock' || item.status === 'Out of Stock' ? 'bg-destructive/10' : ''}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{item.sku}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="hidden sm:table-cell text-right">{item.reorderLevel}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
