import { createBrowserRouter } from "react-router-dom";
import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import WalletRoutes from "./walletRoutes";

export default function routes() {
  return createBrowserRouter([AuthRoutes, MainRoutes, WalletRoutes], {
    basename: config.BASE_NAME,
  });
}
