import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
type Totals = {
  total_income: number;
  total_expense: number;
  net: number;
};

type Props = {
  totals: Totals;
};
export default function Dashboard({ totals }: Props) {
    return (
        <AppLayout>
            <Head title="Dashboard" />
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Total Income" value={totals?.total_income ?? 0} />
        <Card title="Total Expenses" value={totals?.total_expense ?? 0} />
        <Card title="Net (Profit/Loss)" value={totals?.net ?? 0} />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-2">Overview</h3>
        <p className="text-gray-600 text-sm">
          Add charts here (e.g., Bar: Monthly Income vs Expenses, Pie: Expenses by Category).
        </p>
      </div>
    </AppLayout>
  )
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">Rs. {Number(value ?? 0).toFixed(2)}</div>
    </div>
  );
}