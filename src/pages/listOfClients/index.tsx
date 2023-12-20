import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import AccountList from "../../components/listOfClients/AccountList";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="p-0"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      sx={{
        padding: 0,
      }}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

const ListOfClients = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
              marginLeft: { lg: "0.5%", xs: "0.5%" },
            }}
          >
            Account List
          </Typography>
        </Box>

        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab sx={{ color: "white" }} value="one" label="Super Url Admin" />
          <Tab sx={{ color: "white" }} value="two" label="Expert" />
        </Tabs>

        <TabPanel value={value} index="one">
          <AccountList />
        </TabPanel>
        <TabPanel value={value} index="two">
          <Typography variant="h3" sx={{ color: "#fff", m: 2 }}>
            Expert....
          </Typography>
          <AccountList endpoint={true} />
        </TabPanel>
        {/* <AccountList /> */}
      </Box>
    </>
  );
};

export default ListOfClients;
