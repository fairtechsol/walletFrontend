import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import { memo, useState } from "react";
import { ARROWDOWN, ARROWUP, ARROW_UP, DeleteIcon } from "../../../assets";
import { formatToINR, stripUrl } from "../../../helper";
import StyledImage from "../../Common/StyledImages";

const AllRateSeperate = ({
  profit,
  mark,
  mark2,
  allBetsData,
  count,
  betHistory,
  isArrow,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Box
        sx={[
          {
            width: { md: "100%", xs: "100%", lg: "100%" },
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            marginX: { lg: "0vw", xs: "0px", md: "0px" },
            marginY: { lg: ".5vh", xs: "2px" },
            marginTop: { xs: "0" },
            marginBottom: { lg: ".5vh", xs: "2px" },
            borderRadius: "2px",
            background: "white",
            padding: "1px",
            // alignSelf: {
            //   xs: "center",
            //   md: "center",
            //   lg: "flex-start",
            // },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "13px", md: "10px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              All Rate Bets: {count < 10 ? 0 : ""}
              {count || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <Box className="slanted" />
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              onClick={() => {
                setVisible(!visible);
              }}
              src={ARROWUP}
              style={{
                transform: visible ? "rotate(180deg)" : "rotate(0deg)",
                width: "15px",
                height: "15px",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            />
          </Box>
        </Box>
        {visible && (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
              <Box
                sx={{
                  height: "25px",
                  width: "30px",
                  display: "flex",
                  background: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontWeight: "400", fontSize: "10px", color: "white" }}
                >
                  {"No"}
                </Typography>
              </Box>
              <RowComponent
                header={true}
                data={[
                  "Market",
                  "Username",
                  "Favourite",
                  "Type",
                  "Odds",
                  "Stake",
                ]}
              />

              {profit && (
                <Box
                  sx={{
                    height: "25px",
                    width: "12%",
                    display: "flex",
                    background: "#319E5B",
                    justifyContent: "center",
                    alignItems: "center",
                    // margin: { xs: "1px", lg: "0" },
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "10px", lg: ".7vw" },
                      color: "white",
                    }}
                  >
                    {matchesMobile ? "P/L" : "Profit Loss"}
                  </Typography>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                maxHeight: { xs: "200px", lg: "420px" },
                overflowY: "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {[
                ...new Set(
                  allBetsData?.filter(
                    (v: any) =>
                      v.betType === "BACK" ||
                      v.betType === "LAY" ||
                      v.betType === "NO" ||
                      v.betType === "YES"
                  )
                ),
              ]?.map((i: any, k: any) => {
                const num = allBetsData.length - k;
                const formattedNum = num < 10 ? "0" + num : num.toString();
                return (
                  <Box
                    key={k}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                      gap: "1px",
                    }}
                  >
                    <Box
                      sx={{
                        height: "40px",
                        width: "30px",
                        display: "flex",
                        background: "black",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "10px",
                          fontWeight: "500",
                        }}
                      >
                        {formattedNum}
                      </Typography>
                    </Box>
                    <RowComponent header={false} data={i} />
                    {i?.deleteReason && betHistory && (
                      <Box
                        sx={{
                          width: {
                            xs: profit ? "100%" : "100%",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            display: "flex",
                            lg: profit ? "100 % " : "100% ",
                          },
                          background: "rgba(0, 0, 0, 0.6)",
                          height: "100%",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "20%" : "35%" }} />
                      </Box>
                    )}
                    {i?.deleteReason && betHistory === undefined && (
                      <Box
                        sx={{
                          width: {
                            xs: profit ? "100%" : "100%",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            display: "flex",
                            lg: profit ? "100 % " : "100% ",
                          },
                          background: "rgba(0, 0, 0, 0.5)",
                          height: "42px",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "20%" : "35%" }} />
                        <Box
                          sx={{
                            width: mark2 ? "80%" : "65%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            alignSelf: "flex-end",
                          }}
                        >
                          {mark && (
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: "700",
                                color: "white",
                                textTransform: "uppercase",
                              }}
                            >
                              Bet{" "}
                              <span style={{ color: "#e41b23" }}>deleted</span>{" "}
                              due to ${i?.deleteReason}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                    {i?.deleteReason && profit && (
                      <Box
                        sx={{
                          width: {
                            xs: profit ? "100%" : "100%",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            display: "flex",
                            lg: profit ? "100 % " : "100% ",
                          },
                          background: "rgba(0, 0, 0, 0.6)",
                          height: "100%",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: mark2 ? "20%" : "35%" }} />
                      </Box>
                    )}
                    {profit && !i?.deleteReason && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "12%",
                          background: i?.totalLoss > 0 ? "#10DC61" : "#E32A2A",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "100%",
                            px: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: "9px", lg: "14px" },
                              color: "white",
                              fontWeight: "700",
                            }}
                          >
                            {Number(i.totalLoss) >= 0 ? (
                              <>
                                <span style={{ visibility: "hidden" }}>-</span>
                                {formatToINR(Number(i.totalLoss).toFixed(2))}
                              </>
                            ) : (
                              formatToINR(Number(i.totalLoss).toFixed(2))
                            )}
                          </Typography>

                          {!matchesMobile && !isArrow && (
                            <StyledImage
                              sx={{
                                width: { xs: "12px", lg: "15px" },
                                height: { xs: "5px", lg: "7px" },
                              }}
                              src={i?.totalLoss > 0 ? ARROW_UP : ARROWDOWN}
                            />
                          )}
                        </Box>
                      </Box>
                    )}
                    {profit && i?.deleteReason && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "12%",
                          display: "flex",
                          background: "black",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 999,
                        }}
                      >
                        <StyledImage
                          sx={{
                            width: { xs: "15px", lg: "20px" },
                            height: { lg: "20px", xs: "14px" },
                            marginRight: "5px",
                          }}
                          src={DeleteIcon}
                        />
                        <Typography
                          sx={{
                            fontSize: { xs: "7px", lg: ".5vw" },
                            color: "white",
                            fontWeight: "700",
                            width: { lg: "65%", xs: "55%" },
                            textTransform: "uppercase",
                          }}
                        >
                          Bet <span style={{ color: "#e41b23" }}>Deleted</span>{" "}
                          Due {"\n"} {i?.deleteReason}
                        </Typography>
                      </Box>
                    )}
                    {i?.deleteReason && betHistory && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "30%",
                          // margin: { xs: "1px", lg: "1px" },
                          display: "flex",
                          // background: "black",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 999,
                          position: "absolute",
                          right: 0,
                        }}
                      >
                        <StyledImage
                          sx={{
                            width: { xs: "15px", lg: "20px" },
                            height: { lg: "20px", xs: "14px" },
                            marginRight: "5px",
                          }}
                          src={DeleteIcon}
                        />
                        <Typography
                          sx={{
                            fontSize: { xs: "7px", lg: ".5vw" },
                            color: "white",
                            fontWeight: "700",
                            width: { lg: "65%", xs: "55%" },
                            textTransform: "uppercase",
                          }}
                        >
                          Bet <span style={{ color: "#e41b23" }}>Deleted</span>{" "}
                          Due {"\n"} {i?.deleteReason}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Box>

      {/* --------- */}
      <style>
        {`
                /* width */
                .myScroll::-webkit-scrollbar {
                  width: 0px;
                }

                /* Track */
                .myScroll::-webkit-scrollbar-track {
                  background: #f1f1f1;
                }

                /* Handle */
                .myScroll::-webkit-scrollbar-thumb {
                  background: #888;
                }

                /* Handle on hover */
                .myScroll::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
              `}
      </style>
    </>
  );
};

const RowComponent = ({ header, data }: any) => {
  const getTime = (date: any) => {
    const timeString = moment
      .utc(date)
      .utcOffset("+05:30")
      .format("DD-MM-YYYY hh:mm:ss A");
    return timeString;
  };
  const getColor = () => {
    if (header) {
      return "black";
    } else if (data?.betType === "BACK" || data?.betType === "YES") {
      return "#CEEBFF";
    } else if (data?.betType === "LAY" || data?.betType === "NO") {
      return "#F2CBCB";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: header ? "25px" : "40px",
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        gap: "1px",
        marginBottom: { xs: "1px", lg: "1px" },
      }}
    >
      {!header && (
        <>
          <SingleBox
            color={getColor}
            data={data?.bettingName ?? data?.marketType}
            first={true}
            header={header}
          />
          <SingleBox
            color={getColor()}
            data={data?.username || data?.userName || data?.user?.userName}
            domain={data?.domain}
            header={header}
            boxWidth="100%"
            down={true}
          />
          <SingleBox
            color={getColor()}
            data={data}
            up={true}
            header={header}
            time={getTime(data.createdAt)}
          />
          <SingleBox
            color={getColor()}
            data={data?.bet_type || data?.betType}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={formatToINR(data?.amount || 0)}
            header={header}
            width={"50%"}
            boxWidth="40%"
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[1]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[2]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[3]}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data[4]}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data[5]}
            header={header}
            boxWidth="40%"
          />
        </>
      )}
    </Box>
  );
};

