// app/admin/AdminTable.js

'use client'; 

import { useState } from 'react';
// Import the public client for client-side interactions (like status update)
import { supabase } from '@/utils/supabase'; 

// --- Status Badge Component (Remains the same) ---
const StatusBadge = ({ status }) => {
  let color = 'bg-gray-200 text-gray-800';
  if (status === 'Pending') color = 'bg-yellow-100 text-yellow-800';
  if (status === 'Reviewed') color = 'bg-blue-100 text-blue-800';
  if (status === 'Hired') color = 'bg-green-100 text-green-800';

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      {status}
    </span>
  );
};

// --- Main Client Component ---
export default function AdminTable({ initialRequests }) {
  // Use a deep copy of initialRequests to allow local modification
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState('All');
  const [loadingId, setLoadingId] = useState(null); 

  const handleStatusUpdate = async (id, newStatus) => {
    // Prevent action if a different request is already loading
    if (loadingId) return; 

    setLoadingId(id);
    
    // ------------------------------------------------------------------
    // SUPABASE INTEGRATION: UPDATE STATUS
    // ------------------------------------------------------------------
    const { error } = await supabase
      .from('sponsorship_requests')
      .update({ status: newStatus })
      .eq('id', id);

    setLoadingId(null);
    
    if (error) {
        console.error("Error updating status:", error);
        alert(`Failed to update status for ID ${id}. RLS Error: ${error.message}`);
        // Revert status change in UI if update fails
        return; 
    }

    // Update local state (UI) on successful database update
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };
  
  const filteredRequests = requests.filter(req => 
    filter === 'All' ? true : req.status === filter
  );

  return (
    <>
      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
      </div>

      {/* Requests Table View */}
      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'Name', 'Company', 'Position', 'Date', 'Status', 'Actions'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => {
                const isLoading = loadingId === request.id;
                return (
                  <tr key={request.id} className="hover:bg-indigo-50/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.interest_level}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {/* Status Update Dropdown */}
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                        disabled={isLoading}
                        className={`text-xs border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 p-1 ${isLoading ? 'bg-gray-200 opacity-75' : 'bg-white'}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                  No requests matching the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}