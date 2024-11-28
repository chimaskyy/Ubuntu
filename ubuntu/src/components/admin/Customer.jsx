import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomersContent() {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 5 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 3 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", orders: 7 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.orders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
