# ResuMatch
![Image](https://github.com/user-attachments/assets/57c4798b-9790-407c-adda-5c0bf049c280)

ResuMatch is an intelligent resume analysis and optimization tool designed to bridge the gap between job descriptions and candidate profiles. It features automated keyword extraction, real-time match scoring, a version-controlled resume editor, and personalized interview question generation. Built with React and Supabase, it helps job seekers tailor their applications and prepare effectively for technical interviews.

## Features

- **Smart Analysis**: Matches your resume against job descriptions to identify gaps.
- **Resume Editor**: Built-in Markdown editor with version control.
- **Interview Prep**: Generates personalized interview questions based on your profile.
- **Dashboard**: Track multiple job applications in one place.
- **Secure Auth**: Supports Email, Google, GitHub, and Notion login.

## How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Copy the example environment file and add your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
   *Note: You will need a valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.*

3. **Configure Authentication (Optional)**
   To enable social login, configure the providers in your Supabase Dashboard:
   - **Google**: Add Client ID & Secret from Google Cloud Console.
   - **GitHub**: Add Client ID & Secret from GitHub Developer Settings.
4. **Start Development Server**
   ```bash
   npm run dev
   ```
