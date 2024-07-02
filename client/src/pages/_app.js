import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { useEffect } from "react";
import { AuthProvider } from "@/components/context/AuthContext";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-tailwind/react";
import "../styles/globals.css";
import ChatMain from "@/components/chatting/ChatMain";
import BottomBar from "@/components/shared/BottomBar";
import SocketContext from "@/components/context/SocketContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientId } from "@/utils/auth/global";
import CookieConsent from "@/components/commons/CookieConsent";

export default function App({ Component, pageProps }) {
  // const getLayout = Component.getLayout || ((page) => page);
  const pathname = usePathname();

  const customTheme = {};
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Set behavior to 'smooth' for smooth scrolling
    });
  }, [pathname]);

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <AuthProvider>
            <SocketContext>
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
                {pathname !== "/signin" && pathname !== "/register" && (
                  <Header />
                )}
                <Component {...pageProps} />
                {pathname !== "/signin" && pathname !== "/register" && (
                  <Footer />
                )}
                <ChatMain />
                <BottomBar />
                {!pathname.includes("/help/privacy-policy") && (
                  <CookieConsent />
                )}
              </ThemeProvider>
              <ToastContainer />
            </SocketContext>
          </AuthProvider>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}
