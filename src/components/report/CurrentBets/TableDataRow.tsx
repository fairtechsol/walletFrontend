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
            width: "5%",
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
            width: "10%",
            display: "flex",
            paddingLeft: "10px",
            paddingRight: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          fContainerStyle,
        ]}
      >
        <Typography sx={[{ fontSize: { xs: "8px", md: "9px", lg: "12px" }, fontWeight: "600" }, fTextStyle]}>
          {data?.eventType}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#ECECEC" : "#FFE094",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "600", color: "black", lineHeight: "0.9" }}
        >
          {data?.eventName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          display: "flex",
          paddingLeft: "10px",
          background: flag ? "#ECECEC" : "#FFE094",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "600", color: "black" }}
        >
          {data?.user?.userName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          display: "flex",
          paddingLeft: "10px",
          background:
            data?.betType === "YES" || data?.betType === "BACK"
              ? "#A7DCFF"
              : "#FFB5B5",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "600", lineHeight: "0.9", color: "#575757" }}
        >
          {data?.teamName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          display: "flex",
          paddingLeft: "6px",
          justifyContent: "center",
          background:
            data?.betType === "YES" || data?.betType === "BACK"
            ? "#A7DCFF"
            : "#FFB5B5",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "600", color: "#575757",  overflowWrap: "anywhere"}}
        >
          {data?.bettingName ?? data?.marketType}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "7%",
          display: "flex",
          background:
            data?.betType === "YES" || data?.betType === "BACK"
            ? "#A7DCFF"
            : "#FFB5B5",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "700", color: "#575757" }}
        >
          {data?.odds}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          justifyContent: "center",
          background:
            data?.betType === "YES" || data?.betType === "BACK"
            ? "#A7DCFF"
            : "#FFB5B5",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "700", color: "#575757" }}
        >
          {data?.betType}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "10px",
          background:
            data?.betType === "YES" || data?.betType === "BACK"
            ? "#A7DCFF"
            : "#FFB5B5",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "13px" },   display: "flex", fontWeight: "700", color: "#575757" , lineHeight: "0.9", justifyContent: "center"}}
        >
          {data?.amount}
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
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "700", color: "#575757", lineHeight: {sx: "0" , lg: "1.9" },letterSpacing: "0.1em", }}
        >
          {moment(data?.createdAt).format("DD-MM-YYYY")}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "700", color: "#575757", lineHeight: "0.9" }}
        >
          {moment(data?.createdAt).format("HH:mm:ss A")}
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
        <Typography
          sx={{ fontSize: { xs: "9px", md: "9px", lg: "12px" }, fontWeight: "900", color: "#575757", lineHeight: {sx: "0" , lg: "1.9" },letterSpacing: "0.1em", }}
        >
          {moment(data?.match?.startAt).format("DD-MM-YYYY")}
        </Typography>
        <Typography
          sx={{ fontSize:{ xs: "9px", md: "9px", lg: "12px" }, fontWeight: "900", color: "#575757", lineHeight: "0.9" }}
        >
          {moment(data?.match?.startAt).format("HH:mm A")}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableDataRow;
