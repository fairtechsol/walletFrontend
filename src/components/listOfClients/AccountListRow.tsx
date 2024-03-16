import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DownGIcon, DownIcon, LockIcon, UnLockIcon } from "../../assets";
import { AccountListRowInterface } from "../../interface/listOfClients";
import {
  getModalUserList,
  getTotalBalance,
  handleModelActions,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants } from "../../utils/Constants";
import { Modal } from "../Common/Modal";
import StyledImage from "../Common/StyledImages";
import CommissionReportTable from "../commisionReport/CommissionReportTable";
import RowModalComponents from "./RowModalComponents";
import { useSelector } from "react-redux";

const AccountListRow = (props: AccountListRowInterface) => {
  const {
    containerStyle,
    fContainerStyle,
    fTextStyle,
    profit,
    element,
    getListOfUser,
    showOptions,
    showCReport,
    showUserDetails,
    show,
    domain,
  } = props;

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [userModal] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("No data found");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCommissionReport, setShowCommissionReport] = useState({
    value: false,
    id: "",
  });
  const [currentPage] = useState<number>(1);
  const [selected, setSelected] = useState(null);
  const [depositeValue, setDepositeValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const [creditValue, setCreditValue] = useState(0);
  const [exposureValue, setExposureValue] = useState(0);
  const [lockValue, setLockValue] = useState<any>(null);
  const [typeOfAmount, setTypeOfAmount] = useState<string>("");
  const { isUrl } = useSelector((state: RootState) => state.user.userList);
  const handleAmountChange = (amount: any, id: string, type: string) => {
    if (id === element?.id) {
      setTypeOfAmount(type);
      if (type === "deposite") {
        setDepositeValue(Number(amount));
      } else if (type === "withdraw") {
        setWithdrawValue(Number(amount));
      } else if (type === "credit") {
        setCreditValue(Number(amount));
      } else if (type === "exposure") {
        setExposureValue(Number(amount));
      } else if (type === "lock") {
        setLockValue(amount);
      }
    }
  };
  const calculateValue = (): number => {
    const baseValue = +element?.userBal?.profitLoss || 0;

    if (Number(baseValue) >= 0) {
      return Number(
        typeOfAmount === "deposite"
          ? baseValue + depositeValue
          : typeOfAmount === "withdraw"
          ? baseValue - withdrawValue
          : typeOfAmount === "credit" && creditValue
          ? baseValue + element?.creditRefrence - creditValue
          : baseValue
      );
    } else {
      return Number(
        typeOfAmount === "deposite"
          ? baseValue + depositeValue
          : typeOfAmount === "withdraw"
          ? baseValue - withdrawValue
          : typeOfAmount === "credit" && creditValue
          ? baseValue + element?.creditRefrence - creditValue
          : baseValue
      );
    }
  };
  const formattedValue = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  }).format(calculateValue());

  const calculateProfitLoss = (): number => {
    const baseProfitLoss = +element?.percentProfitLoss || 0;

    if (typeof baseProfitLoss === "number" && baseProfitLoss >= 0) {
      return Number(
        typeOfAmount === "deposite"
          ? (Number(+element?.userBal?.profitLoss + depositeValue) *
              element?.upLinePartnership) /
              100
          : typeOfAmount === "credit" && creditValue
          ? (Number(
              +element?.userBal?.profitLoss +
                element?.creditRefrence -
                creditValue
            ) *
              element?.upLinePartnership) /
            100
          : typeOfAmount === "withdraw"
          ? (Number(+element?.userBal?.profitLoss - withdrawValue) *
              element?.upLinePartnership) /
            100
          : +element?.percentProfitLoss || 0
      );
    } else {
      return Number(
        typeOfAmount === "deposite"
          ? (Number(+element?.userBal?.profitLoss + depositeValue) *
              element?.upLinePartnership) /
              100
          : typeOfAmount === "credit" && creditValue
          ? (Number(
              +element?.userBal?.profitLoss +
                element?.creditRefrence -
                creditValue
            ) *
              element?.upLinePartnership) /
            100
          : typeOfAmount === "withdraw"
          ? (Number(+element?.userBal?.profitLoss - withdrawValue) *
              element?.upLinePartnership) /
            100
          : +element?.percentProfitLoss || 0
      );
    }
  };
  const formattedPLValue = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  }).format(calculateProfitLoss());

  const handleModal = () => {
    dispatch(
      handleModelActions({
        url: ApiConstants.USER.LIST,
        userId: element?.id,
        roleName: element?.roleName,
        domain: element?.domain ? element?.domain : "",
        openModal: true,
        isUrl: element?.isUrl,
        title: element?.userName,
      })
    );
    dispatch(
      getTotalBalance({
        userId: element?.id,
        roleName: element?.roleName,
        domain: domain ? domain : element?.domain ? element?.domain : "",
      })
    );
    dispatch(
      getModalUserList({
        currentPage: currentPage,
        url: ApiConstants.USER.LIST,
        userId: element?.id,
        roleName: element?.roleName,
        domain: domain ? domain : element?.domain ? element?.domain : "",
      })
    );
  };
  return (
    <>
      <Box
        sx={[
          {
            width: "100%",
            display: "flex",
            height: "45px",
            background: "#0B4F26",
            alignItems: "center",
            overflow: "hidden",
            borderBottom: "2px solid white",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={[
            {
              width: { lg: "11.5vw", md: "20.2vw", xs: "26.5vw" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            variant="h5"
            onClick={(e: any) => {
              e.stopPropagation();
              if (!["user", "expert"].includes(element?.roleName)) {
                handleModal();
              } else {
                return false;
              }
            }}
            sx={[
              {
                cursor: "pointer",
                textTransform: "capitalize",
                wordBreak: "break-all",
              },
              fTextStyle,
            ]}
          >
            {element?.userName}
          </Typography>
          {showOptions && !show && (
            <EditOutlinedIcon
              fontSize="medium"
              onClick={() => {
                navigate(`/wallet/edit_account`, {
                  state: {
                    id: element?.id,
                  },
                });
              }}
              sx={{
                color:
                  fContainerStyle.background == "#F8C851"
                    ? "#0B4F26"
                    : "#FFFFFF",
                cursor: "pointer",
              }}
            />
          )}
          {showOptions && element?.roleName !== "expert" && (
            <StyledImage
              onClick={() => {
                setShowUserModal((prev) => !prev);
                setSelected(null);
              }}
              src={
                fContainerStyle.background == "#F8C851" ? DownGIcon : DownIcon
              }
              style={{ cursor: "pointer", width: "16px", height: "12px" }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { lg: "10.5vw", md: "9vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">
            {typeOfAmount === "credit" && creditValue > 0 ? (
              <>
                {new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  Number(+creditValue)
                )}
              </>
            ) : (
              <>
                {new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  +element?.creditRefrence || 0
                )}
              </>
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "9vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">
            {Number(+element?.balance || 0) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  typeOfAmount === "withdraw"
                    ? Number(+element?.balance - withdrawValue)
                    : Number(+element?.balance || 0)
                )}
              </>
            ) : (
              new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                typeOfAmount === "withdraw"
                  ? Number(+element?.balance - withdrawValue)
                  : Number(+element?.balance || 0)
              )
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "10.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            background: calculateValue() >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            {formattedValue}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: "15px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "15px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            background: calculateProfitLoss() >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            {formattedPLValue}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: "15px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "15px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "9.5vw", md: "9vw", xs: "26.5vw" },
            display: "flex",
            justifyContent: "space-between",
            paddingX: "10px",
            alignItems: "center",

            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{element?.commission || 0}</Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">
            {new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
              +element?.userBal?.exposure || 0
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">
            {Number(+element?.availableBalance || 0) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  typeOfAmount === "deposite"
                    ? +element?.availableBalance + depositeValue
                    : typeOfAmount === "withdraw"
                    ? +element?.availableBalance - withdrawValue
                    : +element?.availableBalance || 0
                )}
              </>
            ) : (
              new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                typeOfAmount === "deposite"
                  ? +element?.availableBalance + depositeValue
                  : typeOfAmount === "withdraw"
                  ? +element?.availableBalance - withdrawValue
                  : +element?.availableBalance || 0
              )
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "5vw", md: "5vw", xs: "14vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={
              lockValue
                ? !lockValue?.all_blocked
                  ? UnLockIcon
                  : LockIcon
                : !element?.userBlock
                ? UnLockIcon
                : LockIcon
            }
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "5vw", md: "5vw", xs: "14vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            paddingX: "10px",
          }}
        >
          <StyledImage
            src={
              lockValue
                ? !lockValue?.bet_blocked
                  ? UnLockIcon
                  : LockIcon
                : !element?.betBlock
                ? UnLockIcon
                : LockIcon
            }
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>

        <Box
          sx={{
            width: { lg: "8vw", md: "8vw", xs: "26.5vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            paddingX: "10px",
          }}
        >
          <Typography variant="h5">
            {typeOfAmount === "exposure" && exposureValue > 0
              ? new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  Number(exposureValue)
                )
              : new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  element?.exposureLimit || 0
                )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "10vw", md: "8vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{`${element.roleName ?? ""} ${
            element.roleName === "superAdmin"
              ? element?.isUrl
                ? "(url)"
                : ""
              : ""
          }`}</Typography>{" "}
        </Box>
      </Box>

      {showUserModal && element?.roleName !== "expert" && (
        <Box
          sx={[
            {
              width: "100%",
              display: "flex",
              height: "100%",
              background: "#0B4F26",
              alignItems: "center",
              overflow: "hidden",
              flexDirection: { xs: "column", lg: "row" },
            },
            containerStyle,
          ]}
        >
          <Box
            sx={[
              {
                width: {
                  lg: "11vw",
                  md: "25vw",
                  xs: "96vw",
                },
                alignSelf: "stretch",
                justifyContent: "space-between",
                borderRight: "2px solid white",
              },
              fContainerStyle,
            ]}
          >
            {!element?.isUrl && !isUrl && (
              <Box
                sx={{
                  width: "100% ",
                  height: "100%",
                  padding: "10px",
                  display: { lg: "block", xs: "flex" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflow: "hidden",
                  borderBottom: "2px solid white",
                }}
              >
                <Box sx={{ width: { lg: "100%", xs: "50%" } }}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: {
                        lg: "flex-start",
                        xs: "flex-start",
                      },
                    }}
                  >
                    {element?.matchComissionType ? (
                      <>
                        <Typography
                          variant="h5"
                          sx={[
                            {
                              color: "white",
                              textAlign: { lg: "left", xs: "left" },
                              width: { lg: "100px", xs: "100px" },
                            },
                            fTextStyle,
                          ]}
                        >
                          {element?.matchComissionType} Com
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={[
                            {
                              color: "white",
                              textAlign: "center",
                              marginRight: "1px",
                            },
                            fTextStyle,
                          ]}
                        >
                          {":"}{" "}
                          {element?.matchCommission
                            ? element?.matchCommission
                            : 0}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h5"
                          sx={[
                            {
                              color: "white",
                              textAlign: { lg: "left", xs: "left" },
                              width: { lg: "100px", xs: "100px" },
                            },
                            fTextStyle,
                          ]}
                        >
                          Match Com
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={[
                            {
                              color: "white",
                              textAlign: "left",
                            },
                            fTextStyle,
                          ]}
                        >
                          : 0
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="h5"
                        sx={[
                          {
                            color: "white",
                            textAlign: { lg: "left", xs: "left" },
                            width: { lg: "100px", xs: "100px" },
                          },
                          fTextStyle,
                        ]}
                      >
                        Session Com
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={[
                          {
                            color: "white",
                            textAlign: "center",
                            marginRight: "1px",
                          },
                          fTextStyle,
                        ]}
                      >
                        {": "}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h5"
                      sx={[
                        {
                          color: "white",
                          textAlign: "left",
                          marginLeft: "3px",
                        },
                        fTextStyle,
                      ]}
                    >
                      {element?.sessionCommission
                        ? element?.sessionCommission
                        : 0}
                    </Typography>
                  </Box>
                </Box>
                {showCReport && (
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: { lg: "10px", xs: "0" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      marginRight: { lg: "0", xs: "5px" },
                      width: { lg: "100%", xs: "33%" },
                    }}
                    onClick={() => {
                      if (element?.totalComission !== null) {
                        setShowCommissionReport({
                          value: true,
                          id: element?.id,
                        });
                      } else {
                        return false;
                      }
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={[
                        {
                          color: "white",
                          textAlign: "center",
                          alignItems: "center",
                          marginRight: { lg: "0", xs: "3px" },
                        },
                        fTextStyle,
                      ]}
                    >
                      Commission Details
                    </Typography>
                    <StyledImage
                      src={
                        fContainerStyle.background == "#F8C851"
                          ? DownGIcon
                          : DownIcon
                      }
                      sx={{
                        height: { lg: "10px", xs: "14px" },
                        cursor: "pointer",
                        width: { lg: "15px", xs: "23px" },
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              visibility: showUserDetails ? "visible" : "hidden",
              alignItems: "center",
              height: "100%",
            }}
          >
            <RowModalComponents
              selected={selected}
              element={element}
              setSelected={setSelected}
              getListOfUser={getListOfUser}
              setShowUserModal={setShowUserModal}
              backgroundColor={containerStyle?.background}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              onValueChange={handleAmountChange}
            />
          </Box>
        </Box>
      )}

      <ModalMUI
        open={showCommissionReport?.value}
        onClose={() => {
          setShowCommissionReport({ value: false, id: "" });
        }}
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
          <CommissionReportTable
            title={element?.userName}
            id={showCommissionReport?.id}
            show={showCommissionReport?.value}
            setShow={setShowCommissionReport}
          />
        </Box>
      </ModalMUI>

      {showSuccessModal && (
        <Modal
          message={showModalMessage}
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          navigateTo={"list_of_clients"}
          // title={`${element?.userName} - (Commission Report)`}
        ></Modal>
      )}
    </>
  );
};

export default AccountListRow;
