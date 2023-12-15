import {
  Box,
  Button,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { EyeIcon, EyeSlash } from "../../assets";
import BoxButtonWithSwitch from "../../components/Common/BoxButtonWithSwitch";
import SelectField from "../../components/Common/DropDown/SelectField";
import Loader from "../../components/Loader";
import Input from "../../components/login/Input";
import { AppDispatch, RootState } from "../../store/store";
import { addUserValidation } from "../../utils/Validations";
import {
  addExpert,
  addUrlAdmin,
  addUser,
  getUsersDetail,
  updateReset,
  updateUser,
} from "../../store/actions/user/userAction";

// const AccountTypes = [
//   { value: "fairGameAdmin", label: "Fairgame Admin", level: 1 },
//   { value: "superUrlAdmin", label: "URL Super Admin", level: 2 },
//   { value: "superAdmin", label: "Super Admin", level: 3 },
//   { value: "admin", label: "Admin", level: 4 },
//   { value: "superMaster", label: "Super Master", level: 5 },
//   { value: "master", label: "Master", level: 6 },
//   { value: "user", label: "User", level: 8 },
// ];

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
  logo: "",
  sidebarColor: "",
  headerColor: "",
  footerColor: "",
};

const defaultLockUnlockObj = {
  allPrivilege: false,
  addMatchPrivilege: false,
  betFairMatchPrivilege: false,
  bookmakerMatchPrivilege: false,
  sessionMatchPrivilege: false,
};

