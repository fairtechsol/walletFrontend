import { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import Input from "../../components/login/Input";
import { eye, eyeLock } from "../../assets";

const ChangePassword = (props: any) => {
  const { passLoader, width } = props;

  const [formState, setFormState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: { xs: "96vw", lg: "19vw", md: "19vw" },
          minWidth: {
            lg: width ? width : "350px",
            md: width ? width : "350px",
            xs: "0px",
          },
          marginTop: "10px",
          marginX: { xs: "2vw", lg: "1vw" },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "18px", xs: "20px" },
            fontWeight: "700",
          }}
        >
          Change Password
        </Typography>
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            background: "#F8C851",
            borderRadius: "5px",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <Input
            required={true}
            placeholder={"Enter Old Password"}
            title={"Old Password"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{}}
            img={eye}
            img1={eyeLock}
            name={"oldPassword"}
            type="password"
            value={formState.oldPassword}
            onChange={handleChange}
          />
          {/* {errors.oldPassword && (
            <p style={{ color: "#fa1e1e" }}>{errors.oldPassword}</p>
          )} */}
          <Input
            required={true}
            placeholder={"Enter New Password"}
            title={"New Password"}
            name={"newPassword"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            type="password"
            value={formState.newPassword}
            onChange={handleChange}
          />
          {/* {errors.newPassword && (
            <p style={{ color: "#fa1e1e" }}>{errors.newPassword}</p>
          )} */}
          <Input
            required={true}
            placeholder={"Enter Confirm Password"}
            title={"Confirm New Password"}
            name={"confirmPassword"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            type="password"
            value={formState.confirmPassword}
            onChange={handleChange}
          />
          {/* {errors.confirmPassword && (
            <p style={{ color: "#fa1e1e" }}>Password Doesn't match</p>
          )} */}
          <Button
            type="submit"
            sx={{
              height: "50px",
              display: "flex",
              justify: "center",
              alignItems: "center",
              mx: "auto",
              marginTop: "60px",
              marginBottom: "40px",
              width: "80%",
              background: "#0B4F26",
              borderRadius: "5px",
              cursor: "pointer",
              "&:hover": {
                background: "#0B4F26",
              },
            }}
          >
            <Typography
              sx={{ fontSize: { lg: "18px", xs: "20px" } }}
              color={"white"}
            >
              {passLoader ? (
                <CircularProgress
                  sx={{
                    color: "#FFF",
                  }}
                  size={20}
                  thickness={4}
                  value={60}
                />
              ) : (
                "Update"
              )}
            </Typography>
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ChangePassword;
