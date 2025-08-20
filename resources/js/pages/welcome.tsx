import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'; 

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">Money Manager</div>
        <div className="space-x-4">
          <Link href={route('login')} className="text-sm">Login</Link>
          <Link href={route('register')} className="text-sm bg-black text-white px-3 py-1.5 rounded-lg">Get Started</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Track Personal & Family <span className="underline decoration-amber-400">Income/Expenses</span> in One Place
          </h1>
          <p className="mt-4 text-gray-600">
            Manage your budget, connect with family, and see monthly or yearly summaries with beautiful charts.
          </p>
          <div className="mt-6 space-x-3">
            <Link href={route('register')} className="bg-black text-white px-4 py-2 rounded-lg">Create Account</Link>
            <Link href={route('login')} className="px-4 py-2 rounded-lg border">Login</Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <ul className="space-y-3 text-sm">
            <li>✅ Secure Login & Register</li>
            <li>✅ Relation requests (accept/reject)</li>
            <li>✅ Monthly/Yearly filters</li>
            <li>✅ Totals: Income, Expense, Net</li>
          </ul>
        </div>
      </section>
    </div>
    <footer className="bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Money Manager. All rights reserved.
      </div>
    </footer>

    </>
  );
}
