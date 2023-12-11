import { useState } from "react";
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
import DropDown from "../../components/Common/DropDown";
import BoxButtonWithSwitch from "../../components/Common/BoxButtonWithSwitch";
import { AddAccountInterface } from "../../interface/addAccount";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { addUserValidation } from "../../utils/Validations";
import { AppDispatch, RootState } from "../../store/store";
import { addUser } from "../../store/actions/user/userAction";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";

const typeToShow = [
  "Select account type",
  "Fairgame Admin",
  "URL Super Admin",
  "Super Admin",
  "Admin",
  "Super Master",
  "Master",
  // "Expert",
  "User",
];

// const roles = [
//   { role: "fairGameAdmin", val: "Fairgame Admin", level: 1 },
//   { role: "superAdmin", val: "Super Admin", level: 2 },
//   { role: "admin", val: "Admin", level: 3 },
//   { role: "superMaster", val: "Super Master", level: 4 },
//   { role: "master", val: "Master", level: 5 },
//   { role: "user", val: "User", level: 7 },
// ];

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
  uplinePartnership: "",
  myPartnership: "",
  downlinePartnership: "",
  matchCommissionType: "",
  matchCommission: "",
  sessionCommission: "",
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
  const [showMatchCommision] = useState(false);
  const [role] = useState("fairGameWallet");

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

  const matchComissionTypes = ["0.00", "Total Loss", "Entry Wise"];

  let matchComissionArray = [];

  for (let i = 0.0; i <= 2.0; i += 0.25) {
    if (formData.matchCommissionType === "0.00") {
      matchComissionArray = [];
      break;
    } else if (formData.matchCommissionType === "Total Loss") {
      matchComissionArray.push(i?.toFixed(2));
    } else {
      if (i <= 1.5) {
        matchComissionArray.push(i?.toFixed(2));
      } else break;
    }
  }

  const sessionComissionArray = [];
  for (let i = 0.0; i <= 3.5; i += 0.25) {
    sessionComissionArray.push(i?.toFixed(2));
  }

  const { success, loading } = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: formDataSchema,
    validationSchema: addUserValidation,
    onSubmit: (values: any) => {
      // if (values.roleName.value == "fairGameAdmin") {
      let payload: any = {
        userName: values.userName,
        fullName: values.fullName,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phoneNumber: JSON.stringify(values.phoneNumber),
        city: values.city,
        roleName: "fairGameAdmin",
        myPartnership: values.myPartnership,
        creditRefrence: values.creditRefrence,
        exposureLimit: values.exposureLimit,
        maxBetLimit: values.maxBetLimit,
        minBetLimit: values.minBetLimit,
      };
      dispatch(addUser(payload));
      // }
      if (success) {
        navigate("/wallet/list_of_clients");
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;

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
                    title={"Mobile Number"}
                    name={"phoneNumber"}
                    id="phoneNumber"
                    type={"text"}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                </div>
                {role === "superUrlAdmin" && (
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
                  <DropDown
                    dropStyle={{
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                    }}
                    title={"Account Type*"}
                    name={"roleName"}
                    id="roleName"
                    valueContainerStyle={{
                      marginX: "0px",
                      background: "#0B4F26",
                      border: "1px solid #DEDEDE",
                      borderRadius: "5px",
                      height: { lg: "45px", xs: "36px" },
                    }}
                    containerStyle={{
                      width: "100%",
                      position: "relative",
                      marginTop: "5px",
                    }}
                    titleStyle={{ marginLeft: "0px" }}
                    dropDownStyle={{
                      width: "100%",
                      marginLeft: "0px",
                      marginTop: "0px",
                      position: "absolute",
                    }}
                    setSelected={setFormData}
                    data={typeToShow}
                    dropDownTextStyle={inputStyle}
                  />
                </div>
                {formData?.roleName.label === "Expert" && (
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
                {formData?.roleName?.label !== "Expert" && (
                  <div>
                    <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
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
                      formData?.roleName?.label === "User" ? "none" : "block",
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
                      formData?.roleName?.label === "User" && "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  containerStyle={{
                    ...containerStyles,
                    display:
                      formData?.roleName?.label === "User" ? "none" : "block",
                  }}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  title={"My Partnership"}
                  name={"myPartnership"}
                  id={"myPartnership"}
                  type={"Number"}
                  value={formik.values.myPartnership}
                  onChange={formik.handleChange}
                />
              </Box>
              <Input
                containerStyle={{
                  ...containerStyles,
                  display:
                    formData?.roleName?.label === "User" ? "none" : "block",
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

              {formData?.roleName?.label !== "Expert" && (
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
                    <DropDown
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      title={"Match Commission Type"}
                      name={"matchCommissionType"}
                      valueContainerStyle={{
                        marginX: "0px",
                        background: "#0B4F26",
                        border: "1px solid #DEDEDE",
                        borderRadius: "5px",
                        height: { lg: "45px", xs: "36px" },
                      }}
                      containerStyle={{
                        width: "100%",
                        position: "relative",
                        marginTop: "10px",
                      }}
                      titleStyle={{ marginLeft: "0px" }}
                      data={matchComissionTypes}
                      setSelected={setFormData}
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                      }}
                      dropDownTextStyle={{ ...inputStyle, lineHeight: 1 }}
                    />
                    {formData.matchCommissionType !== "" &&
                      formData.matchCommissionType !== "0.00" && (
                        <>
                          <DropDown
                            openDrop={showMatchCommision}
                            defaultValue={"0.00"}
                            dropStyle={{
                              filter:
                                "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                            }}
                            title={"Match Commission (%)*"}
                            name={"matchCommission"}
                            valueContainerStyle={{
                              marginX: "0px",
                              background: "#0B4F26",
                              border: "1px solid #DEDEDE",
                              borderRadius: "5px",
                              height: { lg: "45px", xs: "36px" },
                            }}
                            containerStyle={{
                              width: "100%",
                              position: "relative",
                              marginTop: "10px",
                            }}
                            titleStyle={{ marginLeft: "0px" }}
                            data={matchComissionArray}
                            setSelected={setFormData}
                            dropDownStyle={{
                              width: "100%",
                              marginLeft: "0px",
                              marginTop: "0px",
                              position: "absolute",
                              maxHeight: "210px",
                              overflow: "scroll",
                            }}
                          />
                        </>
                      )}

                    <DropDown
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      title={"Session Commission (%)"}
                      name={"sessionCommission"}
                      valueContainerStyle={{
                        marginX: "0px",
                        background: "#0B4F26",
                        border: "1px solid #DEDEDE",
                        borderRadius: "5px",
                        height: { lg: "45px", xs: "36px" },
                      }}
                      containerStyle={{
                        width: "100%",
                        position: "relative",
                        marginTop: "10px",
                      }}
                      titleStyle={{ marginLeft: "0px" }}
                      data={sessionComissionArray}
                      setSelected={setFormData}
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                        maxHeight: "210px",
                        overflow: "scroll",
                      }}
                      dropDownTextStyle={{ ...inputStyle }}
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
