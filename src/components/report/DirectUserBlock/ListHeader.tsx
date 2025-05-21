import { Box, Button, Typography } from "@mui/material";

interface ListHeaderModalProps {
  title: string;
  setShow: () => void;
}

const ListHeaderModal = ({ title, setShow }: ListHeaderModalProps) => {
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: "10px",
        height: "100%",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Typography
          sx={{
            fontSize: { xs: "14px", lg: "18px", md: "18px" },
            fontWeight: "500",
            color: "#000",
            textTransform: "capitalize",
            marginRight: { xs: "10px", lg: "20px", md: "20px" },
          }}
        >
          {title}
        </Typography>
      </Box>

      <Button
        sx={{ color: "", fontSize: "30px", padding: 0 }}
        onClick={setShow}
      >
        &times;
      </Button>
    </Box>
  );
};

export default ListHeaderModal;
