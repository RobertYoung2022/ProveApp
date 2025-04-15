# ProveApp

A modern full-stack application demonstrating proof of concept features with React and Python.

## 🚀 Features

- User Authentication & Authorization
- Task Management System
- Real-time Updates
- Responsive Design
- RESTful API Integration

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Modern CSS with responsive design
- Component-based architecture

### Backend
- Python
- RESTful API endpoints
- SQL Database
- Secure authentication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

## 🔧 Installation

### Clone the Repository
```bash
git clone https://github.com/RobertYoung2022/ProveApp.git
cd ProveApp
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 🌐 Environment Variables

Create a `.env` file in both frontend and backend directories:

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
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
│   │   ├── assets/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── app.py
│   ├── schema.sql
│   └── requirements.txt
└── README.md
```

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email [your-email@example.com] or open an issue in the repository.

## 🌟 Acknowledgments

- Thanks to all contributors
- Inspired by modern web development practices
- Built with ❤️ using React and Python 