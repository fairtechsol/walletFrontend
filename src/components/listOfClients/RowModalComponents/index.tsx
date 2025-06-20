import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import BoxButton from "./BoxButton";
import ChangePasswordComponent from "./ChangePasswordComponent";
import DepositComponent from "./DepositComponent";
import LockUnlockComponent from "./LockUnlockComponent";
import SetCreditComponent from "./SetCreditComponent";
import SetExposureLimit from "./SetExposureLimit";
import WithdrawComponent from "./WithdrawComponent";
import { ApiConstants } from "../../../utils/Constants";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTotalBalance,
  getUserList,
  getUsersProfile,
  handleDeleteUser,
  handleSettleCommission,
  userListSuccessReset,
} from "../../../store/actions/user/userAction";
import StyledImage from "../../Common/StyledImages";
import { DeleteIcon } from "../../../assets";

const RowModalComponents = (props: any) => {
  const {
    element,
    selected,
    setSelected,
    backgroundColor,
    onValueChange,
    currentPage,
    setShowUserModal,
  } = props;

  const dispatch: AppDispatch = useDispatch();

  const [settlementModal, setSettlementModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { success } = useSelector((state: RootState) => state.user.userList);
  const handleAmountChange = (amount: string, id: string, type: string) => {
    // alert(amount)
    onValueChange(amount, id, type);
  };
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

  useEffect(() => {
    if (success) {
      setSettlementModal(false);
      dispatch(
        getUserList({
          currentPage: currentPage,
          url: { endpoint: ApiConstants.USER.LIST },
        })
      );
      setShowUserModal(false);
      dispatch(getTotalBalance());
      dispatch(getUsersProfile());
      dispatch(userListSuccessReset());
    }
  }, [success]);

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
              walletAccountDetail={profileDetail}
              endpoint={
                element?.roleName !== "fairGameAdmin"
                  ? ApiConstants.SUPERADMIN.UPDATE_BALANCE
                  : ApiConstants.USER.BALANCEUPDATE
              }
              element={element}
              backgroundColor={backgroundColor}
              selected={selected == 0}
              setSelected={() => {
                setSelected(null);
              }}
              titleBackgroundColor="#27AC1E"
              onChangeAmount={handleAmountChange}
              currentPage={currentPage}
            />
          )}
          {selected == 1 && (
            <WithdrawComponent
              walletAccountDetail={profileDetail}
              endpoint={
                element?.roleName !== "fairGameAdmin"
                  ? ApiConstants.SUPERADMIN.UPDATE_BALANCE
                  : ApiConstants.USER.BALANCEUPDATE
              }
              element={element}
              selected={selected == 1}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
              onChangeAmount={handleAmountChange}
              currentPage={currentPage}
            />
          )}
          {selected == 2 && (
            <SetCreditComponent
              endpoint={
                element?.roleName !== "fairGameAdmin"
                  ? ApiConstants.SUPERADMIN.CREDIT_REFERRENCE
                  : ApiConstants.USER.CREDITREFERRENCE
              }
              element={element}
              selected={selected == 2}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
              onChangeAmount={handleAmountChange}
              currentPage={currentPage}
            />
          )}
          {selected == 3 && (
            <ChangePasswordComponent
              endpoint={
                element?.roleName !== "fairGameAdmin"
                  ? ApiConstants.SUPERADMIN.CHANGE_PASSWORD
                  : ApiConstants.USER.CHANGEPASSWORD
              }
              element={element}
              selected={selected == 3}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
              currentPage={currentPage}
              setShowUserModal={() => {}}
            />
          )}
          {selected == 5 && (
            <SetExposureLimit
              endpoint={
                element?.roleName !== "fairGameAdmin"
                  ? ApiConstants.SUPERADMIN.EXPOSURE_LIMIT
                  : ApiConstants.USER.EXPOSURELIMIT
              }
              element={element}
              selected={selected == 5}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
              onChangeAmount={handleAmountChange}
              currentPage={currentPage}
            />
          )}
          {selected == 4 && (
            <LockUnlockComponent
              endpoint={
                element?.roleName !== "fairGameAdmin"
                  ? ApiConstants.SUPERADMIN.LOCK_UNLOCK_USER
                  : ApiConstants.USER.LOCKUNLOCK
              }
              element={element}
              selected={selected == 4}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
              onChangeAmount={handleAmountChange}
              currentPage={currentPage}
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
          {!element?.isUrl && (
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
          )}
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
              setShowDeleteModal((prev: boolean) => !prev);
            }}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            title={"Delete User"}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            icon={
              <StyledImage src={DeleteIcon} sx={classes.BoxButtonStyledImage} />
            }
            // containerStyle={classes.BoxButtonContStyle}
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
              <Button onClick={() => setSettlementModal((prev) => !prev)}>
                No
              </Button>
              <Button
                sx={{ color: "#E32A2A" }}
                onClick={() => {
                  dispatch(
                    handleSettleCommission({
                      userId: element?.id,
                      domain: element?.domain,
                    })
                  );
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={showDeleteModal}
            onClose={() => setShowDeleteModal((prev: boolean) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure want to delete this user?"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setShowDeleteModal((prev: boolean) => !prev)}
              >
                Cancel
              </Button>
              <Button
                sx={{ color: "#E32A2A" }}
                onClick={() => {
                  dispatch(handleDeleteUser(element?.id));
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {/* <Dialog
            open={false}
            onClose={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {
                "Your available balance is not zero. Are you sure want to delete this user?"
              }
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => {}}>Cancel</Button>
              <Button sx={{ color: "#E32A2A" }} onClick={() => {}}>
                Yes
              </Button>
            </DialogActions>
          </Dialog> */}
        </Box>
      )}
    </Box>
  );
};

export default RowModalComponents;
