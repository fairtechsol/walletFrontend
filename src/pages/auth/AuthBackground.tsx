import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { LoginBg } from "../../assets";

const AuthBackground = () => {
  const containerRef = useRef(null);

  return (
    <Box
      ref={containerRef}
      sx={{ backgroundImage: LoginBg }}
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: 0,
        top: 0,
        left: 0,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 100vh",
      }}
    />
  );
};

export default AuthBackground;
