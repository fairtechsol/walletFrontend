import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { formatToINR } from "../../../helper";
import { Constants } from "../../../utils/Constants";


interface EventWiseMatchListModalProps {
  setShowUserWiseMatchListModal: (value: {
    status: boolean;
    value: any;
    matchType: string;
  }) => void;
  userName: string;
  data: any;
  userId: string;
  matchType: string;
  domain: string;
  roleName: string;
}

const EventWiseMatchListModal: React.FC<EventWiseMatchListModalProps> = ({
  setShowUserWiseMatchListModal,
  userName,
  data,
  userId,
  matchType,
  domain,
  roleName,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              alignSelf: "center",
              width: { xs: "90%", lg: "90%" },
            }}
          >
            <>
              <Box
                sx={[
                  {
                    width: { xs: "96%", lg: "100%", md: "100%" },
                    // minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    borderBottomRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    overflow: "hidden",
                    border: "2px solid white",
                  },
                  (theme: any) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`,
                  }),
                ]}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    display={"flex"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      px: "10px",
                      py: "6px",
                      backgroundColor: "#F8C851",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems="center"
                      sx={{ alignItems: "center" }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "14px",
                            lg: "18px",
                            md: "18px",
                          },
                          color: "#000",
                          marginRight: {
                            xs: "10px",
                            lg: "20px",
                            md: "20px",
                          },
                        }}
                      >
                        {userName} Match Wise Exposure
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserWiseMatchListModal({
                          status: false,
                          value: {},
                          matchType: "",
                        });
                      }}
                    >
                      &times;
                    </Typography>
                  </Box>
                </Box>
                <TableContainer sx={{ maxHeight: 600 }}>
                  <Table
                    sx={{
                      minWidth: 300,
                      border: "1px solid #ddd",
                      backgroundColor: "#0B4F26",
                    }}
                    aria-label="Profit/Loss Table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#fff",
                            borderRight: "1px solid #fff",
                            fontSize: "1rem",
                          }}
                        >
                          Match Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#fff",
                            borderRight: "1px solid #fff",
                            fontSize: "1rem",
                          }}
                        >
                          Exposure
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(data || {}).map(([key, value]: any) => (
                        <TableRow
                          sx={{
                            cursor: "pointer",
                          }}
                          key={key}
                          onClick={() => {
                            if (matchType === "virtual") {
                              return;
                            }
                            if (matchType !== "card") {
                              navigate(
                                `/${Constants.wallet}/market_analysis/matches`,
                                {
                                  state: {
                                    submit: true,
                                    matchId: key,
                                    userId: userId,
                                    matchType: matchType,
                                    domain: domain,
                                    roleName: roleName,
                                  },
                                }
                              );
                            }
                          }}
                        >
                          <TableCell
                            sx={{
                              color: "#fff",
                              borderRight: "1px solid #fff",
                            }}
                          >
                            {value?.name}
                            {value?.type ? ` (${value?.type})` : ""}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#fff",
                              borderRight: "1px solid #fff",
                            }}
                          >
                            {formatToINR(value?.exposure || 0)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(EventWiseMatchListModal);
