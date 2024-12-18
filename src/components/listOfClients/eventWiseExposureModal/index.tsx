import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  getUserWiseExposure,
  resetUserWiseExposureList,
} from "../../../store/actions/user/userAction";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const EventWiseExposureModal = ({
  setShowUserWiseExposureModal,
  userName,
  userId,
  domain,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { userWiseExposureList } = useSelector(
    (state: RootState) => state.user.userList
  );

  useEffect(() => {
    dispatch(
      getUserWiseExposure(domain ? `${userId}?domain=${domain}` : userId)
    );
    return () => {
      dispatch(resetUserWiseExposureList());
    };
  }, []);
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
            height: "100%",
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
                    minHeight: "200px",
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
                        {userName} EventWise Exposure
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
                        setShowUserWiseExposureModal(false);
                      }}
                    >
                      &times;
                    </Typography>
                  </Box>
                </Box>
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
                        User
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#fff",
                          borderRight: "1px solid #fff",
                          fontSize: "1rem",
                        }}
                      >
                        Profit/Loss
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(userWiseExposureList || {}).map(
                      ([key, value]: any) => (
                        <TableRow key={value}>
                          <TableCell
                            sx={{
                              color: "#fff",
                              borderRight: "1px solid #fff",
                            }}
                          >
                            {key}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#fff",
                              borderRight: "1px solid #fff",
                            }}
                          >
                            {value}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Box>
            </>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EventWiseExposureModal;
