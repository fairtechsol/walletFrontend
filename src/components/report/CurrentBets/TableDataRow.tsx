import { Box, Typography } from "@mui/material";
import moment from "moment";

const TableDataRow = (props: any) => {
  const { containerStyle, data, fContainerStyle, fTextStyle, index } = props;
  let flag = index % 2 != 0;
  let no = (index + 1).toString();
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={[
          {
            width: "3%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "45px",
            background: "black",
            borderRight: "2px solid white",
          },
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: "12px",
              fontWeight: "600",
              color: "white",
              textAlign: "center",
            },
          ]}
        >
          {(no > 9 ? "" : "0") + no}
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "12%",
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          fContainerStyle,
        ]}
      >
        <Typography sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}>
          {data.EventType}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#ECECEC" : "#FFE094",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          {data.EventName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#ECECEC" : "#FFE094",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          {data.userName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          background: data.BetType === "yes" ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {data.Team}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          background: data.BetType === "yes" ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {data.BetType}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "7%",
          display: "flex",
          background: data.BetType === "yes" ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {data.UserRate}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          justifyContent: "center",
          background: data.BetType === "yes" ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {data.bet_type}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          paddingLeft: "10px",
          background: data.BetType === "yes" ? "#FFB5B5" : "#A7DCFF",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {data.Amount}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
          justifyContent: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: flag ? "#ECECEC" : "#FFE094",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.PlaceDate).format("DD-MM-YYYY")}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.PlaceDate).format("HH:mm A")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "11%",
          display: "flex",
          paddingLeft: "10px",
          flexDirection: "column",
          justifyContent: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: flag ? "#ECECEC" : "#FFE094",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.MatchDate).format("DD-MM-YYYY")}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
          {moment(data.MatchDate).format("HH:mm A")}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableDataRow;
