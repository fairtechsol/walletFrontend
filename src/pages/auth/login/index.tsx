import { useState } from "react";
import { Button, Box, TextField, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FgLogo, mail, eye, eyeLock } from "../../../assets";
import StyledImage from "../../../components/Common/StyledImages";
import AuthBackground from "../AuthBackground";
import Input from "../../../components/login/Input";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: any) => ({
  customButton: {
    color: theme.palette.primary.main,
  },
}));

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    navigate("/admin/list_of_clients");
  };

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
          <form
            onSubmit={handleLogin}
            style={{
              width: "90%",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", opacity: 1 }}>
              <Input
                placeholder={"Enter Username"}
                title={"Username"}
                img={mail}
                img1={mail}
              />
              <Input
                title={"Password"}
                placeholder={"Enter Password"}
                containerStyle={{ marginTop: "10px" }}
                img={eye}
                img1={eyeLock}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginY: "1vh",
                marginTop: "4vh",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  width: "62%",
                  cursor: "pointer",
                  height: { xs: "50px", lg: "43px" },
                  borderRadius: "10px",
                  fontWeight: "500",
                  textTransform: "none",
                  fontSize: { lg: "14px", xs: "14px" },
                  background: `${theme.palette.secondary}`,
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
