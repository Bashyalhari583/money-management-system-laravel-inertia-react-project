import AppLayout from '@/layouts/app-layout';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';

type RelationUser = {
  id: number;
  name: string;
  email: string;
};

type Relation = {
  id: number;
  relation_type: 'brother' | 'sister' | 'mother' | 'father' | 'spouse' | 'other';
  status: 'pending' | 'accepted' | 'rejected';
  sender?: RelationUser | null;
  receiver?: RelationUser | null;
};

type Props = {
  relations: Relation[];
};

export default function Relations({ relations }: Props) {
  const [results, setResults] = useState<RelationUser[]>([]);
  const { data, setData, post, processing, reset } = useForm<{
    relative_id: number | '';
    relation_type: Relation['relation_type'];
  }>({
    relative_id: '',
    relation_type: 'brother',
  });

  const search = async (q: string) => {
    if (!q) return setResults([]);
    const res = await fetch(route('relations.search', { q }));
    const json = (await res.json()) as RelationUser[];
    setResults(json);
  };

  const send = (id: number) => {
    setData('relative_id', id);
    post(route('relations.store'), {
      onSuccess: () => {
        reset();
        setResults([]);
      },
    });
  };

  const respond = (id: number, status: 'accepted' | 'rejected') => {
    router.post(route('relations.respond', id), { status });
  };

  return (
    <AppLayout>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-3">Add Relation</h3>

          <input
            placeholder="Search user by name..."
            className="border rounded px-3 py-2 w-full"
            onChange={(e) => search(e.target.value)}
          />

          <div className="mt-3 space-y-2">
            {results.map((u) => (
              <div key={u.id} className="flex items-center justify-between border rounded p-2">
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-gray-500">{u.email}</div>
                </div>

                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={data.relation_type}
                  onChange={(e) =>
                    setData('relation_type', e.target.value as Relation['relation_type'])
                  }
                >
                  <option>brother</option>
                  <option>sister</option>
                  <option>mother</option>
                  <option>father</option>
                  <option>spouse</option>
                  <option>other</option>
                </select>

                <button
                  disabled={processing}
                  onClick={() => send(u.id)}
                  className="px-3 py-1.5 text-sm bg-black text-white rounded"
                >
                  Send
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-3">Your Relations</h3>
          <div className="space-y-2">
            {relations.map((r) => (
              <div key={r.id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {r.sender?.name} ➝ {r.receiver?.name} ({r.relation_type})
                  </div>
                  <div className="text-xs text-gray-500">Status: {r.status}</div>
                </div>

                {r.status === 'pending' && (
                  <div className="space-x-2">
                    <button
                      onClick={() => respond(r.id, 'accepted')}
                      className="px-3 py-1.5 text-sm bg-green-600 text-white rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => respond(r.id, 'rejected')}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
