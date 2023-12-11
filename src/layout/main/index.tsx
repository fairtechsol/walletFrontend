import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import BackgroundLayout from "../../components/Common/BackgroundLayout";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    }
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
