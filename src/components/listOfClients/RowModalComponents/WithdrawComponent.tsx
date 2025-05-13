import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { memo, useEffect, useState } from "react";
import { EyeIcon, EyeSlash } from "../../../assets";
import StyledImage from "../../Common/StyledImages";
import BoxButton from "./BoxButton";
import MobileViewUserDetails from "./MobileViewUserDetails";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAmmountUser,
  getTotalBalance,
  getUserList,
  getUsersProfile,
  userListSuccessReset,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";
import { depositAmountValidations } from "../../../utils/Validations";

const initialValues: any = {
  userId: "",
  amount: "",
  transactionPassword: "",
  remark: "",
  transactionType: "withDraw",
};

interface WithdrawComponentProps {
  endpoint?: string;
  isWallet?: boolean;
  walletAccountDetail: any;
  element?: any;
  backgroundColor?: any;
  selected: boolean;
  setSelected: (val?: any) => void;
  titleBackgroundColor?: string;
  onChangeAmount: (val: any, val2: any, val3: any) => void;
  currentPage?: number;
}

const WithdrawComponent = ({
  endpoint,
  isWallet,
  walletAccountDetail,
  element,
  backgroundColor,
  selected,
  setSelected,
  titleBackgroundColor,
  onChangeAmount,
  currentPage,
}: WithdrawComponentProps) => {
  const [showPass, setShowPass] = useState(false);
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [initialBalance, setInitialBalance] = useState(
    walletAccountDetail?.userBal?.currentBalance
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: depositAmountValidations,
    onSubmit: (values: any) => {
      let payload;
      if (isWallet) {
        payload = {
          amount: parseFloat(values.amount),
          transactionPassword: values.transactionPassword,
          remark: values.remark,
          transactionType: "withDraw",
        };
      } else {
        payload = {
          userId: element?.id,
          amount: parseFloat(values.amount),
          transactionPassword: values.transactionPassword,
          remark: values.remark,
          transactionType: "withDraw",
        };
      }
      dispatch(
        changeAmmountUser({
          url: isWallet ? ApiConstants.WALLET.BALANCEUPDATE : endpoint,
          payload: payload,
        })
      );
    },
  });

  const { handleSubmit, touched, errors, isSubmitting, setSubmitting } = formik;

  const { loading, success, error } = useSelector(
    (state: RootState) => state.user.userList
  );

  const numberWithCommas = (numString: any) => {
    let stringWithoutCommas = numString?.replace(/,/g, "");
    if (!stringWithoutCommas?.includes(".")) {
      if (stringWithoutCommas?.length > 3) {
        let mainArray = stringWithoutCommas.slice(0, -3);
        let lastThreeDigitsArray = stringWithoutCommas.slice(-3);
        let reversedStr = mainArray.split("").reverse().join("");
        let result = "";

        for (let i = 0; i < reversedStr.length; i += 2) {
          result += reversedStr.substr(i, 2) + ",";
        }
        result = result.slice(0, -1);
        let reversedStr1 = result.split("").reverse().join("");
        return reversedStr1 + "," + lastThreeDigitsArray;
      } else {
        let data = stringWithoutCommas?.replace(/,/g, "");
        return data;
      }
    } else {
      let parts = stringWithoutCommas.split(".");
      if (parts[0]?.length > 3) {
        let mainArray = parts[0].slice(0, -3);
        let lastThreeDigitsArray = parts[0].slice(-3);
        let reversedStr = mainArray.split("").reverse().join("");
        let result = "";
        for (let i = 0; i < reversedStr.length; i += 2) {
          result += reversedStr.substr(i, 2) + ",";
        }
        result = result.slice(0, -1);
        let reversedStr1 = result.split("").reverse().join("");
        return reversedStr1 + "," + lastThreeDigitsArray + "." + parts[1];
      } else {
        let data = stringWithoutCommas?.replace(/,/g, "");
        return data;
      }
    }
  };

  const checkHandleChange = (event: any) => {
    let value = event.target.value;
    if (!/^[\d.,]*$/.test(value)) {
      return;
    }

    const dotCount = value.split(".").length - 1;
    if (dotCount > 1) {
      return;
    }

    value = value.replace(/[^\d.]/g, "");
    if (value.includes(".")) {
      let parts = value.split(".");
      if (parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
        value = parts.join(".");
      }
    }
    formik.setFieldValue("amount", value);
    onChangeAmount(parseFloat(value), element?.id, "deposite");
  };

  const handleValueChange = (v: any, type: string) => {
    if (type === "amount") {
      checkHandleChange(v);
    } else if (type === "pass") {
      formik.setFieldValue("transactionPassword", v.target.value);
    } else if (type === "remark") {
      formik.setFieldValue("remark", v.target.value);
    }
  };

  useEffect(() => {
    if (success) {
      formik.resetForm();
      setSelected(false);
      if (isWallet) {
        dispatch(getUsersProfile());
      } else {
        dispatch(
          getUserList({
            currentPage: currentPage,
            url: { endpoint: ApiConstants.USER.LIST },
          })
        );
        dispatch(getTotalBalance());
        dispatch(getUsersProfile());
      }
      setSubmitting(false);
      dispatch(userListSuccessReset());
    }
    if (error) {
      setSubmitting(false);
    }
  }, [success, error]);

  useEffect(() => {
    onChangeAmount(formik.values.amount, element?.id, "withdraw");
    if (isWallet) {
      setInitialBalance(
        +walletAccountDetail?.userBal?.currentBalance - +formik.values.amount
      );
    } else {
      setInitialBalance(
        +walletAccountDetail?.userBal?.currentBalance + +formik.values.amount
      );
    }
  }, [formik.values.amount]);

  return (
    <>
      {matchesMobile && matchesTablet ? (
        <ModalMUI
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={selected}
          onClose={setSelected}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleSubmit}>
            <MobileViewUserDetails
              elementToUDM={element}
              userName={element?.userName}
              title={"Withdraw Amount"}
              value={formik.values}
              onChange={handleValueChange}
              setShowPass={setShowPass}
              showPass={showPass}
              onCancel={() => {
                setSelected();
                onChangeAmount(0, element?.id, "withdraw");
              }}
              initialBalance={initialBalance}
              backgroundColor={backgroundColor}
              loading={loading}
              titleBackgroundColor={titleBackgroundColor}
              type="withdraw"
            />
          </form>
        </ModalMUI>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column", lg: "row" },
              gap: 2,
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", lg: "100%", md: "100%" },
                gap: "1%",
                display: { xs: "flex", lg: "block", md: "block" },
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: { xs: "41%", lg: "100%" },
                  flexDirection: {
                    xs: "column",
                    md: "row",
                    lg: "row",
                  },
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    flexDirection: {
                      xs: "row",
                      md: "row",
                      lg: "row",
                    },
                    justifyContent: "space-between",
                    position: { xs: "relative", lg: "static" },
                    marginTop: { xs: "0", lg: "0" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "3vw",
                        lg: "16px",
                        md: "16px",
                      },
                      width: { xs: "100%", lg: "100%", md: "100%" },
                      fontWeight: "600",
                      marginRight: {
                        xs: 0,
                        lg: "20px",
                        md: "20px",
                      },
                    }}
                  >
                    Withdraw Amount
                  </Typography>
                </Box>

                <Box
                  sx={{
                    background: "#E32A2A",
                    width: { xs: "100%", lg: "43%", md: "43%" },
                    height: "45px",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    borderRadius: "5px",
                    paddingX: "20px",
                  }}
                >
                  {/* replace(/[^\w\s]/gi, '') */}
                  <TextField
                    required={true}
                    id="amount"
                    name="amount"
                    // value={formik.values.amount}
                    value={numberWithCommas(formik.values.amount?.toString())}
                    variant="standard"
                    InputProps={{
                      placeholder: "Type Amount...",
                      disableUnderline: true,
                      autoFocus: true,
                      autoComplete: "off",
                      inputProps: { min: "0", step: "1" },
                      style: {
                        fontSize: "15px",
                        height: "45px",
                        fontWeight: "600",
                        color: "white",
                        textAlign: "right",
                      },
                    }}
                    type="text"
                    // onChange={formik.handleChange}
                    onChange={(e: any) => checkHandleChange(e)}
                  />
                </Box>
              </Box>

              {/* wallet */}
              <Box
                sx={{
                  width: { xs: "41%", lg: "100%" },
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                    lg: "row",
                  },
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "3vw", lg: "16px", md: "16px" },
                    width: { xs: "100%", lg: "60%", md: "60%" },
                    fontWeight: "600",
                    marginRight: { xs: 0, lg: "0", md: "20px" },
                  }}
                >
                  Wallet Balance
                </Typography>
                <Box
                  sx={{
                    width: { xs: "100%", lg: "43%", md: "43%" },
                    height: "45px",
                    // background: "#FFECBC",
                    background: "#ECECEC",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                    border: "2px solid #26262633",
                    paddingX: "20px",
                  }}
                >
                  <TextField
                    value={new Intl.NumberFormat("en-IN", {
                      currency: "INR",
                    }).format(initialBalance || 0)}
                    sx={{ width: "100%", height: "45px" }}
                    variant="standard"
                    InputProps={{
                      disabled: true,
                      placeholder: "",
                      disableUnderline: true,
                      type: "text",
                      style: {
                        fontSize: "13px",
                        height: "45px",
                        fontWeight: "600",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  width: { xs: "41%", lg: "100%" },
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  justifyContent: "flex-end",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                    lg: "row",
                  },
                  marginTop: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    flexDirection: {
                      xs: "row",
                      md: "row",
                      lg: "row",
                    },
                    justifyContent: "space-between",
                    position: { xs: "relative", lg: "static" },
                    marginTop: { xs: "0", lg: "0" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "3vw",
                        lg: "16px",
                        md: "16px",
                      },
                      width: { xs: "100%", lg: "100%", md: "100%" },
                      fontWeight: "600",
                      marginRight: {
                        xs: 0,
                        lg: "20px",
                        md: "20px",
                      },
                    }}
                  >
                    Transaction Password
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { xs: "100%", lg: "43%", md: "43%" },
                    height: "45px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                    border: "2px solid #26262633",
                  }}
                >
                  <TextField
                    required={true}
                    id="transactionPassword"
                    name="transactionPassword"
                    value={formik.values.transactionPassword}
                    onChange={formik.handleChange}
                    sx={{ width: "100%", height: "45px" }}
                    variant="standard"
                    InputProps={{
                      placeholder: "",
                      disableUnderline: true,
                      autoComplete: "new-password",
                      type: !showPass ? "password" : "text",
                      style: {
                        fontSize: "13px",
                        height: "45px",
                        fontWeight: "600",
                      },
                    }}
                  />
                  <Box
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  >
                    <StyledImage
                      src={showPass ? EyeIcon : EyeSlash}
                      alt="eye"
                      sx={{ height: "14px", width: "20px" }}
                    />
                  </Box>
                </Box>
              </Box>
              {touched.transactionPassword && errors.transactionPassword && (
                <p
                  style={{
                    color: "#fa1e1e",
                    lineHeight: "0.8",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {errors.transactionPassword as string}
                </p>
              )}
            </Box>

            <Box
              sx={{
                overflow: "hidden",
                width: "100%",
                gap: "1%",
                display: { xs: "flex", lg: "block", md: "block" },
                justifyContent: "flex-end",
                flexDirection: "row-reverse",
              }}
            >
              {/* Remark */}

              <Box
                sx={{
                  flex: 1,
                  background:
                    backgroundColor == "#ECECEC" ? "#ECECEC" : "#FFECBC",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "2px solid #26262633",
                  minHeight: "80px",
                  maxHeight: "115px",
                  marginTop: "0",
                  paddingX: "10px",
                  width: { xs: "41%", lg: "55%" },
                }}
              >
                <TextField
                  name={"remark"}
                  id={"remark"}
                  value={formik.values.remark}
                  onChange={formik.handleChange}
                  rows={4}
                  sx={{ width: "100%", minHeight: "40px" }}
                  multiline={true}
                  variant="standard"
                  InputProps={{
                    placeholder: "Remark (Optional)",
                    disableUnderline: true,
                    style: {
                      fontSize: "13px",
                      minHeight: "45px",
                      fontWeight: "600",
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  marginTop: "21px",
                  gap: 1,
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                <BoxButton
                  color={"#0B4F26"}
                  loading={loading}
                  disabled={isSubmitting}
                  containerStyle={{
                    maxWidth: "150px !important",
                    height: "44px",
                  }}
                  isSelected={true}
                  type="submit"
                  title={"Submit"}
                />
                <BoxButton
                  color={"#E32A2A"}
                  containerStyle={{
                    maxWidth: "150px !important",
                    background: "#E32A2A",
                    border: "0px",
                    height: "44px",
                  }}
                  isSelected={true}
                  onClick={() => {
                    setSelected();
                    onChangeAmount(0, element?.id, "withdraw");
                  }}
                  title={"Cancel"}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  md: "column",
                  lg: "column",
                },
                visibility: "hidden",
                justifyContent: "center",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", width: "150px" }}>
                <BoxButton
                  color={"#0B4F26"}
                  loading={loading}
                  containerStyle={{ width: "150px", height: "35px" }}
                  isSelected={true}
                  title={"Submit"}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "150px",
                  marginTop: { xs: 0, md: "10px", lg: "10px" },
                }}
              >
                <BoxButton
                  color={"#E32A2A"}
                  containerStyle={{
                    width: "150px",
                    background: "#E32A2A",
                    border: "0px",
                    height: "35px",
                  }}
                  isSelected={true}
                  onClick={() => {
                    setSelected();
                    onChangeAmount(0, element?.id, "withdraw");
                  }}
                  title={"Cancel"}
                />
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </>
  );
};

export default memo(WithdrawComponent);
