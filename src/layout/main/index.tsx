import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./header";
import { Background } from "../../assets";

const MainLayout = () => {
  return (
    <>
      <Box>
        <Header />
        <Box
          sx={{
            background: `url(${Background}) no-repeat center center/cover`,
            height: "calc(100vh - 199.31px)",
            marginTop: "198px",
          }}
        >
          <Box
            sx={{
              padding: "0.2% 1% 1% 1%;",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(MainLayout);
