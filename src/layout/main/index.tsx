import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import { socketService } from "../../socketManager";
import {
  getUsersProfile,
  marqueeNotification,
  updateBalanceOfLoggedUser,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import Header from "./header";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const updateUserBalance = (event: any) => {
    dispatch(updateBalanceOfLoggedUser(event));
  };

  useEffect(() => {
    if (!sessionStorage.getItem("jwtWallet")) {
      navigate("/wallet/login");
      sessionStorage.clear();
    } else {
      dispatch(getUsersProfile());
      dispatch(marqueeNotification());
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("jwtWallet")) {
        socketService.connect();
        socketService.auth.logout();
        socketService.match.userBalanceUpdate(updateUserBalance);
        return () => {
          socketService.disconnect();
        };
      }
    } catch (error) {
      console.error(error);
    }
  }, [sessionStorage.getItem("jwtWallet")]);

  return (
    <>
      <Header />
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    </>
  );
};

export default memo(MainLayout);
