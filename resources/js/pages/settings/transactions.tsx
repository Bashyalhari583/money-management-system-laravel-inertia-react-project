import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import type { Pagination } from '@/types/global';

type Tx = {
  id: number;
  user_id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number | string;
  date: string; // yyyy-mm-dd
  description?: string | null;
};

type Totals = {
  total_income: number;
  total_expense: number;
  net: number;
};

type Props = {
  filters: {
    type?: 'income' | 'expense';
    from?: string;
    to?: string;
    category?: string;
  };
  transactions: Pagination<Tx>;
  totals: Totals;
};

export default function Transactions({ transactions, totals }: Props) {
  const { data, setData, post, processing, reset } = useForm<{
    type: 'income' | 'expense';
    category: string;
    amount: string;
    date: string;
    description?: string;
  }>({
    type: 'expense',
    category: '',
    amount: '',
    date: '',
    description: '',
  });

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('transactions.store'), { onSuccess: () => reset() });
  };

  return (
    <AppLayout>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="font-semibold mb-3">Add Transaction</h3>
        <form onSubmit={submit} className="grid md:grid-cols-5 gap-3">
          <select
            value={data.type}
            onChange={(e) => setData('type', e.target.value as 'income' | 'expense')}
            className="border rounded px-3 py-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            placeholder="Category"
            value={data.category}
            onChange={(e) => setData('category', e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={data.amount}
            onChange={(e) => setData('amount', e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            value={data.date}
            onChange={(e) => setData('date', e.target.value)}
            className="border rounded px-3 py-2"
          />

          <button disabled={processing} className="bg-black text-white rounded px-4">
            Save
          </button>

          <textarea
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="md:col-span-5 border rounded px-3 py-2"
          />
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Stat title="Total Income" value={totals.total_income} />
        <Stat title="Total Expense" value={totals.total_expense} />
        <Stat title="Net" value={totals.net} />
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Category</th>
              <th className="text-right p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.data.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-3">{tx.date}</td>
                <td className="p-3 capitalize">{tx.type}</td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3 text-right">Rs. {Number(tx.amount ?? 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-3 text-xs text-gray-500">
          Page {transactions.current_page} / {transactions.last_page}
        </div>
      </div>
    </AppLayout>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-xl font-semibold mt-1">Rs. {Number(value ?? 0).toFixed(2)}</div>
    </div>
  );
}
