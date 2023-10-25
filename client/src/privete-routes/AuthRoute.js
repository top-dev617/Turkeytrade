import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/commons/Loading";

const AuthRoute = ({ children }) => {
  const router = useRouter();
  const { user, isLoading, setIsLoading } = useContext(AuthContext);

  if (isLoading === true) {
    return <Loading />;
  }
  if (user?._id && !isLoading) {
    return children;
  }
  // if (!user && !user?._id && !isLoading) {
  //     setTimeout(() => {
  //         if (!user && !user?._id && !isLoading) {
  //             router.push("/signin");
  //         }
  //     }, 1000);
  // }
};

export default AuthRoute;
