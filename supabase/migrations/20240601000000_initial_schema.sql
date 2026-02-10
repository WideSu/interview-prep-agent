
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    jd_link TEXT,
    jd_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume Versions table
CREATE TABLE IF NOT EXISTS resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analysis History table
CREATE TABLE IF NOT EXISTS analysis_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
    resume_version_id UUID REFERENCES resume_versions(id) ON DELETE CASCADE,
    match_results JSONB NOT NULL,
    optimization_suggestions JSONB NOT NULL,
    interview_questions JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resume_versions_application_id ON resume_versions(application_id);
CREATE INDEX IF NOT EXISTS idx_resume_versions_created_at ON resume_versions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_history_application_id ON analysis_history(application_id);
CREATE INDEX IF NOT EXISTS idx_analysis_history_created_at ON analysis_history(created_at DESC);

-- RLS Policies (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

-- Grant permissions to ANON role for Development/Demo purposes
-- In production, you would only grant to authenticated users
GRANT ALL ON users TO anon;
GRANT ALL ON job_applications TO anon;
GRANT ALL ON resume_versions TO anon;
GRANT ALL ON analysis_history TO anon;
GRANT ALL ON users TO authenticated;
GRANT ALL ON job_applications TO authenticated;
GRANT ALL ON resume_versions TO authenticated;
GRANT ALL ON analysis_history TO authenticated;

-- Allow anon users to select/insert/update/delete for demo (since we don't have login UI yet)
CREATE POLICY "Enable access for all users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable access for all users" ON job_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable access for all users" ON resume_versions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable access for all users" ON analysis_history FOR ALL USING (true) WITH CHECK (true);
