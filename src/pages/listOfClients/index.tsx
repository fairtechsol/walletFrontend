import { Box, Typography } from "@mui/material";
import AccountList from "../../components/listOfClients/AccountList";

const ListOfClients = () => {
  return (
    <>
      <Box sx={{ margin: " 1%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: "0.5%",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              marginLeft: { laptop: "0.5%", mobile: "0.5%" },
            }}
          >
            Account List
          </Typography>
        </Box>
        <AccountList />
      </Box>
    </>
  );
};

export default ListOfClients;
