import { Box, AppBar, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Draw, FgLogo } from "../../../assets/index";
import { memo } from "react";
import StyledImage from "../../../components/Common/StyledImages";
import BoxProfile from "./BoxProfile";
import AdminEventListing from "./AdminEventListing";
import "./index.css";
import MobileSideBar from "./MobileSideBar";

const Header = ({ userDetail }: any) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const currentSelected = 1;

  const classes = {
    AppBarVal: { zIndex: (theme: any) => theme.zIndex.drawer + 1 },
    BoxCont1: [
      {
        width: "100%",
        minHeight: { lg: 60, md: 60, xs: 60 },
        display: "flex",
        flexDirection: matchesMobile ? "column" : "row",
        alignItems: !matchesMobile ? "center" : "flex-start",
        justifyContent: "space-between",
        paddingX: { lg: "2%", xs: "2%" },
        paddingY: matchesMobile ? "9px" : "0px",
        paddingBottom: matchesMobile ? "5px" : "0px",
      },
      (theme: any) => ({
        backgroundImage: `${theme.palette.primary.headerGradient}`,
      }),
    ],
    BoxCont1sub1: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      flex: 1,
    },
    BoxCont1sub1sub1: {
      display: "flex",
      alignItems: "center",
      marginRight: "12px",
    },
    BoxCont1sub1sub1StyleImg: {
      height: { lg: "24px", xs: "20px" },
      width: "auto",
      cursor: "pointer",
    },
    RenderLogoCompStyleImg: {
      height: { lg: "45px", xs: "30px" },
      width: "auto",
      marginTop: "12px",
      marginLeft: { lg: "20px", xs: "10px" },
    },
    BoxCont1sub1ButtonHead1boxStyle: {
      backgroundColor: "transparent",
      justifyContent: "center",
      borderRadius: "3px",
      marginLeft: "2%",
    },
    BoxCont1sub1LiveMarketboxStyle: {
      backgroundColor: currentSelected == 1 ? "white" : "transparent",
      borderRadius: "3px",
      justifyContent: "center",
      cursor: "pointer",
      alignItems: "center",
      marginLeft: "2%",
    },
    BoxCont1sub1ButtonHead2boxStyle: {
      backgroundColor: "transparent",
      borderRadius: "3px",
      marginLeft: "2%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHeadtitleStylefn: (currentSelected: any, num: any) => {
      return { color: currentSelected == num ? "green" : "white" };
    },
    BoxCont1sub1ButtonHead3boxStyle: {
      backgroundColor: "transparent",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHead4boxStyle: {
      backgroundColor: "transparent",
      width: "90px",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "space-around",
    },
    BoxCont1sub2: {
      width: "100%",
      display: "flex",
      marginLeft: { xs: 0, lg: 0, md: 0 },
      justifyContent: "flex-end",
      // minWidth: matchesMobile ? "100%" : "0px",
      alignItems: "center",
      marginTop: matchesMobile ? "0" : "0px",
    },
    BoxCont1sub2SearchInputContStyle: {
      height: "30px",
      minWidth: { lg: "100px", xs: "1.5vw" },
      width: "140px",
    },
    BoxCont1sub2BoxProfileContStyle: matchesMobile ? { width: "52%" } : {},
    BoxEnd: {
      minHeight: {
        lg: 60,
        xs: "60px",
        md: "60px",
      },
    },
  };
  return (
    <>
      <AppBar position="fixed" sx={classes.AppBarVal}>
        <Box sx={classes.BoxCont1}>
          <Box sx={classes.BoxCont1sub1}>
            <Box sx={classes.BoxCont1sub1sub1}>
              <StyledImage
                src={Draw}
                onClick={() => setMobileOpen((prev) => !prev)}
                sx={classes.BoxCont1sub1sub1StyleImg}
              />
              <StyledImage src={FgLogo} sx={classes.RenderLogoCompStyleImg} />
            </Box>
            <Box sx={classes.BoxCont1sub2}>
              <BoxProfile
                containerStyle={classes.BoxCont1sub2BoxProfileContStyle}
                image={"https://picsum.photos/200/300"}
                value={userDetail && userDetail?.userName}
                balance={userDetail && userDetail?.userBal?.currentBalance}
              />
            </Box>
          </Box>
        </Box>
        <MobileSideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </AppBar>
      <Box sx={classes.BoxEnd} />
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
          <div className="marquee-content">
            Add The New Match And Enjoy The Game
          </div>
        </div>
      </Box>

      <Box
        sx={[
          { flex: 1, padding: "1%" },
          (theme: any) => ({
            backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
          }),
        ]}
      >
        <AdminEventListing />
      </Box>
    </>
  );
};

export default memo(Header);
