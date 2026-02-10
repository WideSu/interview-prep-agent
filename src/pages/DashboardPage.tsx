
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService, JobApplication } from '@/services/applicationService';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { Plus, Search, FileText, ExternalLink, Edit2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { setApplication, setInput } = useAnalysisStore();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUserAndLoad();
  }, []);

  const checkUserAndLoad = async () => {
      // Simple check to ensure we can read data. 
      // In a real app we'd handle auth state more robustly.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
          // Attempt anonymous sign in or just warn
          // For now, let's just try to load and see if RLS blocks us
      }
      loadApplications();
  };

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAll();
      setApplications(data || []);
    } catch (err: any) {
      console.error('Failed to load applications:', err);
      // Don't show error to UI immediately if it's just empty or auth issue, 
      // but for debugging let's keep it in console.
      if (err.message) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    // Clear store
    setApplication({
      id: null,
      companyName: '',
      jobTitle: '',
      jdLink: '',
      jdContent: '',
    });
    setInput({ resumeContent: '' });
    navigate('/input');
  };

  const handleEdit = async (app: JobApplication) => {
    try {
        setLoading(true);
        // Load resume content
        const resumeContent = await applicationService.getLatestResume(app.id);
        
        // Update store
        setApplication({
            id: app.id,
            companyName: app.company_name,
            jobTitle: app.job_title,
            jdLink: app.jd_link,
            jdContent: app.jd_content,
        });
        setInput({ resumeContent });
        
        navigate('/input');
    } catch (err) {
        console.error('Error loading application:', err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your applications and resume versions</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Application
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new job application.</p>
          <div className="mt-6">
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              New Application
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {applications.map((app) => (
              <li key={app.id} className="hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col truncate">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">{app.company_name}</p>
                        <span className="mx-2 text-gray-400">•</span>
                        <p className="text-sm text-gray-900">{app.job_title}</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        {app.jd_link && (
                            <a href={app.jd_link} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-500 mr-4" onClick={(e) => e.stopPropagation()}>
                                <ExternalLink className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                JD Link
                            </a>
                        )}
                        <p className="flex items-center">
                           Created: {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleEdit(app)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Edit2 className="-ml-0.5 mr-2 h-4 w-4 text-gray-500" />
                        View / Edit
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
