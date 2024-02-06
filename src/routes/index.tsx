import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import WalletRoutes from "./walletRoutes";
import config from "../config";

export default function routes() {
  return createBrowserRouter(
    [AuthRoutes, MainRoutes, WalletRoutes],
    {
      basename: config.BASE_NAME,
    }
  );
}
