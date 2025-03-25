import { Server } from "socket.io";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

let io;

export function initSocket(server) {
  if (!io) {
    io = new Server(server, { cors: { origin: "https://turbo-space-lamp-9vqr4qw7x57hp4q-3000.app.github.dev/" } });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("requestLeaderboard", async () => {
        const leaderboard = await getLeaderboard();
        socket.emit("updateLeaderboard", leaderboard);
      });

      socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
    });
  }
  return io;
}

async function getLeaderboard() {
  await connectDB();
  return await User.find().sort({ coins: -1 }).limit(10).select("username coins");
}

// export function broadcastLeaderboardUpdate() {
//   if (io) {
//     getLeaderboard().then((leaderboard) => {
//       io.emit("updateLeaderboard", leaderboard);
//     });
//   }
// }
