# Task Management App

A comprehensive task management application that helps users break down complex tasks, track progress, and stay motivated through gamification.

## Features
- Task breakdown and management
- Gamification with points and rewards
- Smart scheduling with calendar integration
- Progress tracking dashboard
- AI-powered task assistance
- Real-time updates using Supabase

## Setup Instructions

### Backend Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Unix/macOS
   # or
   .\venv\Scripts\activate  # On Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   OPENAI_API_KEY=your_openai_key
   ```

### Frontend Setup
1. Install Node.js dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Development
- Backend: Flask (Python)
- Frontend: React
- Database: Supabase
- AI Integration: OpenAI GPT
- Authentication: Supabase Auth

## Project Structure
```
/
├── backend/           # Flask backend
├── frontend/         # React frontend
├── requirements.txt  # Python dependencies
└── README.md        # Project documentation
``` 