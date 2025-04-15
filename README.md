# ProveApp

A modern full-stack task management application built with React and Python.

## 🚀 Features

- User Authentication & Authorization
- Task Management System
- Docker Containerization
- RESTful API Integration
- Modern React with TypeScript
- Flask Backend with SQLite

## 🛠️ Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Mantine UI Components
- Modern CSS with responsive design

### Backend
- Python 3.12
- Flask with SQLAlchemy
- SQLite Database
- JWT Authentication

## 📋 Prerequisites

- Docker and Docker Compose
- Git

## 🔧 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/RobertYoung2022/ProveApp.git
cd ProveApp
```

2. Start the application:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5174
- Backend API: http://localhost:5001

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 💻 Development

### Without Docker

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 🌐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
```

### Backend (.env)
```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key
```

## 🏗️ Project Structure

```
ProveApp/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml
└── README.md
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with modern web development practices
- Containerized for easy deployment
- Optimized for developer experience 