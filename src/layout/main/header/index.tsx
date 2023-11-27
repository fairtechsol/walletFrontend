import { Box, AppBar, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Draw, FgLogo } from "../../../assets/index";
import { memo } from "react";
import StyledImage from "../../../components/Common/StyledImages";
import BoxProfile from "./BoxProfile";
import AdminEventListing from "./AdminEventListing";
import "./index.css";

const Header = ({}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Client list");
  const [anchor, setAnchor] = useState(null);
  const [anchor1, setAnchor1] = useState(null);

  const RenderLogo = useCallback(() => {
    return (
      <StyledImage
        onClick={(e: any) => {
          e.stopPropagation();
          navigate("/admin/list_of_clients");
        }}
        src={FgLogo}
        sx={{
          height: { lg: "45px", xs: "40px" },
          width: "auto",
          marginLeft: { lg: "20px", xs: "10px" },
        }}
      />
    );
  }, []);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
          height: "196px",
        }}
      >
        <Box
          sx={[
            {
              width: "100%",
              minHeight: { lg: 60, md: 60, xs: 60 },
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-center",
              justifyContent: "space-between",
              paddingX: { lg: "26px", xs: "5px" },
              paddingY: 0,
            },
            (theme: any) => ({
              backgroundImage: `${theme.palette.secondary.light}`,
            }),
          ]}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "12px",
            }}
          >
            <StyledImage
              src={Draw}
              sx={{
                height: { lg: "24px", xs: "24px" },
                width: "auto",
              }}
            />
            <RenderLogo />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <BoxProfile
              image={"https://picsum.photos/200/300"}
              value={"Admin"}
              balance={"90000"}
            />
          </Box>
        </Box>

        {/* marquee start */}
        <Box
          sx={{
            height: "32px",
            display: "flex",
            background: "#202020",
            alignItems: "center",
          }}
        >
          <div className="marquee-container nav-marquee text-white">
            <div className="marquee-content">Welcome to Fairgame</div>
          </div>
        </Box>
        <Box
          sx={[
            { flex: 1, padding: "1%" },
            (theme) => ({
              backgroundImage: `${theme.palette.secondary.dark}`,
            }),
          ]}
        >
          <AdminEventListing
            selected={selected}
            setSelected={setSelected}
            setAnchor={(e: any) => setAnchor(e.currentTarget)}
            setAnchor1={(e: any) => setAnchor1(e.currentTarget)}
          />
        </Box>
      </AppBar>
    </>
  );
};

export default memo(Header);
