import { useState } from "react";
import { Button, Box, Input, useTheme } from "@mui/material";
import { FgLogo, LoginBg } from "../../../assets";
import StyledImage from "../../../components/StyledImages";

const Login = () => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Box style={{ position: "relative", backgroundImage: LoginBg }}>
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
            style={{ width: "90%", justifyContent: "center" }}
          >
            <Box sx={{ width: "100%", opacity: 1 }}>
              <Input
                required={true}
                autoFocus
                placeholder={"Enter Username"}
                title={"Username"}
              />
              <Input
                required={true}
                placeholder={"Enter Password"}
                inputProps={{ type: "password" }}
                title={"Password"}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginY: "1vh",
                  marginTop: "4vh",
                }}
              >
                <Button
                  // onClick={onClick}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: "62%",
                    cursor: "pointer",
                    height: { mobile: "50px", laptop: "43px" },
                    borderRadius: "10px",
                    fontWeight: "500",
                    textTransform: "none",
                    fontSize: { laptop: "14px", mobile: "14px" },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