const SingleBox = ({
  data,
  header,
  color,
  up,
  down,
  domain,
  first,
  time,
  width,
  boxWidth,
}: any) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: width ? width : "100%",
          height: "40px",
          background: "#F1C550",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data === "Bookmaker" ? (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "8px", md: "10px", lg: ".5vw" },
              color: "black",
              textAlign: "center",
            }}
          >
            {data}
          </Typography>
        ) : (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "8px", md: "10px", lg: "0.8vw" },
              color: "black",
              textAlign: "center",
              maxHeight: "2em",
              overflow: "hidden",
              lineHeight: 1,
            }}
          >
            {data}
          </Typography>
        )}
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { lg: "11px", md: "9px", xs: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "12px", md: "10px", xs: "10px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
          }}
        >
          {data.teamName}
        </Typography>
      </Box>
    ) : down ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "12px", md: "10px", xs: "10px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
          }}
        >
          {data}
        </Typography>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { lg: "11px", md: "9px", xs: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {stripUrl(domain)}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: boxWidth,
          height: "40px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: {
              xs: "10px",
              md: "10px",
              lg: "12px",
              textTransform: "capitalize",
            },
            color: "black",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  ) : (
    header && (
      <Box
        sx={{
          width: boxWidth,
          height: "25px",
          background: "#319E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { lg: ".7vw", xs: "10px" },
            color: "white",
            flexWrap: "wrap",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  );
};
export default memo(AllRateSeperate);
