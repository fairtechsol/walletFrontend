import { createBrowserRouter } from "react-router-dom";
// routes
import config from "../config";
import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import ReportRoutes from "./reportRoutes";

export default function routes() {
  return createBrowserRouter([AuthRoutes, MainRoutes, ReportRoutes], {
    basename: config.BASE_NAME,
  });
}
