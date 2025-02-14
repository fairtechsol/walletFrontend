import io from "socket.io-client";
import { Constants, baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchDetailService";

export let socket: any = null;
export let thirdParty: any = null;

export const initialiseSocket = () => {
  socket = io(baseUrls.socket, {
    transports: [`${Constants.WEBSOCKET}`, `${Constants.POLLING}`],
    auth: {
      token: `${sessionStorage.getItem("jwtWallet")}`,
    },
  });
  // thirdParty = io(baseUrls.thirdParty, {
  //   transports: [
  //     // process.env.NODE_ENV === "production"
  //     //   ? `${Constants.POLLING}`
  //     //   :
  //     `${Constants.WEBSOCKET}`,
  //     `${Constants.POLLING}`,
  //   ],
  //   auth: {
  //     token: `${sessionStorage.getItem("jwtWallet")}`,
  //   },
  // });
};

// export const socket = io(baseUrls.socket, {
//   transports: ["websocket"],
//   auth: {
//     token: `${sessionStorage.getItem("jwtWallet")}`,
//   },
// });

export const initialiseMatchSocket = (matchId: string[], roleName: string) => {
  thirdParty = io(baseUrls.thirdParty, {
    transports: [
      // process.env.NODE_ENV === "production"
      //   ? `${Constants.POLLING}`
      //   :
      `${Constants.WEBSOCKET}`,
      `${Constants.POLLING}`,
    ],
    auth: {
      token: `${sessionStorage.getItem("jwtWallet")}`,
    },
    query: {
      matchIdArray: matchId,
      roleName: roleName
    },
  });
};

export const socketService = {
  connect: () => {
    initialiseSocket();
    // Connect to the socket server
    socket?.connect();
    // thirdParty?.connect();
    // expertSocket.connect();
  },

  disconnect: () => {
    // Disconnect from the socket server
    socket?.disconnect();
    // thirdParty?.disconnect();
    // expertSocket.disconnect();
  },
  auth: { ...authSocketService },
  match: { ...matchSocketService },

  // Add other socket-related methods as needed
};

export const matchService = {
  connect: (matchId: string[], roleName: string) => {
    initialiseMatchSocket(matchId, roleName);
    thirdParty?.connect();
  },
  disconnect: () => {
    thirdParty?.disconnect();
  },
};
