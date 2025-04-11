import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import ErrorBoundary from "./helper/ErrorBoundary.tsx";
import "./index.css";
import store from "./store/store.tsx";
import theme from "./theme/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </ThemeProvider>
  </ErrorBoundary>
);
