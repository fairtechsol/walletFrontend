import { Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlash } from "../../../assets";
import { formatToINR } from "../../../helper";
import {
  getTotalBalance,
  getUserList,
  getUsersProfile,
  setCreditRefference,
  userListSuccessReset,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";
import { depositAmountValidations } from "../../../utils/Validations";
import StyledImage from "../../Common/StyledImages";
import BoxButton from "./BoxButton";

const initialValues: any = {
  userId: "",
  amount: 0,
  transactionPassword: "",
  transactionType: "",
  remark: "",
};

const SetCreditComponent = (props: any) => {
  const {
    isWallet,
    handleKeyDown,
    backgroundColor,
    setSelected,
    element,
    endpoint,
    onChangeAmount,
    currentPage,
  } = props;
  const [showPass, setShowPass] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const checkHandleChange = (event: any) => {
    let value = 0;
    if (event.target.value != "") {
      value = parseFloat(event.target.value.replace(/[^\w\s]/gi, ""));
    }

    formik.setFieldValue("amount", value);
    onChangeAmount(value, element?.id, "credit");
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: depositAmountValidations,
    onSubmit: (values: any) => {
      if (values.amount < 0) {
        toast.error("Credit Reference too low");
        setSubmitting(false);
        return;
      } else if (values.amount > 99999999999) {
        setSubmitting(false);
        toast.error("Credit Reference Limit Exceed", {
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
      let payload;
      if (isWallet) {
        payload = {
          amount: values.amount,
          transactionPassword: values.transactionPassword,
          // transactionType: values.transactionType,
          remark: values.remark,
        };
      } else {
        payload = {
          userId: element?.id,
          amount: values.amount,
          transactionPassword: values.transactionPassword,
          remark: values.remark,
        };
      }
      dispatch(
        setCreditRefference({
          url: isWallet ? ApiConstants.WALLET.CREDITREFERRENCE : endpoint,
          payload: payload,
        })
      );
    },
  });

  const { handleSubmit, isSubmitting, setSubmitting } = formik;

  const { loading, success, error } = useSelector(
    (state: RootState) => state.user.userList
  );

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
    onChangeAmount(formik.values.amount, element?.id, "credit");
  }, [formik.values.amount, onChangeAmount]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          paddingRight: "10px",
          flexDirection: { xs: "column", md: "row", lg: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: { xs: "column", md: "row", lg: "row" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                width: { xs: "100%", lg: "40%", md: "40%" },
                fontWeight: "600",
                marginRight: { xs: 0, lg: "20px", md: "20px" },
              }}
            >
              New Credit Limit
            </Typography>
            <Box
              sx={{
                background: "#004A25",
                width: { xs: "100%", lg: "60%", md: "60%" },
                height: "45px",
                borderRadius: "5px",
                paddingX: "20px",
              }}
            >
              <TextField
                required={true}
                name={"amount"}
                id={"amount"}
                value={formatToINR(
                  parseFloat(formik.values.amount?.toString())
                )}
                type="tel"
                onChange={(e: any) => checkHandleChange(e)}
                onKeyDown={handleKeyDown}
                variant="standard"
                InputProps={{
                  placeholder: "Type Amount...",
                  autoFocus: true,
                  autoComplete: "new-password",
                  disableUnderline: true,
                  inputProps: { min: "0" },
                  style: {
                    fontSize: "15px",
                    height: "45px",
                    fontWeight: "600",
                    color: "white",
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: "flex-end",
              marginTop: "10px",
              flexDirection: { xs: "column", md: "row", lg: "row" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                width: { xs: "100%", lg: "40%", md: "40%" },
                fontWeight: "600",
                marginRight: { xs: 0, lg: "20px", md: "20px" },
              }}
            >
              Transaction Password
            </Typography>
            <Box
              sx={{
                width: { xs: "100%", lg: "60%", md: "60%" },
                height: "45px",
                background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                paddingX: "20px",
              }}
            >
              <TextField
                required={true}
                name={"transactionPassword"}
                id={"transactionPassword"}
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
                  sx={{ height: "14px", width: "20px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
          <Box
            sx={{
              flex: 1,
              background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              minHeight: "80px",
              maxHeight: "115px",
              paddingX: "10px",
            }}
          >
            <TextField
              rows={4}
              name="remark"
              id="remark"
              sx={{ width: "100%", minHeight: "40px" }}
              multiline={true}
              variant="standard"
              value={formik.values.remark}
              onChange={formik.handleChange}
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
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "row",
              md: "column",
              lg: "column",
            },
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
          }}
        >
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
                onChangeAmount(0, element?.id, "credit");
              }}
              title={"Cancel"}
            />
          </Box>

          <Box sx={{ display: "flex", width: "150px" }}>
            <BoxButton
              color={"#0B4F26"}
              loading={loading}
              disabled={isSubmitting}
              containerStyle={{ width: "150px", height: "35px" }}
              isSelected={true}
              type="submit"
              title={"Submit"}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default memo(SetCreditComponent);
