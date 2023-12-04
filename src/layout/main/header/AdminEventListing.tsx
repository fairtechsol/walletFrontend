import { Box } from "@mui/system";
import {
  ADDACCOUNT,
  CHECKLIST,
  MYACCOUNT,
  Play,
  TEAM,
  TREND,
  WALLET,
} from "../../../assets";
import AdminEventComponent from "./AdminEventComponent";
import { NavLink } from "react-router-dom";

const AdminEventListing = (props: any) => {
  const { setAnchor, setAnchor1 } = props;

  const data = [
    { id: 3, title: "INPLAY", image: Play, url: "live_market" },
    { id: 1, title: "Add Account", image: ADDACCOUNT, url: "add_account" },
    { id: 2, title: "Client list", image: TEAM, url: "list_of_clients" },

    { id: 4, title: "Analysis", image: TREND, url: "market_analysis" },
    {
      id: 5,
      title: "Reports",
      image: CHECKLIST,
      url: "reports",
    },
    {
      id: 5,
      title: "Wallet",
      image: WALLET,
      url: "walletSettings",
    },

    { id: 6, title: "My Account", image: MYACCOUNT, url: "my-account" },
  ];

  return (
    <Box
      sx={[
        {
          width: { xs: "98%", lg: "100%" },
          msOverflowStyle: "none",
          overflowY: "hidden",
          minHeight: { xs: 95, lg: 80 },
          marginLeft: { xs: "0", lg: ".5vw" },
          overflowX: "auto",
          alignSelf: { xs: "center", lg: "flex-start" },
          display: "flex",
        },
      ]}
    >
      {data?.map((i: any, idx: any) => {
        return (
          <NavLink
            key={idx}
            to={`/wallet/${i.url}`}
            className={({ isActive }) =>
              [isActive ? "activeEventTab" : ""].join(" ")
            }
            style={{ textDecoration: "none" }}
          >
            <AdminEventComponent
              data={i}
              setAnchor={setAnchor}
              setAnchor1={setAnchor1}
            />
          </NavLink>
        );
      })}
    </Box>
  );
};

export default AdminEventListing;
