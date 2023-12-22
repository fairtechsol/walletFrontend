import { Box, Button, Typography } from "@mui/material";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { changePasswordReset } from "../../../store/actions/user/userAction";
import { useDispatch } from "react-redux";

{
  /* <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal> */
}
const Modal = ({
  transactionMessage,
  modalTitle,
  buttonMessage,
  setShowModal,
  closeBtn,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Box
        p={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#00000069",
          borderRadius: "15px",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          p={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #707070",
            backgroundColor: "#000",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: { xs: "150px", lg: "300px", md: "300px" },
              minWidth: { lg: "250px", md: "200px", xs: "0px" },
            }}
          >
            {/* clode button  start*/}
            {closeBtn ? (
              <Box
                sx={{
                  position: "absolute",
                  right: "-10px",
                  top: "-15px",
                  zIndex: 99999,
                  color: "#fff",
                  fontSize: "28px",
                }}
              >
                <IoCloseCircle />
              </Box>
            ) : (
              ""
            )}
            {/* clode button end */}
            <Box
              sx={{
                maxHeight: "300px",
                maxWidth: "500px",
                minHeight: "100px",
                minwidth: "150px",
                background: "#F8C851",
                borderRadius: "5px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography mb={2} color={"#000"}>
                {transactionMessage
                  ? `Your Transaction Password is : ${transactionMessage}`
                  : modalTitle}
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#004a25",
                  color: "#fff",
                  ":hover": { backgroundColor: "#43ff5f" },
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => {
                  dispatch(changePasswordReset());
                  setShowModal(false);
                  navigate("/login");
                }}
              >
                {buttonMessage}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Modal;
