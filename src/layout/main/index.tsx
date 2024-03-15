import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import {
  getUsersProfile,
  marqueeNotification,
  updateBalanceOfLoggedUser,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import Header from "./header";
import { socketService } from "../../socketManager";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const updateUserBalance = (event: any) => {
    dispatch(updateBalanceOfLoggedUser(event));
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userToken")) {
      navigate("/wallet/login");
    } else {
      dispatch(getUsersProfile());
      dispatch(marqueeNotification());
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("userToken")) {
      socketService.connect();
      socketService.auth.logout();
      socketService.match.userBalanceUpdate(updateUserBalance);
    }
    return () => {
      socketService.disconnect();
    };
  }, [sessionStorage.getItem("userToken")]);

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
