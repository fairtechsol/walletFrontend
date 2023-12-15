import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  getUsersProfile,
} from "../../store/actions/user/userAction";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    }
    dispatch(getUsersProfile());
  }, []);

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
