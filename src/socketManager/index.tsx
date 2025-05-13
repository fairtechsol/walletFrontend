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
};

export const initialiseMatchSocket = (matchId: string[], roleName: string) => {
  thirdParty = io(baseUrls.thirdParty, {
    transports: [
      process.env.NODE_ENV === "production"
        ? `${Constants.POLLING}`
        : `${Constants.WEBSOCKET}`,
    ],
    auth: {
      token: `${sessionStorage.getItem("jwtWallet")}`,
    },
    query: {
      matchIdArray: matchId,
      roleName: roleName,
    },
  });
};

export const socketService = {
  connect: () => {
    initialiseSocket();
    socket?.connect();
  },

  disconnect: () => {
    socket?.disconnect();
  },
  auth: { ...authSocketService },
  match: { ...matchSocketService },
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
