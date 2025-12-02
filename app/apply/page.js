

'use client'; 
import { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: 'developer', 
    resume: null, 
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));

    
    setSubmissionStatus(null); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!formData.fullName || !formData.email || !formData.position) {
      setSubmissionStatus('error');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setSubmissionStatus('invalid_email');
        return;
    }
    
    
    console.log("Submitting form data:", formData);
    
    
    setSubmissionStatus('success');
    
    
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Job Application Form
        </h1>

        {/* Status Messages */}
        {submissionStatus === 'success' && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200">
            ✅ Application submitted successfully! We will be in touch shortly.
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
            ⚠️ Please fill out all required fields.
          </div>
        )}
        {submissionStatus === 'invalid_email' && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
            ❌ Please enter a valid email address.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required 
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required 
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Position Select Field */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position Applying For *
            </label>
            <select
              id="position"
              name="position"
              required
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="developer">Frontend Developer</option>
              <option value="designer">UX/UI Designer</option>
              <option value="manager">Project Manager</option>
            </select>
          </div>
          
          {/* Resume Upload Field */}
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume (PDF/DOCX)
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}