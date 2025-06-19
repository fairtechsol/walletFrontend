import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useState } from "react";
import { CANCEL, LockIcon, UnLockIcon, eye, eyeLock } from "../../assets";

interface UnlockComponentProps {
  onSubmit: (val: any) => void;
  title: string;
  unlock: any;
  handleHide: any;
}

const UnlockComponent = ({
  onSubmit,
  title,
  unlock,
  handleHide,
}: UnlockComponentProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", lg: "60%", md: "60%" },
        border: "2px solid #303030",
        position: "relative",
        height: "110px",
        borderRadius: "10px",
        background: "white",
        zIndex: "999",
      }}
    >
      <img
        onClick={() => {
          handleHide();
        }}
        src={CANCEL}
        style={{
          width: "25px",
          height: "25px",
          top: "3px",
          position: "absolute",
          right: "3px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingY: "1vh",
        }}
      >
        <img
          src={unlock ? UnLockIcon : LockIcon}
          style={{ width: "20px", height: "25px" }}
        />
        <Typography sx={{ fontWeight: "700", marginLeft: "5px" }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "700", paddingX: "15px" }}
          >
            Transaction Password
          </Typography>
        </Box>
        <Box sx={{ width: "40%", position: "relative" }}>
          <TextField
            variant="standard"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              disableUnderline: true,
              sx: {
                border: "1px solid #26262633",
                borderRadius: "2px",
                paddingX: "5px",
                fontSize: "12px",
                height: "40px",
                paddingRight: "30px",
                fontWeight: "500",
              },
            }}
          />
          <img
            src={showPassword ? eye : eyeLock}
            onClick={togglePasswordVisibility}
            style={{
              width: "12px",
              height: "9px",
              position: "absolute",
              right: "15%",
              top: "40%",
              cursor: "pointer",
            }}
          />
        </Box>
        <Box sx={{ width: "30%", marginLeft: "10px" }}>
          <Box
            onClick={() => {
              if (password.trim() != "") {
                onSubmit(password);
              }
            }}
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              height: "35px",
              background: "#0B4F26",
              cursor: "pointer",
            }}
          >
            <Typography sx={{ color: "white", fontSize: "14px" }}>
              Submit
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default memo(UnlockComponent);
