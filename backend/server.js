const io = new Server(server, {
  cors: {
    origin: ["https://avichatapp.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});