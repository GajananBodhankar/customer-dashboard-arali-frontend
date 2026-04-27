import type { iCurrentUser } from "../services/propTypes";

interface CustomerListProps {
  customers: iCurrentUser[];
}

export default function CustomerList({ customers }: CustomerListProps) {
  if (customers.length === 0) {
    return <p className="bg-white p-4 rounded-xl shadow text-gray-500">No customers found.</p>;
  }

  return (
    <div className="grid gap-4">
      {customers.map((customer) => (
        <div key={customer.id} className="bg-white p-4 rounded-xl shadow">
          <p className="font-semibold">{customer.name}</p>
          <p className="text-gray-600">{customer.email}</p>
          <p className="text-gray-500">{customer.phone}</p>
        </div>
      ))}
    </div>
  );
}
