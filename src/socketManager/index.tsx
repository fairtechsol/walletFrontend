import io from "socket.io-client";
import { matchSocketService } from "./matchDetailService";

export const socket = io("http://localhost:5000");

export const socketService = {
  connect: () => {
    // Connect to the socket server
    socket.connect();
  },

  disconnect: () => {
    // Disconnect from the socket server
    socket.disconnect();
  },

  match:{...matchSocketService}

  // Add other socket-related methods as needed
};
