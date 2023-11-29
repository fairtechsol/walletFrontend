import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./header";
import { Background } from "../../assets";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Box
          sx={{
            background: `url(${Background}) no-repeat center center/cover`,
            height: "calc(100vh - 210.03px)",
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
      </div>
    </>
  );
};

export default memo(MainLayout);
