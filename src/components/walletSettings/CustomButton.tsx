import { Button, Typography } from "@mui/material";

interface CustomButtonProps {
  color: string;
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const CustomButton = ({ color, title, onClick, type }: CustomButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      sx={{
        width: "45%",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: color,
        borderRadius: "5px",
        marginTop: "16px",
        "&:hover": {
          background: color,
        },
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default CustomButton;
