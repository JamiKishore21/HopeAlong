# HopeAlong - Ride Sharing & Goods Delivery Platform

A comprehensive platform that connects people for ride sharing and goods delivery services, built with modern web technologies.

## 🚀 Features

### Ride Sharing

- Create and join rides
- Real-time ride tracking
- Driver and passenger profiles
- Route optimization

### Goods Delivery

- Post delivery requests
- Connect with delivery partners
- Package tracking
- Secure payment processing

### Core Features

- User authentication and authorization
- Real-time chat between users
- Push notifications
- Payment integration
- Live GPS tracking
- User ratings and reviews

## 🏗️ Architecture

This project follows a monorepo structure with separate frontend and backend applications:

```
HopeAlongL21/
├── hopealong-frontend/    # React frontend application
└── server/               # Node.js backend application
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js
- **Real-time**: Socket.io
- **File Upload**: Multer

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KhadirShaikL21/HopeAlongL21.git
   cd HopeAlongL21
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   # Create .env file with your configuration
   npm start
   ```

3. **Setup Frontend**

   ```bash
   cd ../hopealong-frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

### Frontend (`/hopealong-frontend`)

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ...
├── pages/              # Application pages
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Rides.jsx
│   └── ...
├── context/            # React context providers
└── assets/             # Static assets
```

### Backend (`/server`)

```
├── controllers/        # Route controllers
├── models/            # MongoDB schemas
├── routes/            # API routes
├── middleware/        # Custom middleware
├── config/            # Configuration files
└── utils/             # Utility functions
```

## 🔧 Environment Variables

Create `.env` files in both frontend and backend directories:

### Backend `.env`

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🔄 Contributing to Main Repository

This is a fork of the main HopeAlong repository. To contribute changes back:

1. **Make your changes** in a feature branch
2. **Push to your fork**: `git push origin feature-branch`
3. **Create Pull Request** to `JamiKishore21/HopeAlong`
4. **Sync with upstream** regularly: `git pull upstream main`

### Sync with Main Repository

```bash
# Fetch latest changes from main repo
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updated main to your fork
git push origin main
```

## 📞 Support

If you have any questions or need help, please open an issue or contact the maintainers.

---

Made with ❤️ by the HopeAlong Team
