import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Input from "../../components/login/Input";
import { EyeIcon, EyeSlash } from "../../assets";
import { useLocation } from "react-router-dom";
import DropDown from "../../components/Common/DropDown";

const AddAccount = () => {
  const { state } = useLocation();
  const [showMatchCommision] = useState(false);
  const typeToShow = [
    "Select account type",
    "Fairgame Admin",
    "Super Admin",
    "Admin",
    "Super Master",
    "Expert",
    "Master",
    "User",
  ];

  const defaultDropDownValues = {
    
  }
  const [selected, setSelected] = useState(typeToShow[0]);
  const [selectedDropdown, setSelectedDropdown] = useState(defaultDropDownValues)
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

  const matchComissionArray = ["0.25"];

  const sessionComissionArray = [];
  for (let i = 0; i <= 3.5; i += 0.25) {
    sessionComissionArray.push(i?.toFixed(2));
  }

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
        <form
          //   ref={formRef}
          style={{ marginTop: "1%" }}
          onSubmit={(e: any) => {
            e?.preventDefault();
          }}
        >
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
              // flexWrap:"wrap",
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  // grid-template-columns: auto auto auto;
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
                    place={1}
                    required={true}
                    toFoucs={true}
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
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    place={2}
                    toFoucs={true}
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
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    place={3}
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
                    place={4}
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
                    place={5}
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
                    place={6}
                    type={"Number"}
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
                    setSelected={setSelected}
                    data={typeToShow}
                    dropDownTextStyle={inputStyle}
                    place={9}
                  />
                </div>
                {selected !== "Expert" && (
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
                      //   setDetail={setDetail}
                      required={true}
                      //   Detail={Detail}
                      //   setError={setError}
                      //   error={error}
                      place={8}
                      //   onKeyDown={(event) => {
                      //     if (
                      //       event.code === "Space" ||
                      //       (!(event.key >= "0" && event.key <= "9") &&
                      //         event.key !== "Backspace" &&
                      //         event.code !== "ArrowUp" &&
                      //         event.code !== "ArrowDown" &&
                      //         event.code !== "Enter" &&
                      //         event.code !== "Tab" && // Allow Tab key
                      //         event.code !== "ArrowRight" && // Allow Right Arrow key
                      //         event.code !== "ArrowLeft" &&
                      //         event.code !== "Delete")
                      //     ) {
                      //       event.preventDefault();
                      //     }
                      //   }}
                      type={"Number"}
                    />
                    {/* {error[8]?.val && (
                      <p style={{ color: "#fa1e1e" }}>{error[8]?.val}</p>
                    )} */}
                  </div>
                )}
              </Box>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  containerStyle={{
                    ...containerStyles,
                    display: selected === "User" ? "none" : "block",
                  }}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor: "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  title={"Upline Partnership"}
                  disabled={true}
                  place={10}
                />
                <Input
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor: selected === "User" && "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  containerStyle={{
                    ...containerStyles,
                    display: selected === "User" ? "none" : "block",
                  }}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  title={"My Partnership"}
                  toFoucs={true}
                  max={100}
                  required={true}
                  place={11}
                  type={"Number"}
                />
              </Box>
              <Input
                containerStyle={{
                  ...containerStyles,
                  display: selected === "User" ? "none" : "block",
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
                place={12}
                type={"Number"}
              />

              {selected !== "Expert" && (
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
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                      }}
                      dropDownTextStyle={{ ...inputStyle, lineHeight: 1 }}
                      place={17}
                    />
                    {false && (
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
                          dropDownStyle={{
                            width: "100%",
                            marginLeft: "0px",
                            marginTop: "0px",
                            position: "absolute",
                            maxHeight: "210px",
                            overflow: "scroll",
                          }}
                          place={18}
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
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                        maxHeight: "210px",
                        overflow: "scroll",
                      }}
                      dropDownTextStyle={{ ...inputStyle }}
                      place={16}
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
                    rows: { lg: 10, xs: 2 },
                  }}
                  placeholder={"Remark (Optional)"}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "205px", xs: "70px" },
                    width: "100%",
                  }}
                  title={"Remark"}
                  place={13}
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
                    placeholder={"Ex : 12345"}
                    required={true}
                    place={14}
                    toFoucs={true}
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
                Create
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
