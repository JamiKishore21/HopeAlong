const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');

const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes.js');
const authgoogle = require('./routes/auth.js');
const protectedRoutes = require('./routes/protectedRoutes');
const rideRoutes = require('./routes/rideRoutes');
const goodsRoutes = require('./routes/goodsRoutes');
const goodsRequestRoutes = require('./routes/goodsRequestRoutes');
const rideRequestRoutes = require('./routes/rideRequestRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const ChatMessage = require('./models/ChatMessage');
const PaymentRoutes = require('./routes/PaymentRoutes');
require('./config/passport');
dotenv.config();

const app = express();
const server = http.createServer(app);

// --- Socket.io setup ---
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL, 'https://your-frontend-url.vercel.app'] 
      : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// --- User-to-socket mapping for notifications ---
const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('🟢 New socket connected:', socket.id);

  // Register user to socket
  socket.on('register', (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`👤 User ${userId} registered to socket ${socket.id}`);
  });

  // Join chat room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Leave chat room
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  // Handle sending a chat message
  socket.on('sendMessage', async (data) => {
    console.log("Received sendMessage event:", data);
    console.log("Type of senderId:", typeof data.senderId, "Value:", data.senderId);
    try {
      if (!data.roomId || !data.tripModel || !data.senderId || !data.text) {
        console.error("❌ Missing chat message fields", data);
        return;
      }
      // Save message to DB
      const chatMsg = await ChatMessage.create({
        tripId: data.roomId, // roomId should be the request ID
        tripModel: data.tripModel, // 'Ride' or 'GoodsDelivery'
        sender: data.senderId,
        message: data.text,
        createdAt: new Date(),
      });
      // Emit the saved message (with _id) to all in the room
      io.to(data.roomId).emit('message', {
        ...data,
        _id: chatMsg._id,
        createdAt: chatMsg.createdAt,
      });
    } catch (err) {
      console.error("❌ Error saving chat message:", err.message);
    }
  });

  // Handle location updates
  socket.on("locationUpdate", (coords) => {
    // Broadcast to all clients except sender, or to a specific room
    socket.broadcast.emit("locationUpdate", coords);
    // Or: io.to(roomId).emit("locationUpdate", coords);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});

// Make Socket.io and userSocketMap accessible in controllers
app.set('io', io);
app.set('userSocketMap', userSocketMap);

// --- Middleware ---
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-frontend-url.vercel.app'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());

// --- Database connection ---
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment variables.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --- Routes ---
app.get('/', (req, res) => {
  res.send("🚀 HopeAlong API is running");
});

app.use('/api/auth', authRoutes);
app.use('/api/auth', authgoogle);
app.use('/api/protected', protectedRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/goods', goodsRoutes);
app.use('/api/goods-requests', goodsRequestRoutes);
app.use('/api/riderequests', rideRequestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/payments", PaymentRoutes);

// --- Start server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));