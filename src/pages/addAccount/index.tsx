import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import Input from "../../components/login/Input";
import { EyeIcon, EyeSlash } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import BoxButtonWithSwitch from "../../components/Common/BoxButtonWithSwitch";
import { AddAccountInterface } from "../../interface/addAccount";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { addUserValidation } from "../../utils/Validations";
import { AppDispatch, RootState } from "../../store/store";
import { addUser, updateUser } from "../../store/actions/user/userAction";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import SelectField from "../../components/Common/DropDown/SelectField";
import service from "../../service";

const AccountTypes = [
  { value: "fairGameAdmin", label: "Fairgame Admin" },
  { value: "superUrlAdmin", label: "URL Super Admin" },
  { value: "superAdmin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "superMaster", label: "Super Master" },
  { value: "master", label: "Master" },
  { value: "expert", label: "Expert" },
  { value: "user", label: "User" },
];

const MatchCommissionTypes = [
  { value: "0.00", label: "0.00" },
  { value: "totalLoss", label: "Total Loss" },
  { value: "betLoss", label: "Entry Wise" },
];

const formDataSchema = {
  userName: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  city: "",
  phoneNumber: "",
  domain: "",
  roleName: {
    label: "",
    value: "",
  },
  creditReference: "",
  uplinePartnership: 10,
  myPartnership: 0,
  downlinePartnership: 90,
  matchCommissionType: {
    label: "",
    value: "",
  },
  matchCommission: {
    label: "",
    value: "",
  },
  sessionCommission: {
    label: "",
    value: "",
  },
  remarks: "",
  adminTransPassword: "",
  //expert access
  session: false,
  bookmaker: false,
};

const AddAccount = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState<AddAccountInterface>(formDataSchema);
  const { userRole } = useSelector((state: RootState) => state.auth);

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

  const { loading } = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: formDataSchema,
    validationSchema: addUserValidation,
    onSubmit: (values: any) => {
      navigate("/wallet/list_of_clients");
      if (state?.id) {
        dispatch(
          updateUser({
            sessionCommission: formik.values.sessionCommission.value,
            matchComissionType: formik.values.matchComissionType.value,
            matchCommission: formik.values.matchCommission.value,
            id: state?.id,
          })
        );
        navigate("/wallet/list_of_clients");
      } else {
        let payload: any;
        if (values.roleName.value == "fairGameAdmin") {
          payload = {
            userName: values.userName,
            fullName: values.fullName,
            password: values.password,
            confirmPassword: values.confirmPassword,
            phoneNumber: JSON.stringify(values.phoneNumber),
            city: values.city,
            roleName: values.roleName.value,
            myPartnership: values.myPartnership,
            creditRefrence: values.creditRefrence,
            exposureLimit: values.exposureLimit,
            maxBetLimit: values.maxBetLimit,
            minBetLimit: values.minBetLimit,
          };
        } else if (values.roleName.value == "expert") {
          payload = {
            userName: values.userName,
            fullName: values.fullName,
            password: values.password,
            confirmPassword: values.confirmPassword,
            phoneNumber: JSON.stringify(values.phoneNumber),
            city: values.city,
            roleName: values.roleName.value,
            myPartnership: values.myPartnership,
            creditRefrence: values.creditRefrence,
            exposureLimit: values.exposureLimit,
          };
        }
        dispatch(addUser(payload));
        navigate("/wallet/list_of_clients");
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const handlePartnershipChange = (event: any) => {
    try {
      const newValue = parseInt(event.target.value, 10);
      const remainingDownline = 90 - newValue;

      formik.setValues({
        ...formik.values,
        myPartnership: newValue,
        downlinePartnership: remainingDownline,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  let matchComissionArray = [];

  for (let i = 0.0; i <= 2.0; i += 0.25) {
    if (formik.values.matchCommissionType.label === "0.00") {
      matchComissionArray = [];
      break;
    } else if (formik.values.matchCommissionType.label === "Total Loss") {
      matchComissionArray.push({ label: i?.toFixed(2), value: i?.toFixed(2) });
    } else {
      if (i <= 1.5) {
        matchComissionArray.push({
          label: i?.toFixed(2),
          value: i?.toFixed(2),
        });
      } else break;
    }
  }

  const sessionComissionArray = [];
  for (let i = 0.0; i <= 3.5; i += 0.25) {
    sessionComissionArray.push({ label: i?.toFixed(2), value: i?.toFixed(2) });
  }

  const getUsersDetailById = async (id: string) => {
    try {
      const resp = await service.get(`/user/profile?userId=${id}`);
      if (resp) {
        const childUserDetail = resp?.data[0][0];
        if (childUserDetail) {
          formik.setValues({
            ...formik.values,
            userName: childUserDetail?.userName,
            fullName: childUserDetail?.fullName,
            city: childUserDetail?.city,
            phoneNumber: JSON.parse(childUserDetail?.phoneNumber),
            roleName: {
              label: childUserDetail?.roleName,
              value: childUserDetail?.roleName,
            },
            creditReference: childUserDetail?.creditRefrence,
            uplinePartnership: childUserDetail?.fwPartnership,
            myPartnership: 0,
            downlinePartnership: childUserDetail?.faPartnership,
            matchCommissionType: {
              label: childUserDetail?.matchComissionType,
              value: childUserDetail?.matchComissionType,
            },
            matchCommission: {
              label: childUserDetail?.matchCommission,
              value: childUserDetail?.matchCommission,
            },
            sessionCommission: {
              label: childUserDetail?.sessionCommission,
              value: childUserDetail?.sessionCommission,
            },
            remarks: "",
            adminTransPassword: "",
            session: false,
            bookmaker: false,
          });
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (state?.id) {
        getUsersDetailById(state?.id);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  return (
    <>
      {loading && <Loader />}
      <Box sx={{ margin: "1%" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            marginLeft: "4px",
          }}
        >
          {state?.id ? "Edit" : "Add"} Account
        </Typography>
        <form style={{ marginTop: "1%" }} onSubmit={handleSubmit}>
          <Box
            sx={{
              background: "#F8C851",
              minHeight: "60vh",
              borderRadius: "5px",
              padding: "16px",
              paddingTop: "3px",
              marginTop: "2px",
              display: "flex",
              flexDirection: { xs: "column", lg: "row", md: "row" },
              width: "100%",
              gap: { xs: 0, lg: 5, md: 4 },
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  gridTemplateColumns: "auto auto",
                  gridColumnGap: "10px",
                }}
              >
                <div>
                  <Input
                    id={"userName"}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    disabled={state?.id}
                    placeholder={"Username (Required)"}
                    title={"Username*"}
                    name={"userName"}
                    type={"text"}
                    required={true}
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                  />
                </div>
                {touched.userName && errors.userName && (
                  <p style={{ color: "#fa1e1e" }}>
                    {errors.userName as string}
                  </p>
                )}
                <div>
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
                    disabled={state?.id}
                    title={"User Password*"}
                    name={"password"}
                    id={"password"}
                    type={"password"}
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />{" "}
                </div>
                {touched.password && errors.password && (
                  <p style={{ color: "#fa1e1e" }}>
                    {errors.password as string}
                  </p>
                )}
                <div>
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
                    disabled={state?.id}
                    title={"Confirm User Password*"}
                    name={"confirmPassword"}
                    id={"confirmPassword"}
                    type={"password"}
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p style={{ color: "#fa1e1e" }}>
                    {errors.confirmPassword as string}
                  </p>
                )}
                <div>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"Fullname"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    disabled={state?.id}
                    title={"Fullname"}
                    name={"fullName"}
                    id="fullName"
                    type={"text"}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"City"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    disabled={state?.id}
                    title={"City"}
                    name={"city"}
                    id="city"
                    type={"text"}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"Mobile"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    disabled={state?.id}
                    title={"Mobile Number"}
                    name={"phoneNumber"}
                    id="phoneNumber"
                    type={"text"}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                </div>
                {userRole === "superUrlAdmin" && (
                  <div>
                    <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      placeholder={"Domain"}
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
                      disabled={state?.id}
                      title={"Domain"}
                      name={"domain"}
                      type={"text"}
                      id="domain"
                      value={formik.values.domain}
                      onChange={formik.handleChange}
                    />
                  </div>
                )}
              </Box>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "block" },
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <div>
                  <SelectField
                    id="roleName"
                    name="roleName"
                    label={"Account Type*"}
                    options={AccountTypes}
                    onChange={(AccountTypes: any) => {
                      formik.setFieldValue("roleName", AccountTypes);
                    }}
                    isDisabled={state?.id}
                    onBlur={formik.handleBlur}
                    value={AccountTypes.find(
                      (option: any) =>
                        option.value === formik.values.roleName.value
                    )}
                    touched={touched.roleName}
                    error={errors.roleName}
                  />
                </div>
                {formik.values.roleName.value === "expert" && (
                  <>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <BoxButtonWithSwitch
                            title="Session"
                            name={"session"}
                            showLockUnlock={false}
                            val={formData.session}
                            setLockUnlockObj={setFormData}
                            lockUnlockObj={formData}
                          />
                        </Grid>
                        <Grid item xs={6} md={12} lg={6}>
                          <BoxButtonWithSwitch
                            title="Bookmaker"
                            name={"bookmaker"}
                            val={formData.bookmaker}
                            setLockUnlockObj={setFormData}
                            lockUnlockObj={formData}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
                {formik?.values?.roleName?.value !== "expert" && (
                  <div>
                    <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
                      disabled={state?.id}
                      title={"Credit Reference*"}
                      name={"creditReference"}
                      type={"Number"}
                      id="creditReference"
                      value={formik.values.creditReference}
                      onChange={formik.handleChange}
                    />
                  </div>
                )}
              </Box>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  containerStyle={{
                    ...containerStyles,
                    display:
                      formik.values?.roleName?.value === "user"
                        ? "none"
                        : "block",
                  }}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor: "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  title={"Upline Partnership"}
                  name={"uplinePartnership"}
                  id={"uplinePartnership"}
                  type={"text"}
                  disabled={true}
                  value={formik.values.uplinePartnership}
                  onChange={formik.handleChange}
                />
                <Input
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor:
                      formik.values?.roleName?.value === "user" && "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  containerStyle={{
                    ...containerStyles,
                    display:
                      formik.values?.roleName?.value === "user"
                        ? "none"
                        : "block",
                  }}
                  disabled={state?.id}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  title={"My Partnership"}
                  name={"myPartnership"}
                  id={"myPartnership"}
                  type={"Number"}
                  value={formik.values.myPartnership}
                  onChange={handlePartnershipChange}
                />
              </Box>
              <Input
                containerStyle={{
                  ...containerStyles,
                  display:
                    formik.values?.roleName?.value === "user"
                      ? "none"
                      : "block",
                }}
                titleStyle={titleStyles}
                inputStyle={inputStyle}
                disabled={true}
                inputContainerStyle={{
                  backgroundColor: "#DEDEDE",
                  ...inputContainerStyle,
                  height: { lg: "45px", xs: "36px" },
                }}
                title={"Downline partnership"}
                name={"downlinePartnership"}
                id={"downlinePartnership"}
                type={"Number"}
                value={formik.values.downlinePartnership}
                onChange={formik.handleChange}
              />

              {formik?.values?.roleName?.value !== "expert" && (
                <>
                  <Box
                    sx={{
                      display: {
                        lg: "block",
                        md: "grid",
                        xs: "grid",
                      },
                      gridTemplateColumns: "50% 47%",
                      gridColumnGap: "10px",
                    }}
                  >
                    <SelectField
                      id="matchCommissionType"
                      name="matchCommissionType"
                      label={"Match Commission Type"}
                      options={MatchCommissionTypes}
                      onChange={(MatchCommissionTypes: any) => {
                        formik.setFieldValue(
                          "matchCommissionType",
                          MatchCommissionTypes
                        );
                      }}
                      onBlur={formik.handleBlur}
                      value={MatchCommissionTypes.find(
                        (option: any) =>
                          option.value ===
                          formik.values.matchCommissionType.value
                      )}
                      touched={touched.matchCommissionType}
                      error={errors.matchCommissionType}
                    />
                    {formik.values.matchCommissionType.label !== "" &&
                      formik.values.matchCommissionType.label !== "0.00" && (
                        <>
                          <SelectField
                            id={"matchCommission"}
                            name={"matchCommission"}
                            label={"Match Commission (%)*"}
                            options={matchComissionArray}
                            value={matchComissionArray.find((option: any) => {
                              option.value ===
                                formik.values.matchCommission.value;
                            })}
                            onChange={(matchComissionArray: any) => {
                              formik.setFieldValue(
                                "matchCommission",
                                matchComissionArray
                              );
                            }}
                            onBlur={formik.handleBlur}
                            touched={touched.matchCommission}
                            error={errors.matchCommission}
                          />
                        </>
                      )}

                    <SelectField
                      id={"sessionCommission"}
                      name={"sessionCommission"}
                      label={"Session Commission (%)*"}
                      options={sessionComissionArray}
                      value={sessionComissionArray.find((option: any) => {
                        option.value === formik.values.sessionCommission.value;
                      })}
                      onChange={(sessionComissionArray: any) => {
                        formik.setFieldValue(
                          "sessionCommission",
                          sessionComissionArray
                        );
                      }}
                      onBlur={formik.handleBlur}
                      touched={touched.sessionCommission}
                      error={errors.sessionCommission}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{ flex: 2 }} className="addAccountRemark">
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputProps={{
                    multiline: true,
                    rows: matches ? 2 : 10,
                  }}
                  placeholder={"Remark (Optional)"}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "205px", xs: "70px" },
                    width: "100%",
                  }}
                  disabled={state?.id}
                  title={"Remark"}
                  name={"remarks"}
                  id={"remarks"}
                  type={"text"}
                  value={formik.values.remarks}
                  onChange={formik.handleChange}
                />
                <div>
                  <Input
                    containerStyle={{ ...containerStyles, width: "100%" }}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    inputContainerStyle={{ ...inputContainerStyle }}
                    title={"Admin Transaction Password*"}
                    name={"adminTransPassword"}
                    id={"adminTransPassword"}
                    type={"password"}
                    placeholder={"Ex : 12345"}
                    required={true}
                    value={formik.values.adminTransPassword}
                    onChange={formik.handleChange}
                  />
                </div>
              </Box>
              <Button
                disabled={false}
                className="cursor-pointer"
                sx={{
                  background: "#0B4F26",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  border: "2px solid black",
                  alignItems: "center",
                  borderRadius: "5px",
                  height: "45px",
                  marginTop: { xs: "12px", lg: "35px" },
                  color: "white",
                  fontSize: "18px",

                  "&:hover": {
                    background: "#0B4F26",
                  },
                }}
                type="submit"
              >
                {state?.id ? "Update" : "Create"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddAccount;
