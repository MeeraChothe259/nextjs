// app/sponsorship/page.js

'use client'; // Required for client-side hooks and interaction

import { useState } from 'react';

export default function SponsorshipPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    interest_level: 'Bronze',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    // Clear status on input change
    setSubmissionStatus(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side Validation Check
    if (!formData.name || !formData.email || !formData.company) {
      setSubmissionStatus('error');
      setLoading(false);
      return;
    }
    
    // ------------------------------------------------------------------
    // SECURE SUBMISSION: Sending data to the local Next.js API route
    // ------------------------------------------------------------------
    try {
        const response = await fetch('/api/submit-sponsorship', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // API returned status 201 (Created)
            setSubmissionStatus('success');
            // Clear form after successful submission
            setFormData({ name: '', email: '', company: '', website: '', interest_level: 'Bronze', message: '' }); 
        } else {
            // API returned status 400 or 500
            const errorData = await response.json();
            console.error('API Error:', errorData.message);
            setSubmissionStatus('error_db');
        }
    } catch (error) {
        // Network or fetch failure
        console.error('Fetch Error:', error);
        setSubmissionStatus('error_db');
    } finally {
        setLoading(false);
    }
  };

  const statusClass = submissionStatus === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
  
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Sponsorship Inquiry
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Tell us about your organization and preferred partnership level.
        </p>

        {/* Status Messages */}
        {submissionStatus && (
          <div className={`p-4 mb-6 rounded-lg border ${statusClass}`}>
            {submissionStatus === 'success' && 
              '🎉 Thank you! Your sponsorship inquiry has been successfully sent. We will review it shortly.'}
            {submissionStatus === 'error' && 
              '⚠️ Please fill out all required fields (Name, Email, Company).'}
            {submissionStatus === 'error_db' && 
              '❌ A server error occurred during submission. Please try again later.'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name *
              </label>
              <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Contact Email *
              </label>
              <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input type="text" name="company" id="company" required value={formData.company} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            {/* Website Field */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Company Website
              </label>
              <input type="url" name="website" id="website" value={formData.website} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Interest Level */}
          <div>
            <label htmlFor="interest_level" className="block text-sm font-medium text-gray-700">
              Preferred Sponsorship Level
            </label>
            <select name="interest_level" id="interest_level" value={formData.interest_level} onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Bronze">Bronze (Basic)</option>
              <option value="Silver">Silver (Standard)</option>
              <option value="Gold">Gold (Premium)</option>
              <option value="Custom">Custom Partnership</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Details / Custom Request
            </label>
            <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Submitting...' : 'Send Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}