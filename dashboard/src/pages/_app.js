import "@/styles/globals.css";
import { AuthProvider } from "@/components/context/AuthContext";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-tailwind/react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const pathname = usePathname();

  const customTheme = {};

  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ThemeProvider value={customTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
          <ToastContainer />
        </Provider>
      </AuthProvider>
    </>
  );
}
