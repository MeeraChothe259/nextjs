import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Sponsorship & Hiring Portal
          </h1>
          <p className="text-gray-600">
            Choose what you want to do: apply for a role, send a sponsorship inquiry, or manage incoming requests.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <Link
            href="/apply"
            className="block rounded-xl border border-indigo-100 bg-indigo-50/60 p-5 shadow-sm hover:shadow-md hover:bg-indigo-50 transition"
          >
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">Apply for a Role</h2>
            <p className="text-sm text-indigo-900/80">
              Fill out the job application form and submit your details and resume.
            </p>
          </Link>

          <Link
            href="/sponsorship"
            className="block rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-sm hover:shadow-md hover:bg-emerald-50 transition"
          >
            <h2 className="text-lg font-semibold text-emerald-800 mb-2">Sponsorship Inquiry</h2>
            <p className="text-sm text-emerald-900/80">
              Share your company details and preferred sponsorship level.
            </p>
          </Link>

          <Link
            href="/admin"
            className="block rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm hover:shadow-md hover:bg-gray-100 transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Admin Dashboard</h2>
            <p className="text-sm text-gray-700">
              View and manage incoming sponsorship requests. (Restricted access)
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}