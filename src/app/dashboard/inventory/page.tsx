import PageHeader from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { inventory } from '@/lib/placeholder-data';
import { PlusCircle } from 'lucide-react';

export default function InventoryPage() {
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

  return (
    <>
      <PageHeader title="Inventory">
        <Button>
          <PlusCircle className="mr-2" />
          Add Item
        </Button>
      </PageHeader>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
