import { Box, MenuItem, Modal, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSearchUserList } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import DirectUserBlock from "./DirectUserBlock";

const ListItems = ({ menutItems1, title }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [userBlockModal, setUserBlockModal] = useState(false);
  const classes = {
    Menusx: {
      margin: "1%",
      fontFamily: "Poppins, sans-serif",
      width: { xs: "105%", lg: "100%", md: "100%" },
    },
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: {
      sx: {
        padding: "0px",
        width: "100%",
        left: "1px !important",
        top: { lg: "191px !important", xs: "170px !important" },
        minHeight: "220px",
        background: "url(/static/media/back.00d2deda3616019e96ee.png)",
        boxShadow: "none",
      },
    },
    MenuItemsx: {
      width: "100%",
      fontSize: { lg: "16px", xs: "12px" },
      fontWeight: "600",
      marginX: "0px",
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      marginTop: "0px",
      borderStyle: "solid",
      minHeight: { xs: "30px", lg: "40px" },
      color: "black",
      "&:hover": {
        backgroundColor: "#e5b744",
        border: 0,
      },
    },
  };

  const handleClose = () => {
    setUserBlockModal(false);
    dispatch(resetSearchUserList());
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={classes.Menusx}>
          <Typography
            sx={[
              {
                fontSize: { lg: "18px", xs: "16px" },
                fontWeight: "600",
                fontFamily: "Poppins, sans-serif",
                color: "#fff",
                textTransform: "uppercase",
                marginLeft: "0.5%",
              },
            ]}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            padding: "10px",
            margin: "1%",
            borderRadius: "5px",
          }}
        >
          {menutItems1.map((x: any, index: any) => (
            <MenuItem
              key={index}
              dense={true}
              sx={classes.MenuItemsx}
              onClick={() => {
                if (x?.link) {
                  navigate(x.link);
                } else {
                  setUserBlockModal(true);
                }
              }}
            >
              {x.title}
            </MenuItem>
          ))}
        </Box>
      </Box>
      <Modal
        open={userBlockModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DirectUserBlock setShow={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default memo(ListItems);
