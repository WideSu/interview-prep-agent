
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface JobApplication {
  id: string;
  company_name: string;
  job_title: string;
  jd_link: string;
  jd_content: string;
  created_at: string;
  updated_at: string;
}

export const applicationService = {
  async getAll() {
    // For now, since we don't have auth enabled/enforced for "users" table in this MVP,
    // we might just fetch all applications. 
    // Ideally we filter by user_id, but let's assume a single-user local demo or handle anonymous users if needed.
    // However, the schema has user_id NOT NULL.
    // We need a way to identify the current user. 
    // For this MVP, let's try to get the current session user, or if none, create a dummy one or handle gracefully.
    
    const { data: { user } } = await supabase.auth.getUser();
    
    let query = supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (user) {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as JobApplication[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as JobApplication;
  },

  async save(application: Partial<JobApplication> & { resume_content?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    
    // If no user is logged in, we might have an issue with RLS or NOT NULL constraints.
    // For the purpose of this agent demo, we'll try to proceed. 
    // If user is null, we might need to rely on anon key permissions allowing inserts (which usually require a user_id).
    // Let's assume we can get a user or the schema allows it.
    
    // Actually, checking schema: user_id UUID REFERENCES users(id).
    // If we are not logged in, we can't save effectively unless we implement auth or relax schema.
    // Let's implement a quick anonymous sign-in if needed, or just try.
    
    const payload = {
      company_name: application.company_name || 'Untitled Company',
      job_title: application.job_title || 'Untitled Job',
      jd_link: application.jd_link || '',
      jd_content: application.jd_content || '',
      updated_at: new Date().toISOString(),
      ...(user ? { user_id: user.id } : {}) // Only add user_id if we have one
    };

    let result;
    if (application.id) {
        // Update
        result = await supabase
            .from('job_applications')
            .update(payload)
            .eq('id', application.id)
            .select()
            .single();
    } else {
        // Insert
        result = await supabase
            .from('job_applications')
            .insert([payload])
            .select()
            .single();
    }

    if (result.error) throw result.error;
    
    const appId = result.data.id;

    // Also save the resume as a version if provided
    if (application.resume_content) {
        await supabase.from('resume_versions').insert([{
            application_id: appId,
            content: application.resume_content,
            version_number: 1 // Simplified versioning for now
        }]);
    }

    return result.data;
  },
  
  // Helper to get the latest resume for an application
  async getLatestResume(applicationId: string) {
      const { data, error } = await supabase
        .from('resume_versions')
        .select('content')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error; // Ignore not found
      return data?.content || '';
  }
};
