import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import StyledImage from "../../Common/StyledImages";
import BoxButton from "./BoxButton";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { userChangePasswordValidations } from "../../../utils/Validations";

import {
  EyeIcon,
  EyeIconWhite,
  EyeSlash,
  EyeSlashWhite,
} from "../../../assets";

const initialValues: any = {
  userId: "",
  newPassword: "",
  transactionPassword: "",
};

const ChangePasswordComponent = (props: any) => {
  const { setSelected, element } = props;
  const [showPass, setShowPass] = useState(false);
  // const handleChangePassword = (e: any) => {
  //   e.preventDefault();
  // };

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userChangePasswordValidations,
    onSubmit: (values: any) => {
      let payload: any = {
        userId: element.userId,
        newPassword: values.newPassword,
        transactionPassword: values.transactionPassword,
      };
      dispatch(changePassword(payload));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const { loading } = useSelector((state: RootState) => state.user);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          paddingX: "10px",
          flexDirection: { xs: "column", md: "row", lg: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ width: { lg: "100%", xs: "88vw" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: { xs: "flex-start", lg: "center" },
              flexDirection: { xs: "row", md: "row", lg: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                width: { xs: "60%", lg: "70%", md: "70%" },
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                  width: { xs: "100%", lg: "32.5%", md: "32.5%" },
                  fontWeight: "600",
                  marginRight: { xs: 0, lg: "20px", md: "20px" },
                }}
              >
                New Password
              </Typography>
              <Box
                sx={{
                  width: { xs: "100%", lg: "32.5", md: "60%" },
                  height: "45px",
                  background: "#0B4F26",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "2px solid #26262633",
                  paddingX: "20px",
                }}
              >
                <TextField
                  required={true}
                  id="newPassword"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  //   onChange={(e) => {
                  //     setChangePasswordObj({
                  //       ...changePasswordObj,
                  //       password: e.target.value,
                  //       userId: userModal.id,
                  //     });
                  //   }}
                  sx={{ width: "100%", height: "45px", color: "white" }}
                  variant="standard"
                  InputProps={{
                    placeholder: "",
                    autoFocus: true,
                    disableUnderline: true,
                    autoComplete: "new-password",
                    type: !showPass ? "password" : "text",
                    style: {
                      fontSize: "13px",
                      height: "45px",
                      fontWeight: "600",
                      color: "white",
                    },
                  }}
                />
                <Box
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                >
                  <StyledImage
                    src={showPass ? EyeIconWhite : EyeSlashWhite}
                    sx={{ height: "14px", width: "20px", fill: "white" }}
                  />
                </Box>
              </Box>
              {touched.transactionPassword && errors.transactionPassword && (
                <p style={{ color: "#fa1e1e" }}>
                  {errors.transactionPassword as string}
                </p>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                width: { xs: "40%", lg: "250px" },
                marginTop: { xs: "18px", md: "0", lg: "0" },
              }}
            >
              <BoxButton
                color={"#E32A2A"}
                loading={loading}
                containerStyle={{
                  width: "100%",
                  background: "#E32A2A",
                  border: "0px",
                  height: "45px",
                  marginLeft: "10px",
                  maxWidth: {
                    xs: "91% !important",
                    lg: "100% !important",
                  },
                  flex: {
                    lg: "0 0 60%!important",
                    xs: "0 0 100%!important",
                  },
                }}
                isSelected={true}
                onClick={() => {
                  setSelected();
                }}
                title={"Cancel"}
              />
            </Box>
          </Box>
          <p style={{ color: "#fa1e1e" }}>
            {/* {changePasswordObj.password &&
              onChangeKeyCheck(changePasswordObj.password) !== false &&
              onChangeKeyCheck(changePasswordObj.password)} */}
          </p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: { xs: "flex-start", lg: "center" },
              flexDirection: { xs: "row", md: "row", lg: "row" },
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                width: { xs: "60%", lg: "70%", md: "70%" },
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                  width: { xs: "100%", lg: "32.5%", md: "32.5%" },
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
                  id="transactionPassword"
                  name="transactionPassword"
                  value={formik.values.transactionPassword}
                  onChange={formik.handleChange}
                  //   onChange={(e) => {
                  //     setChangePasswordObj({
                  //       ...changePasswordObj,
                  //       adminTransPassword: e.target.value,
                  //     });
                  //   }}
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

            <Box
              sx={{
                display: "flex",
                width: { xs: "40%", lg: "250px" },
                marginTop: { xs: "18px", md: "0", lg: "0" },
              }}
            >
              <BoxButton
                color={"#0B4F26"}
                containerStyle={{
                  width: "100%",
                  height: "45px",
                  marginLeft: "10px",
                  maxWidth: {
                    xs: "91% !important",
                    lg: "100% !important",
                  },
                  flex: {
                    lg: "0 0 60%!important",
                    xs: "0 0 100%!important",
                  },
                }}
                isSelected={true}
                type="submit"
                title={"Submit"}
              />
            </Box>
          </Box>

          {/* cancel submit buttons  */}

          <Box
            sx={{
              display: "none",
              flexDirection: { xs: "row", md: "row", lg: "row" },
              justifyContent: "flex-start",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", width: "150px" }}>
              <BoxButton
                containerStyle={{
                  width: "100%",
                  height: "35px",
                }}
                isSelected={true}
                color={"#0B4F26"}
                type="submit"
                title={"Submit"}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default ChangePasswordComponent;
