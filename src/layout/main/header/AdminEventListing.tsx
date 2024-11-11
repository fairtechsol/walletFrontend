import { Box } from "@mui/system";
import {
  ADDACCOUNT,
  CHECKLIST,
  Cricket,
  Football,
  MYACCOUNT,
  Play,
  TEAM,
  TREND,
  Tennis,
  WALLET,
  HorseRacing,
  GreyHound,
  Politics,
} from "../../../assets";
import AdminEventComponent from "./AdminEventComponent";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const data = [
  { id: 1, title: "INPLAY", image: Play, url: "live_market", alt: "Inplay" },
  {
    id: 2,
    title: "CRICKET",
    image: Cricket,
    url: "matchList/cricket",
    alt: "Cricket",
  },
  {
    id: 3,
    title: "FOOTBALL",
    image: Football,
    url: "matchList/football",
    alt: "Football",
  },
  {
    id: 4,
    title: "TENNIS",
    image: Tennis,
    url: "matchList/tennis",
    alt: "Tennis",
  },
  {
    id: 14,
    title: "POLITICS",
    image: Politics,
    url: "matchList/politics",
    alt: "Politics",
  },
  {
    id: 5,
    title: "HORSE RACING",
    image: HorseRacing,
    url: "race_list/horseRacing",
    alt: "Horse Racing",
  },
  {
    id: 13,
    title: "GREYHOUND",
    image: GreyHound,
    url: "race_list/greyHound",
    alt: "Greyhound Racing",
  },
  {
    id: 6,
    title: "Add Account",
    image: ADDACCOUNT,
    url: "add_account",
    alt: "Add Account",
  },
  {
    id: 7,
    title: "Client list",
    image: TEAM,
    url: "list_of_clients",
    alt: "Client List",
  },
  {
    id: 8,
    title: "Analysis",
    image: TREND,
    url: "market_analysis",
    alt: "Analysis",
  },
  {
    id: 9,
    title: "Race Analysis",
    image: TREND,
    url: "market_analysis2/horseRacing",
    alt: "Analysis",
  },
  {
    id: 10,
    title: "Reports",
    image: CHECKLIST,
    url: "reports",
    alt: "Reports",
  },
  {
    id: 12,
    title: "My Account",
    image: MYACCOUNT,
    url: "my-account",
    alt: "My Account",
  },
];

const AdminEventListing = () => {
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [newData, setNewData] = useState<any>(data);

  useEffect(() => {
    if (profileDetail?.roleName === "fairGameWallet") {
      setNewData((prev: any) => {
        const newData = [...prev];
        const body = {
          id: 11,
          title: "wallet",
          image: WALLET,
          url: "walletsettings",
        };
        const objectExists = prev.some((item: any) => item?.id === body?.id);
        if (!objectExists) {
          const secondLastIndex = prev.length - 1;
          newData.splice(secondLastIndex, 0, body);
        }
        return newData;
      });
    }
  }, [profileDetail]);

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
      {newData?.map((i: any, idx: any) => {
        return (
          <NavLink
            key={idx}
            to={`/wallet/${i.url}`}
            className={({ isActive }) =>
              [isActive ? "activeEventTab" : ""].join(" ")
            }
            style={{ textDecoration: "none" }}
          >
            <AdminEventComponent data={i} />
          </NavLink>
        );
      })}
    </Box>
  );
};

export default AdminEventListing;
