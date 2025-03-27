import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography } from "@mui/material";
import { DeleteIcon } from "../../../assets";

const DeleteEditComp = ({
  mode,
  setMode,
  setPermanentDeletePopShow,
  setVisible,
  setVisibleEdit,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      {mode.value && (
        <Box
          onClick={() => {
            setMode((prev: any) => {
              return {
                ...prev,
                type: "",
                value: !mode.value,
              };
            });
          }}
          sx={{
            width: "150px",
            marginY: ".75%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            background: "#f1c550",
            height: "35px",
            border: "1.5px solid white",
            display: "flex",
            alignSelf: "flex-end",
            cursor: "pointer",
          }}
        >
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "13px",
              color: "black",
              marginRight: "10px",
            }}
          >
            {"Cancel"}
          </Typography>
        </Box>
      )}
      {!["edit", "delete"].includes(mode?.type) && mode.value && (
        <>
          <Box sx={{ width: "2%" }}></Box>
          <Box
            onClick={() => {
              setPermanentDeletePopShow(true);
            }}
            sx={{
              width: "150px",
              marginY: ".75%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              background: "#E32A2A",
              height: "35px",
              border: "1.5px solid white",
              display: "flex",
              alignSelf: "flex-end",
              cursor: "pointer",
            }}
          >
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "13px",
                color: "white",
                marginRight: "10px",
              }}
            >
              {"Delete"}
            </Typography>
            <img src={DeleteIcon} style={{ width: "17px", height: "20px" }} />
          </Box>
        </>
      )}
      {!["edit", "deletePermanent"].includes(mode?.type) && (
        <>
          <Box sx={{ width: "2%" }}></Box>
          <Box
            onClick={() => {
              if (mode.value && mode?.type === "delete") {
                setVisible(true);
              } else {
                setMode((prev: any) => {
                  return {
                    ...prev,
                    type: "delete",
                    value: !mode.value,
                  };
                });
              }
            }}
            sx={{
              width: "150px",
              marginY: ".75%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              background: "#E32A2A",
              height: "35px",
              border: "1.5px solid white",
              display: "flex",
              alignSelf: "flex-end",
              cursor: "pointer",
            }}
          >
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "13px",
                color: "white",
                marginRight: "10px",
              }}
            >
              {!mode.value ? "Delete Bet" : "Delete"}
            </Typography>
            <img src={DeleteIcon} style={{ width: "17px", height: "20px" }} />
          </Box>
        </>
      )}
      {!["delete", "deletePermanent"].includes(mode?.type) && (
        <>
          <Box sx={{ width: "2%" }}></Box>
          <Box
            onClick={() => {
              if (mode.value && mode?.type === "edit") {
                setVisibleEdit(true);
              } else {
                setMode((prev: any) => {
                  return {
                    ...prev,
                    type: "edit",
                    value: !mode.value,
                  };
                });
              }
            }}
            sx={{
              width: "150px",
              marginY: ".75%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              background: "#004A25",
              height: "35px",
              border: "1.5px solid white",
              display: "flex",
              alignSelf: "flex-end",
              cursor: "pointer",
            }}
          >
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "13px",
                color: "white",
                marginRight: "10px",
              }}
            >
              {!mode.value ? "Edit Reason" : "Edit"}
            </Typography>
            <EditOutlinedIcon
              fontSize="small"
              sx={{
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DeleteEditComp;
