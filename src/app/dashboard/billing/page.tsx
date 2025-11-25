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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { invoices as initialInvoices, Invoice } from '@/lib/placeholder-data';
import { PlusCircle, X, ChevronDown } from 'lucide-react';

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Pending');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const getBadgeVariant = (status: 'Paid' | 'Pending' | 'Overdue'): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'Paid':
        return 'secondary';
      case 'Pending':
        return 'default';
      case 'Overdue':
        return 'destructive';
    }
  };

  const handleCreateInvoice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentYear = new Date().getFullYear();
    const invoiceNumber = invoices.length + 1;
    
    const newInvoice: Invoice = {
      id: `INV-${currentYear}-${invoiceNumber.toString().padStart(3, '0')}`,
      patientName: formData.get('patientName') as string,
      amount: parseFloat(formData.get('amount') as string),
      status: invoiceStatus,
      dueDate: formData.get('dueDate') as string,
    };
    setInvoices([...invoices, newInvoice]);
    setAddDialogOpen(false);
    setInvoiceStatus('Pending'); // Reset status
    // Reset form
    event.currentTarget.reset();
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(invoices.map(invoice => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectInvoice = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, id]);
    } else {
      setSelectedInvoices(selectedInvoices.filter(invoiceId => invoiceId !== id));
    }
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    setSelectedInvoices(selectedInvoices.filter(invoiceId => invoiceId !== id));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Billing & Invoicing
          </h1>
         
        </div>
        <div className="flex items-center gap-3">
       
          <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" />
                Create Invoice
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new invoice.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateInvoice}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patientName" className="text-right">Patient Name</Label>
                  <Input id="patientName" name="patientName" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">Amount</Label>
                  <Input 
                    id="amount" 
                    name="amount" 
                    type="number" 
                    step="0.01"
                    min="0"
                    className="col-span-3" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                  <Input 
                    id="dueDate" 
                    name="dueDate" 
                    type="date" 
                    className="col-span-3" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select value={invoiceStatus} onValueChange={(value) => setInvoiceStatus(value as 'Paid' | 'Pending' | 'Overdue')}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Invoice</Button>
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
                    checked={selectedInvoices.length === invoices.length && invoices.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={(checked) => handleSelectInvoice(invoice.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.patientName}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getBadgeVariant(invoice.status)} className="capitalize">
                      {invoice.status}
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
