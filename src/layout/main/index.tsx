import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { getUsersDetail } from "../../store/actions/user/userAction";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { userDetail } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    }
    dispatch(getUsersDetail());
  }, [dispatch]);

  return (
    <>
      <Header userDetail={userDetail} />
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    </>
  );
};

export default memo(MainLayout);
