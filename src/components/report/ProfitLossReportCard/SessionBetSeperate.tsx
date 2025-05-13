import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import { ARROWUP, DeleteIcon } from "../../../assets";
import { formatToINR } from "../../../helper";
import StyledImage from "../../Common/StyledImages";
import RowComponent from "./RowComponent";

interface SessionBetSeperateProps {
  allBetsData: any[];
}

const SessionBetSeperate = ({ allBetsData }: SessionBetSeperateProps) => {
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={[
        {
          width: { md: "100%", xs: "100%", lg: "100%" },
          display: "flex",
          flexDirection: "column",
          marginX: { lg: "0vw", xs: "0px", md: "0px" },
          marginY: { lg: ".5vh", xs: "2px" },
          marginTop: { xs: "0" },
          borderRadius: "2px",
          background: "white",
          padding: "1px",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
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
            Session Bets: {allBetsData?.length < 10 ? 0 : ""}
            {allBetsData?.length || 0}
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
              data={["Matched Bet", "Username", "Odds", "Yes/No", "Stake"]}
            />
            <Box
              sx={{
                height: "25px",
                width: "30%",
                display: "flex",
                background: "#319E5B",
                justifyContent: "center",
                alignItems: "center",
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
            {allBetsData?.map((i: any, k: any) => {
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
                      marginBottom: { xs: "1px", lg: "1px" },
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
                  {i?.deleteReason && (
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          display: "flex",
                          lg: "100% ",
                        },
                        background: "rgba(0, 0, 0, 0.6)",
                        height: "45px",
                        position: "absolute",
                      }}
                    >
                      <Box sx={{ width: "35%" }} />
                    </Box>
                  )}
                  {!i?.deleteReason && (
                    <Box
                      sx={{
                        height: "40px",
                        width: "30%",
                        background: i.totalLoss > 0 ? "#10DC61" : "#E32A2A",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: "10px",
                          height: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "11px", lg: "14px" },
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
                      </Box>
                    </Box>
                  )}
                  {i?.deleteReason && (
                    <Box
                      sx={{
                        height: "40px",
                        width: "30%",
                        margin: { xs: "1px", lg: "1px" },
                        display: "flex",
                        background: "black",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingX: "2px",
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
                        Due {"\n"}
                        {i?.deleteReason}
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
  );
};

export default memo(SessionBetSeperate);
