import { supabaseServer } from '@/utils/supabase-server';
import AdminTable from './AdminTable';



async function getSponsorshipRequests() {
  const { data, error } = await supabaseServer
    .from('sponsorship_requests')
    .select('*');

  if (error) {
    console.error('Error fetching requests:', error);
    
    return { data: null, error: error.message }; 
  }

  return { data, error: null };
}


export default async function AdminPage() {
  const { data: requests, error } = await getSponsorshipRequests();

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 p-8 flex items-start justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl">
          <h1 className="text-2xl font-bold text-red-700">Database Connection Error</h1>
          <p className="mt-2 text-red-600">
            Could not load sponsorship requests from the database. 
            Please check your Supabase API keys and RLS policies.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Detail: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Application Dashboard</h1>
        <p className="text-gray-600">Manage incoming sponsorship requests.</p>
      </header>
      
      {/* Pass the fetched data to the client component */}
      <AdminTable initialRequests={requests || []} />
    </div>
  );
}