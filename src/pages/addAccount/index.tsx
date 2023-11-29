import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Input from "../../components/login/Input";
import { EyeIcon, EyeSlash } from "../../assets";
import { useLocation } from "react-router-dom";
import DropDown from "../../components/Common/DropDown";

const typeToShow = [
  "Select account type",
  "Fairgame Admin",
  "URL Super Admin",
  "Super Admin",
  "Admin",
  "Super Master",
  "Master",
  "Expert",
  "User",
];

const formDataSchema = {
  userName: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  city: "",
  number: "",
  accountType: "",
  creditReference: "",
  uplinePartnership: "",
  myPartnership: "",
  downlinePartnership: "",
  matchCommissionType: "",
  matchCommission: "",
  sessionCommission: "",
  remarks: "",
  adminTransPassword: "",
};

const AddAccount = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const [formData, setFormData] = useState(formDataSchema);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [showMatchCommision] = useState(false);

  const containerStyles = {
    marginTop: { xs: "2px", lg: "10px" },
  };
  const selectValueStyle = {
    fontSize: { xs: "2px", lg: "10px" },
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

  const matchComissionArray = ["0.00", "0.25"];

  const sessionComissionArray = [];
  for (let i = 0; i <= 3.5; i += 0.25) {
    sessionComissionArray.push(i?.toFixed(2));
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
  };

  return (
    <>
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
                <div style={{ order: 1 }}>
                  <Input
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
                    toFoucs={true}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ order: 3 }}>
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
                    type={"password"}
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    toFoucs={true}
                    onChange={handleChange}
                  />{" "}
                </div>
                <div style={{ order: 5 }}>
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
                    type={"password"}
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ order: 2 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"Fullname (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"Fullname"}
                    name={"fullName"}
                    type={"text"}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ order: 4 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"City (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"City"}
                    name={"city"}
                    type={"text"}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ order: 6 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"Mobile (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"Mobile Number"}
                    name={"number"}
                    type={"Number"}
                    onChange={handleChange}
                  />
                </div>
              </Box>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <div style={{ order: 2 }}>
                  <DropDown
                    dropStyle={{
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                    }}
                    valueStyle={{ ...inputStyle, color: "white" }}
                    title={"Account Type*"}
                    name={"accountType"}
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
                {formData?.accountType !== "Expert" && (
                  <div style={{ order: 1 }}>
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
                      // required={true}
                      type={"Number"}
                      onChange={handleChange}
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
                      formData?.accountType === "User" ? "none" : "block",
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
                  type={"text"}
                  disabled={true}
                  onChange={handleChange}
                />
                <Input
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor:
                      formData?.accountType === "User" && "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  containerStyle={{
                    ...containerStyles,
                    display:
                      formData?.accountType === "User" ? "none" : "block",
                  }}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  title={"My Partnership"}
                  name={"myPartnership"}
                  toFoucs={true}
                  max={100}
                  // required={true}
                  type={"Number"}
                  onChange={handleChange}
                />
              </Box>
              <Input
                containerStyle={{
                  ...containerStyles,
                  display: formData?.accountType === "User" ? "none" : "block",
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
                type={"Number"}
                onChange={handleChange}
              />

              {formData?.accountType !== "Expert" && (
                <>
                  <Box
                    sx={{
                      display: {
                        lg: "block",
                        md: "grid",
                        xs: "grid",
                      },
                      // grid-template-columns: auto auto auto;
                      gridTemplateColumns: "50% 47%",
                      gridColumnGap: "10px",
                    }}
                  >
                    <DropDown
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      valueStyle={{ ...inputStyle, color: "white" }}
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
                            valueStyle={{ ...inputStyle, color: "white" }}
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
                      valueStyle={{ ...inputStyle, color: "white" }}
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
                      selectValueStyle={{
                        selectValueStyle,
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{ flex: 2 }} className="addAccountRemark">
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  // grid-template-columns: auto auto auto;
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
                  type={"text"}
                  onChange={handleChange}
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
                    type={"password"}
                    placeholder={"Ex : 12345"}
                    required={true}
                    toFoucs={true}
                    onChange={handleChange}
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
        {/* {errorShow ===
          "User need to first create the transaction password." && (
          <Button
            className="cursor-pointer"
            sx={{
              background: "#0B4F26",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              border: "2px solid black",
              alignItems: "center",
              borderRadius: "5px",
              height: "45px",
              marginTop: "35px",
              color: "white",
              fontSize: "18px",
            }}
            onClick={(e) => {
              navigate(
                `/${window.location.pathname.split("/")[1]}/createTransPassword`
              );
            }}
          >
            Create Trans Password
          </Button>
        )} */}
      </Box>
      {/* {showSuccessModal && (
        <Modal
          message={successShow}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          activeTab={"Client list"}
          navigateTo={"list_of_clients"}
        />
      )} */}

      {/* <style jsx="true" scoped>
        {`
          @media only screen and (max-width: 575px) {
            .addAccountRemark textarea {
              height: 60px !important;
            }
            .validCommon {
              font-size: 12px;
              line-height: 16px;
            }
          }
        `}
      </style> */}
    </>
  );
};

export default AddAccount;
