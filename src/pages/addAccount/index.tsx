import { Box, Typography, Button } from "@mui/material";
import Input from "../../components/login/Input";
import { EyeIcon, EyeSlash } from "../../assets";

const AddAccount = () => {
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
  const imputStyle = {
    fontSize: { xs: "10px", lg: "14px", fontWeight: "600" },
  };
  const inputContainerStyle = {
    borderRadius: "5px",
    border: "1px solid #DEDEDE",
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
          Add Account
        </Typography>
        <form
          //   ref={formRef}
          style={{ marginTop: "1%" }}
          onSubmit={(e: any) => {
            e?.preventDefault();
            // function checkValues(data) {
            //   for (const key in data) {
            //     if (data.hasOwnProperty(key)) {
            //       const value = data[key].val;
            //       if (value !== "" && value !== false) {
            //         return true;
            //       }
            //     }
            //   }
            //   return false;
            // }
            // if (checkValues(error)) {
            //   toast.error("Fields Required");
            //   return false;
            // }
            // addAccount();
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
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                        ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    placeholder={"Username (Required)"}
                    title={"Username*"}
                    // setDetail={setDetail}
                    // onKeyDown={(event) => {
                    //   if (event.code === "Space") {
                    //     event.preventDefault();
                    //   } else {
                    //     const regex = /^[a-zA-Z0-9]*$/;

                    //     if (!regex.test(event.key)) {
                    //       event.preventDefault();
                    //     }
                    //   }
                    // }}
                    // Detail={Detail}
                    // setError={setError}
                    // error={error}
                    place={1}
                    required={true}
                    // onFocusOut={checkUserName}
                    toFoucs={true}
                  />
                  {/* {error[1].val && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      {userAlreadyExist
                        ? userAlreadyExist
                        : error[1].val || "Field Required"}
                    </p>
                  )} */}
                </div>
                <div style={{ order: 3 }}>
                  <Input
                    containerStyle={containerStyles}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                        ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"User Password*"}
                    placeholder={"Ex : Abc@12"}
                    // setDetail={setDetail}
                    // Detail={Detail}
                    required={true}
                    // onKeyDown={(event) => {
                    //   if (event.code === "Space") {
                    //     event.preventDefault();
                    //   }
                    // }}
                    // setError={setError}
                    // error={error}
                    place={2}
                    // onFocusOut={doSendErrorForPassword}
                    toFoucs={true}
                  />{" "}
                  {/* {error[2].val && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      {error[2].val}
                    </p>
                  )} */}
                </div>
                {/** handleError={handleError} checkMesasge={true} */}
                <div style={{ order: 5 }}>
                  <Input
                    // onKeyDown={(event) => {
                    //   if (event.code === "Space") {
                    //     event.preventDefault();
                    //   }
                    // }}
                    containerStyle={containerStyles}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                        ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"Confirm User Password*"}
                    placeholder={"Ex : Abc@12"}
                    // setDetail={setDetail}
                    required={true}
                    // Detail={Detail}
                    // setError={setError}
                    // error={error}
                    place={3}
                  />
                  {/* {Detail[2]?.val !== Detail[3]?.val && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      Password Doesn't Match
                    </p>
                  )} */}
                </div>
                <div style={{ order: 2 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"Fullname (Optional)"}
                    inputContainerStyle={{
                        ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"Fullname"}
                    // setDetail={setDetail}
                    // Detail={Detail}
                    // setError={setError}
                    // error={error}
                    place={4}
                  />
                </div>
                <div style={{ order: 4 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"City (Optional)"}
                    inputContainerStyle={{
                        ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"City"}
                    // setDetail={setDetail}
                    // Detail={Detail}
                    // setError={setError}
                    // error={error}
                    place={5}
                  />
                </div>
                <div style={{ order: 6 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"Mobile (Optional)"}
                    inputContainerStyle={{
                        ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"Mobile Number"}
                    // setDetail={setDetail}
                    // Detail={Detail}
                    // setError={setError}
                    // error={error}
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
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <div style={{ order: 2 }}>
                  {/* <DropDownSimple
                    dropStyle={{
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                    }}
                    valueStyle={{ ...imputStyle, color: "white" }}
                    title={"Account Type*"}
                    valueContainerStyle={{
                      height: "45px",
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
                    data={typeToShow}
                    dropDownStyle={{
                      width: "100%",
                      marginLeft: "0px",
                      marginTop: "0px",
                      position: "absolute",
                    }}
                    dropDownTextStyle={imputStyle}
                    Detail={Detail}
                    setDetail={setDetail}
                    place={9}
                  /> */}
                  {/* {error[9]?.val && Detail[9]?.val === "" && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      Field Required
                    </p>
                  )} */}
                </div>
                {/* {Detail[9].val !== "expert" && ( */}
                <div style={{ order: 1 }}>
                  <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={imputStyle}
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
                {/* )} */}
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
                  containerStyle={
                    {
                      ...containerStyles,
                      // display: Detail[9].val === "user" ? "none" : "block",
                    }
                  }
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor: "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  title={"Upline Partnership"}
                  //   setDetail={setDetail}
                  //   Detail={Detail}
                  //   setError={setError}
                  //   error={error}
                  disabled={true}
                  place={10}
                  //   autoMaticFillValue={`${Detail[10]?.val}`}
                />
                {/* {error[10].val && (
                  <p style={{ color: "#fa1e1e" }}>Field Required</p>
                )} */}

                {/* {Detail[9].val === "user" ? ( */}
                {/* <InputMyPartnership
                    inputContainerStyle={{
                    //   ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    containerStyle={{
                      ...containerStyles,
                    //   display: Detail[9].val === "user" ? "none" : "block",
                    }}
                    // titleStyle={titleStyles}
                    // inputStyle={imputStyle}
                    title={"My Partnership 1"}
                    // setDetail={setDetail}
                    // onFocusOut={CheckThisPosition}
                    toFoucs={true}
                    min={0}
                    max={100}
                    disabled={Detail[9].val === "user"}
                    // setDownlinePar={setDownlinePar}
                    // Detail={Detail}
                    // value={Detail[11].val}
                    // placeholder={Detail[11].val}
                    // setError={setError}
                    // error={error}
                    place={11}
                    required={true}
                    type={"Number"}
                  /> */}
                {/* ) : ( */}
                <Input
                  inputContainerStyle={{
                      ...inputContainerStyle,
                    //   backgroundColor: Detail[9].val === "user" && "#DEDEDE",
                    height: { lg: "45px", xs: "36px" },
                  }}
                  containerStyle={
                    {
                        ...containerStyles,
                      //   display: Detail[9].val === "user" ? "none" : "block",
                    }
                  }
                  titleStyle={titleStyles}
                  inputStyle={imputStyle}
                  title={"My Partnership"}
                  // setDetail={setDetail}
                  // onFocusOut={CheckThisPosition}
                  toFoucs={true}
                  // min={0}
                  // setMypar={(val) => setMypar(val)}
                  max={100}
                  // setDownlinePar={setDownlinePar}
                  // Detail={Detail}
                  // placeholder={Detail[11].val}
                  // setError={setError}
                  required={true}
                  // error={error}
                  place={11}
                  type={"Number"}
                  // onKeyDown={(event) => {
                  //   if (
                  //     event.code === "Space" ||
                  //     (!(event.key >= "0" && event.key <= "9") &&
                  //       event.key !== "Backspace" &&
                  //       event.code !== "ArrowUp" &&
                  //       event.code !== "ArrowDown" &&
                  //       event.code !== "Enter" &&
                  //       event.code !== "Tab" && // Allow Tab key
                  //       event.code !== "ArrowRight" && // Allow Right Arrow key
                  //       event.code !== "ArrowLeft" &&
                  //       event.code !== "Delete")
                  //   ) {
                  //     event.preventDefault();
                  //   }
                  // }}
                />
                {/* )} */}

                {/* {myPartnershipsError && (
                  <p style={{ color: "#fa1e1e" }}>
                    sum of upline , downline and my partnership should be not
                    exceeding 100.
                  </p>
                )} */}

                {/* {error[11]?.val !== "" && (
                  <p style={{ color: "#fa1e1e" }}>{error[11]?.val}</p>
                )} */}
              </Box>
              <Input
                containerStyle={
                  {
                      ...containerStyles,
                    //   display: Detail[9].val === "user" ? "none" : "block",
                  }
                }
                titleStyle={titleStyles}
                inputStyle={imputStyle}
                disabled={true}
                inputContainerStyle={{
                  backgroundColor: "#DEDEDE",
                  //   ...inputContainerStyle,
                  height: { lg: "45px", xs: "36px" },
                }}
                title={"Downline partnership"}
                // setDetail={setDetail}
                // Detail={Detail}
                // setError={setError}
                // error={error}
                place={12}
                type={"Number"}
                // placeholder={Detail[12].val}
                // autoMaticFillValue={Detail[12].val}
              />
              {/* {error[12]?.val && (
                <p className="validCommon" style={{ color: "#fa1e1e" }}>
                  Field Required
                </p>
              )} */}

              {/* {Detail[9].val !== "expert" && (
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
                    <DropDownSimple
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      valueStyle={{ ...imputStyle, color: "white" }}
                      title={"Match Commission Type"}
                      valueContainerStyle={{
                        height: "45px",
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
                      dropDownTextStyle={{ ...imputStyle, lineHeight: 1 }}
                      Detail={Detail}
                      setDetail={setDetail}
                      place={17}
                    />
                    {error[17]?.val && (
                      <p className="validCommon" style={{ color: "#fa1e1e" }}>
                        Field Required
                      </p>
                    )}
                    {Detail[17].val !== null && Detail[17].val !== "0.00" && (
                      <>
                        <DropDownSimple
                          openDrop={showMatchCommision}
                          defaultValue={"0.00"}
                          dropStyle={{
                            filter:
                              "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                          }}
                          valueStyle={{ ...imputStyle, color: "white" }}
                          title={"Match Commission (%)*"}
                          valueContainerStyle={{
                            height: "45px",
                            marginX: "0px",

                            background: "#0B4F26",
                            border: "1px solid #DEDEDE",
                            borderRadius: "5px",
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
                          Detail={Detail}
                          setDetail={setDetail}
                          place={18}
                        />
                        {error[18].val && (
                          <p
                            className="validCommon"
                            style={{ color: "#fa1e1e" }}
                          >
                            Field Required
                          </p>
                        )}
                      </>
                    )}

                    <DropDownSimple
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      valueStyle={{ ...imputStyle, color: "white" }}
                      title={"Session Commission (%)"}
                      valueContainerStyle={{
                        height: "45px",
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
                      dropDownTextStyle={{ ...imputStyle }}
                      Detail={Detail}
                      setDetail={setDetail}
                      place={16}
                      selectValueStyle={{
                        selectValueStyle,
                      }}
                    />

                    {error[16]?.val && (
                      <p className="validCommon" style={{ color: "#fa1e1e" }}>
                        Field Required
                      </p>
                    )}
                  </Box>
                </>
              )} */}
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
                    inputStyle={imputStyle}
                  inputProps={{
                    multiline: true,
                    rows: 10,
                    // rows: { lg: 10, xs: 2 },
                  }}
                  placeholder={"Remark (Optional)"}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "205px", xs: "70px" },
                    width: "100%",
                  }}
                  title={"Remark"}
                  //   setDetail={setDetail}
                  //   Detail={Detail}
                  //   setError={setError}
                  //   error={error}
                  place={13}
                />
                <div>
                  <Input
                    containerStyle={{ ...containerStyles, width: "100%" }}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{ ...inputContainerStyle }}
                    title={"Admin Transaction Password*"}
                    // onKeyDown={(event) => {
                    //   if (
                    //     event.code === "Space" ||
                    //     (!(event.key >= "0" && event.key <= "9") &&
                    //       event.key !== "Backspace")
                    //   ) {
                    //     event.preventDefault();
                    //   }
                    // }}
                    placeholder={"Ex : 12345"}
                    required={true}
                    // setDetail={setDetail}
                    // Detail={Detail}
                    // setError={setError}
                    // error={error}
                    place={14}
                    // onFocusOut={handleTransPass}
                    toFoucs={true}
                    // onKeyDown={handleEnterKey}
                    // okButtonRef={okButtonRef}
                    // onKeyDown={(e) => handleEnterKey(e, okButtonRef)}
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

              {/* {errorShow && !successShow && (
                <p style={{ color: "#fa1e1e" }}>{errorShow}</p>
              )} */}
              {/* {successShow && <p style={{ color: "#0B4F26" }}>{successShow}</p>} */}
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
