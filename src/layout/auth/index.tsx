import { Box } from "@mui/material";
import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FgLogo } from "../../assets";
import StyledImage from "../../components/Common/StyledImages";
import AuthBackground from "../../pages/auth/AuthBackground";
const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("jwtWallet") &&
      !sessionStorage.getItem("forceChangePassword")
    ) {
      navigate("/wallet/list_of_clients");
    } else {
      navigate("/wallet/login");
    }
  }, []);

  return (
    <Box style={{ position: "relative" }}>
      <AuthBackground />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              py: "20px",
              width: "18%",
              minWidth: "250px",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <StyledImage
            src={FgLogo}
            alt="Fairgame"
            sx={{ height: "8%", width: "300px" }}
          />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(AuthLayout);
