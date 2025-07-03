import { Button, Typography } from "@mui/material";
import { memo } from "react";

interface DeleteBetButtonProps {
  type: any;
  title: any;
}

const DeleteBetButton = ({ type, title }: DeleteBetButtonProps) => {
  return (
    <Button
      type={type}
      sx={{
        width: "200px",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        height: "35px",
        background: "#0B4F26",
        alignSelf: "end",
        marginRight: "10px",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#0B4F26" },
      }}
    >
      <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "600" }}>
        {title}
      </Typography>
    </Button>
  );
};

export default memo(DeleteBetButton);
