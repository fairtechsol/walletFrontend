import { Box } from "@mui/material";
import AccountList from "../../components/listOfClients/AccountList";

const ListOfClients = () => {
  return (
    <>
      <Box
        sx={[
          { fontWeight: "600", fontSize: "16px", lineHeight: "1.5" },
          (theme) => ({
            color: `${theme.palette.secondary.contrastText}`,
          }),
        ]}
      >
        Account List
      </Box>
      <AccountList />
    </>
  );
};

export default ListOfClients;
