import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { useState } from "react";
import { AuthProvider } from "@/components/context/AuthContext";
import Chatting from "@/components/chatting/Chatting";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-tailwind/react";
import "../styles/globals.css";
import ChatMain from "@/components/chatting/ChatMain";
import BottomBar from "@/components/shared/BottomBar";

export default function App({ Component, pageProps }) {
  // const getLayout = Component.getLayout || ((page) => page);
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
            {pathname !== "/signin" && pathname !== "/register" && <Header />}
            <Component {...pageProps} />
            {pathname !== "/signin" && pathname !== "/register" && <Footer />}
            <ChatMain />
            <BottomBar />
          </ThemeProvider>
          <ToastContainer />
        </Provider>
      </AuthProvider>
    </>
  );
}