const AddAccount = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { state, pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  const [AccountTypes, setAccountTypes] = useState<any>([]);
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { success, loading, userDetail } = useSelector(
    (state: RootState) => state.user.userUpdate
  );

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

  const formik = useFormik({
    initialValues: formDataSchema,
    validationSchema: addUserValidation,
    onSubmit: (values: any) => {
      const commonPayload = {
        userName: values.userName,
        fullName: values.fullName,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phoneNumber: values.phoneNumber,
        city: values.city,
        myPartnership: values.myPartnership,
      };

      let payload;
      if (values.roleName.value === "expert") {
        payload = {
          ...commonPayload,
          roleName: values.roleName.value,
          transactionPassword: values.adminTransPassword,
          allPrivilege: lockUnlockObj.allPrivilege,
          addMatchPrivilege: lockUnlockObj.addMatchPrivilege,
          betFairMatchPrivilege: lockUnlockObj.betFairMatchPrivilege,
          bookmakerMatchPrivilege: lockUnlockObj.bookmakerMatchPrivilege,
          sessionMatchPrivilege: lockUnlockObj.sessionMatchPrivilege,
        };
        dispatch(addExpert(payload));
      } else if (values.roleName.value === "superUrlAdmin") {
        payload = {
          ...commonPayload,
          roleName: values.roleName.value,
          domain: values.domain,
          logo: values.logo,
          sidebarColor: values.sidebarColor,
          headerColor: values.headerColor,
          footerColor: values.footerColor,
          transactionPassword: values.adminTransPassword,
        };
        dispatch(addUrlAdmin(payload));
      } else {
        payload = {
          ...commonPayload,
          roleName: values.roleName.value,
          creditRefrence: values.creditRefrence,
          exposureLimit: values.exposureLimit,
          maxBetLimit: values.maxBetLimit,
          minBetLimit: values.minBetLimit,
        };
        dispatch(addUser(payload));
      }

      if (state?.id) {
        dispatch(
          updateUser({
            sessionCommission: values.sessionCommission.value,
            matchComissionType: values.matchComissionType.value,
            matchCommission: values.matchCommission.value,
            id: state?.id,
          })
        );
      }
      dispatch(updateReset());
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

  const setTypeForAccountType = () => {
    try {
      const roleName = profileDetail?.roleName;

      const accountTypeMap: any = {
        fairGameWallet: [{ value: "fairGameAdmin", label: "Fairgame Admin" }],
        fairGameAdmin: [
          { value: "superUrlAdmin", label: "URL Super Admin" },
          { value: "expert", label: "Expert" },
        ],
      };

      setAccountTypes(accountTypeMap[roleName] || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setTypeForAccountType();
  }, [profileDetail, state?.id]);

  useEffect(() => {
    try {
      if (state?.id) {
        dispatch(getUsersDetail(state?.id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  useEffect(() => {
    if (pathname.includes("add_account")) {
      formik.resetForm();
      setLockUnlockObj(defaultLockUnlockObj);
    } else if (success) {
      formik.setValues({
        ...formik.values,
        userName: userDetail?.userName,
        fullName: userDetail?.fullName,
        city: userDetail?.city,
        phoneNumber: userDetail?.phoneNumber,
        roleName: {
          label: userDetail?.roleName,
          value: userDetail?.roleName,
        },
        creditReference: userDetail?.creditRefrence,
        uplinePartnership: userDetail?.fwPartnership,
        myPartnership: 0,
        downlinePartnership: userDetail?.faPartnership,
        matchCommissionType: {
          label: userDetail?.matchComissionType,
          value: userDetail?.matchComissionType,
        },
        matchCommission: {
          label: userDetail?.matchCommission,
          value: userDetail?.matchCommission,
        },
        sessionCommission: {
          label: userDetail?.sessionCommission,
          value: userDetail?.sessionCommission,
        },
        remarks: "",
        adminTransPassword: "",
      });
      setLockUnlockObj({
        allPrivilege: userDetail?.allPrivilege,
        addMatchPrivilege: userDetail?.addMatchPrivilege,
        betFairMatchPrivilege: userDetail?.betFairMatchPrivilege,
        bookmakerMatchPrivilege: userDetail?.bookmakerMatchPrivilege,
        sessionMatchPrivilege: userDetail?.sessionMatchPrivilege,
      });
    }
  }, [loading, pathname]);

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
                    disabled={state?.id ? true : false}
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
                    disabled={state?.id ? true : false}
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
                    disabled={state?.id ? true : false}
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
                    disabled={state?.id ? true : false}
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
                    disabled={state?.id ? true : false}
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
                    disabled={state?.id ? true : false}
                    title={"Mobile Number"}
                    name={"phoneNumber"}
                    id="phoneNumber"
                    type={"text"}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik?.values?.roleName?.value === "superUrlAdmin" && (
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
                      disabled={state?.id ? true : false}
                      title={"Domain"}
                      name={"domain"}
                      type={"text"}
                      id="domain"
                      value={formik.values.domain}
                      onChange={formik.handleChange}
                    />
                    <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      placeholder={"logo"}
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
                      disabled={state?.id ? true : false}
                      title={"Logo"}
                      name="logo"
                      type={"text"}
                      id="logo"
                      value={formik.values.logo}
                      onChange={formik.handleChange}
                    />
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <InputLabel htmlFor="sidebarColor">
                            Sidebar Color:{" "}
                          </InputLabel>
                          <input
                            type="color"
                            id="sidebarColor"
                            name={"sidebarColor"}
                            value={formik.values.sidebarColor}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={6} md={12} lg={6}>
                          <InputLabel htmlFor="headerColor">
                            Header Color:{" "}
                          </InputLabel>
                          <input
                            type="color"
                            id="headerColor"
                            name={"headerColor"}
                            value={formik.values.headerColor}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <InputLabel htmlFor="footerColor">
                            Footer Color:{" "}
                          </InputLabel>
                          <input
                            type="color"
                            id="footerColor"
                            name={"footerColor"}
                            value={formik.values.footerColor}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
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
                <Box sx={{ mt: -1 }}>
                  <SelectField
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    id="roleName"
                    name="roleName"
                    isSearchable={false}
                    label={"Account Type*"}
                    options={AccountTypes}
                    defaultValue={"Select..."}
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
                </Box>
                {formik.values.roleName.value === "expert" && (
                  <>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <BoxButtonWithSwitch
                            title="All Privilege"
                            name="allPrivilege"
                            showLockUnlock={false}
                            val={lockUnlockObj?.allPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                        <Grid item xs={6} md={12} lg={6}>
                          <BoxButtonWithSwitch
                            title="Add Match Privilege"
                            name="addMatchPrivilege"
                            val={lockUnlockObj?.addMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <BoxButtonWithSwitch
                            title="BetFair Match Privilege"
                            name="betFairMatchPrivilege"
                            showLockUnlock={false}
                            val={lockUnlockObj?.betFairMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                        <Grid item xs={6} md={12} lg={6}>
                          <BoxButtonWithSwitch
                            title="Bookmaker Match Privilege"
                            name="bookmakerMatchPrivilege"
                            val={lockUnlockObj?.bookmakerMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <BoxButtonWithSwitch
                            title="Session Match Privilege"
                            name="sessionMatchPrivilege"
                            showLockUnlock={false}
                            val={lockUnlockObj?.sessionMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
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
                      disabled={state?.id ? true : false}
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
                  disabled={state?.id ? true : false}
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

              {formik?.values?.roleName?.value !== "expert" &&
                formik?.values?.roleName?.value === "fairGameAdmin" && (
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
                        containerStyle={containerStyles}
                        titleStyle={titleStyles}
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
                              containerStyle={containerStyles}
                              titleStyle={titleStyles}
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
                        containerStyle={containerStyles}
                        titleStyle={titleStyles}
                        id={"sessionCommission"}
                        name={"sessionCommission"}
                        label={"Session Commission (%)*"}
                        options={sessionComissionArray}
                        value={sessionComissionArray.find((option: any) => {
                          option.value ===
                            formik.values.sessionCommission.value;
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
