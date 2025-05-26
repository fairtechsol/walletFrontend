import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlash } from "../../assets";
import {
  changeDeletePassword,
  resetDeleteChangePassword,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { changeDeleteCodeValidation } from "../../utils/Validations";
import CustomErrorMessage from "../Common/CustomErrorMessage";
import BoxButton from "../listOfClients/RowModalComponents/BoxButton";
import Input from "../login/Input";

const containerStyles = {
  marginTop: { xs: "2px", lg: "10px" },
};
const titleStyles = {
  color: "#202020",
  fontSize: { xs: "10px", lg: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const inputStyle = {
  fontSize: { xs: "10px", lg: "14px", fontWeight: "600" },
};
const inputContainerStyle = {
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};

const initialValues: any = {
  password: "",
  confirmPassword: "",
  code: "",
};

interface ChangeDeleteCodeProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const ChangeDeleteCode = ({ open, setOpen }: ChangeDeleteCodeProps) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { success } = useSelector((state: RootState) => state.user.userList);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changeDeleteCodeValidation,
    onSubmit: (values: any) => {
      dispatch(changeDeletePassword(values));
    },
  });

  useEffect(() => {
    if (success) {
      setOpen(false);
      dispatch(resetDeleteChangePassword());
    }
  }, [success]);

  const { handleSubmit, touched, errors, values } = formik;
  return (
    <>
      {matchesMobile && matchesTablet ? (
        <ModalMUI
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              sx={{
                borderRadius: "5px",
                background: "#FFE094",
                padding: matchesMobile ? "10px" : "20px",
                width: "100%",
                margin: "10px 0px",
                alignItems: "end",
              }}
            >
              <Grid item xs={12} md={4}>
                <Input
                  containerStyle={containerStyles}
                  img={EyeIcon}
                  img1={EyeSlash}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "45px", xs: "36px" },
                  }}
                  fullWidth={true}
                  title={"Password*"}
                  name={"password"}
                  id={"password"}
                  type={"password"}
                  placeholder={"Ex : Abc@12"}
                  required={true}
                  value={formik.values.password}
                  error={touched.password && Boolean(errors.password)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />{" "}
                <CustomErrorMessage
                  touched={touched.password}
                  errors={errors.password}
                  style={{
                    lineHeight: 1,
                    marginTop: 1,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Input
                  containerStyle={containerStyles}
                  img={EyeIcon}
                  img1={EyeSlash}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "45px", xs: "36px" },
                  }}
                  title={"Confirm Password*"}
                  fullWidth={true}
                  name={"confirmPassword"}
                  id={"confirmPassword"}
                  type={"password"}
                  placeholder={"Ex : Abc@12"}
                  required={true}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  onBlur={formik.handleBlur}
                />
                <CustomErrorMessage
                  touched={touched.confirmPassword}
                  errors={errors.confirmPassword}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Input
                  containerStyle={containerStyles}
                  img={EyeIcon}
                  img1={EyeSlash}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "45px", xs: "36px" },
                  }}
                  title={"Verify Password*"}
                  fullWidth={true}
                  name={"code"}
                  id={"code"}
                  type={"password"}
                  placeholder={"Ex : Abc@12"}
                  required={true}
                  value={values.code}
                  onChange={formik.handleChange}
                  error={touched.code && Boolean(errors.code)}
                  onBlur={formik.handleBlur}
                />
                <CustomErrorMessage
                  touched={touched.code}
                  errors={errors.code}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3,
                    justifyContent: "center",
                  }}
                >
                  <BoxButton
                    color={"#0B4F26"}
                    //   loading={loading}
                    containerStyle={{ height: "35px", width: "100%" }}
                    isSelected={true}
                    type="submit"
                    title={"Submit"}
                  />
                  <BoxButton
                    color={"#E32A2A"}
                    containerStyle={{
                      background: "#E32A2A",
                      border: "0px",
                      height: "35px",
                      width: "100%",
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}
                    isSelected={true}
                    title={"Cancel"}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </ModalMUI>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              borderRadius: "5px",
              background: "#FFE094",
              padding: matchesMobile ? "10px" : "20px",
              width: "100%",
              margin: "10px 0px",
              alignItems: "end",
            }}
          >
            <Grid item xs={12} md={4}>
              <Input
                containerStyle={containerStyles}
                img={EyeIcon}
                img1={EyeSlash}
                titleStyle={titleStyles}
                inputStyle={inputStyle}
                inputContainerStyle={{
                  ...inputContainerStyle,
                  height: { lg: "45px", xs: "36px" },
                }}
                fullWidth={true}
                title={"Password*"}
                name={"password"}
                id={"password"}
                type={"password"}
                placeholder={"Ex : Abc@12"}
                required={true}
                value={formik.values.password}
                error={touched.password && Boolean(errors.password)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />{" "}
              <CustomErrorMessage
                touched={touched.password}
                errors={errors.password}
                style={{
                  lineHeight: 1,
                  marginTop: 1,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Input
                containerStyle={containerStyles}
                img={EyeIcon}
                img1={EyeSlash}
                titleStyle={titleStyles}
                inputStyle={inputStyle}
                inputContainerStyle={{
                  ...inputContainerStyle,
                  height: { lg: "45px", xs: "36px" },
                }}
                title={"Confirm User Password*"}
                fullWidth={true}
                name={"confirmPassword"}
                id={"confirmPassword"}
                type={"password"}
                placeholder={"Ex : Abc@12"}
                required={true}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage
                touched={touched.confirmPassword}
                errors={errors.confirmPassword}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Input
                containerStyle={containerStyles}
                img={EyeIcon}
                img1={EyeSlash}
                titleStyle={titleStyles}
                inputStyle={inputStyle}
                inputContainerStyle={{
                  ...inputContainerStyle,
                  height: { lg: "45px", xs: "36px" },
                }}
                title={"Transaction Password*"}
                fullWidth={true}
                name={"code"}
                id={"code"}
                type={"password"}
                placeholder={"Ex : Abc@12"}
                required={true}
                value={values.code}
                onChange={formik.handleChange}
                error={touched.code && Boolean(errors.code)}
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage touched={touched.code} errors={errors.code} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                  justifyContent: "center",
                }}
              >
                <BoxButton
                  color={"#0B4F26"}
                  //   loading={loading}
                  type="submit"
                  containerStyle={{ height: "35px", width: "100%" }}
                  isSelected={true}
                  title={"Submit"}
                />
                <BoxButton
                  color={"#E32A2A"}
                  containerStyle={{
                    background: "#E32A2A",
                    border: "0px",
                    height: "35px",
                    width: "100%",
                  }}
                  onClick={() => {
                    setOpen(false);
                  }}
                  isSelected={true}
                  title={"Cancel"}
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default memo(ChangeDeleteCode);
