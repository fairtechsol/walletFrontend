import { useState } from "react";
import { Box, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import BoxButton from "./BoxButton";
import StyledImage from "../../Common/StyledImages";
import { DeleteIcon } from "../../../assets";
import DepositComponent from "./DepositComponets";
import WithdrawComponent from "./WithdrawComponent";
import SetCreditComponent from "./SetCreditComponent";
import ChangePasswordComponent from "./ChangePasswordComponent";
import LockUnlockComponent from "./LockUnlockComponent";
import SetExposureLimit from "./SetExposureLimit";

const UserDetailModal = (props: any) => {
  const { selected, setSelected, backgroundColor } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [settlementModal, setSettlementModal] = useState(false);

  const classes = {
    mainBox: {
      background: "#F8C851",
      display: "flex",
      width: { xs: "100%", lg: "100%", md: "100%" },
      justifyContent: {
        xs: "flex-start",
        md: "flex-start",
        lg: "flex-start",
      },
      overflow: "hidden",
      paddingY: "20px",
      paddingTop: "10px",
      borderBottom: "2px solid white",
    },
    mainBoxSubsx: [
      {
        width: "11.5vw",
        display: "flex",

        height: "45px",
        paddingLeft: "10px",
        borderRight: "2px solid #0000",
      },
    ],
    BoxButtonStyledImage: {
      height: { xs: "15px", lg: "18px" },
      width: { xs: "15px", lg: "17px" },
      marginLeft: "5px",
    },
    BoxButtonContStyle: {
      background: "#E32A2A",
      flex: 1,
      marginX: { lg: "10px", xs: "0" },
      alignSelf: "center",
      borderColor: "white",
    },
  };

  return (
    <Box sx={classes.mainBox}>
      {selected !== null && (
        <Box
          sx={{
            width: {
              xs: "auto",
              md: "90%",
              lg: "80%",
              marginLeft: "0",
            },
            padding: "5px",
          }}
        >
          {selected == 0 && (
            <DepositComponent
              backgroundColor={backgroundColor}
              selected={selected == 0}
              setSelected={() => {
                setSelected(null);
              }}
              titleBackgroundColor="#27AC1E"
            />
          )}
          {selected == 1 && (
            <WithdrawComponent
              selected={selected == 1}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
            />
          )}
          {selected == 2 && (
            <SetCreditComponent
              selected={selected == 2}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
            />
          )}
          {selected == 3 && (
            <ChangePasswordComponent
              selected={selected == 3}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
            />
          )}
          {selected == 5 && (
            <SetExposureLimit
              selected={selected == 5}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
            />
          )}
          {selected == 4 && (
            <LockUnlockComponent
              selected={selected == 4}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
            />
          )}
        </Box>
      )}
      {selected === null && (
        <Box
          sx={{
            // flex: 1,
            display: "flex",
            flexDirection: { xs: "row", lg: "row", md: "row" },
            gap: { xs: 0.5 },
            flexWrap: "wrap",
            justifyContent: "center",
            width: { xs: "90vw", lg: "77%", md: "100%" },
            marginTop: "9px",
          }}
        >
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(0);
            }}
            title={"Deposit"}
            isSelected={selected == 0}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            labelStyle={{}}
          />
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(1);
            }}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            isSelected={selected == 1}
            title={"Withdraw"}
            labelStyle={{}}
          />
          {/* {elementToUDM?.role?.roleName !== "expert" && ( */}
          <BoxButton
            color={"#0B4F26"}
            onClick={(e: any) => {
              e?.preventDefault();
              setSettlementModal(true);
            }}
            title={"C_Settlement"}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            labelStyle={{}}
          />
          {/* )} */}
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(3);
            }}
            title={"Change Password"}
            isSelected={selected == 3}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
          />
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(4);
            }}
            title={"Lock/Unlock"}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            isSelected={selected == 4}
          />
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(2);
            }}
            title={"set Credit Reference"}
            isSelected={selected == 2}
            labelStyle={{}}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
          />
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(5);
            }}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            title={"Set Exposure Limit"}
            labelStyle={{}}
            isSelected={selected == 5}
          />
          <BoxButton
            color={"#E32A2A"}
            deleteBtn={true}
            onClick={() => {
              setDeleteModal((prev) => !prev);
            }}
            title={"Delete User"}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            icon={
              <StyledImage src={DeleteIcon} sx={classes.BoxButtonStyledImage} />
            }
            containerStyle={classes.BoxButtonContStyle}
          />

          <Dialog
            open={settlementModal}
            onClose={() => setSettlementModal((prev) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure want to settle this commission ?"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  setSettlementModal((prev) => !prev);
                }}
              >
                No
              </Button>
              <Button
                sx={{ color: "#E32A2A" }}
                onClick={() => {
                  // handleSettlement(elementToUDM?.userId);
                  setSettlementModal((prev) => !prev);
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={deleteModal}
            onClose={() => setDeleteModal((prev) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure want to delete this user?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setDeleteModal((prev) => !prev)}>
                Cancel
              </Button>
              <Button
                sx={{ color: "#E32A2A" }}
                onClick={() => setDeleteModal((prev) => !prev)}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={confirmDeleteModal}
            onClose={() => setConfirmDeleteModal((prev) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {
                "Your available balance is not zero. Are you sure want to delete this user?"
              }
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  setConfirmDeleteModal((prev) => !prev);
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{ color: "#E32A2A" }}
                onClick={() => {
                  setConfirmDeleteModal((prev) => !prev);
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default UserDetailModal;
