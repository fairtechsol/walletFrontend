import { Button, Box, useTheme } from "@mui/material";
import { FgLogo, mail, eye, eyeLock } from "../../../assets";
import { useState, useEffect } from "react";
import Input from "../../../components/login/Input";
import { useNavigate } from "react-router-dom";
import { authReset, login } from "../../../store/actions/authAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({
    userName: "",
    password: "",
    loginType: "wallet",
  });

  const { success, forceChangePassword, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginState((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(login(loginState));
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      if (localStorage.getItem("forceChangePassword") === "true") {
        navigate("/change_password");
      } else {
        navigate("/wallet/list_of_clients");
      }
    }
    if (success) {
      if (forceChangePassword) {
        localStorage.setItem("forceChangePassword", "true");
        navigate("/change_password");
      } else {
        navigate("/wallet/list_of_clients");
      }
      dispatch(authReset());
    }
  }, [success]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "90%",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", opacity: 1 }}>
        <Input
          placeholder={"Enter Username"}
          title={"Username"}
          name={"userName"}
          value={loginState.userName}
          type="text"
          img={mail}
          img1={mail}
          onChange={handleChange}
          required={true}
        />
        <Input
          title={"Password"}
          name="password"
          value={loginState.password}
          type="password"
          placeholder={"Enter Password"}
          containerStyle={{ marginTop: "10px" }}
          img={eye}
          img1={eyeLock}
          onChange={handleChange}
          required={true}
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
  );
};

export default Login;
