import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ARROWDROPDOWN } from "../../assets";

const colors = ["#F8C851", "#FFDA7D", "#FFE7AD", "#FFF1CF", "#FFF8E6"];
const datas = [
  {
    title: "Cricket",
    values: [
      {
        title: "01, November, 2022",
        values: [
          {
            title: "India vs Bangladesh",
            values: [
              {
                title: "Match Odds 3",
                values: false,
              },
            ],
          },
        ],
      },
      {
        title: "01, November, 2022",
        values: [
          {
            title: "India vs Bangladesh",
            values: [
              {
                title: "Match Odds 3",
                values: false,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Football",
    values: [],
  },
  {
    title: "Tennis",
    values: [],
  },
  {
    title: "Ice hockey",
    values: [],
  },
];
const MainBox = (props: any) => {
  const { title, width, color, under, selected, sub } = props;
  return (
    <Box
      sx={{
        display: "flex",
        width: width + "%",
        height: "6vh",
        paddingX: "3%",
        background: color,
        justifyContent: "space-between",
        borderRadius: "3px",
        alignItems: "center",
        marginTop: "1px",
        alignSelf: "flex-end",
        marginBottom: ".5vh",
        marginRight: "3px",
        opacity: selected && under ? 1 : 0.8,
        "&:hover": {
          cursor: "pointer",
          background: color,
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",

          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flex: 0.1 }}></Box>
        <Typography
          sx={{
            fontSize: "12px",
            color: "black",
            fontWeight: "600",
            marginLeft: "3%",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "8px",
            color: "black",
            fontWeight: "400",
            marginLeft: "2%",
          }}
        >
          {sub}
        </Typography>
      </Box>
      {under && (
        <Box
          sx={{
            display: "flex",
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "15px",
              height: "8px",
              transform: selected && under ? "rotate(0deg)" : "rotate(180deg)",
            }}
            src={ARROWDROPDOWN}
          />
        </Box>
      )}
      {/* {selected && under && <MinusBox />}
      {!selected && under && <PlusBox />} */}
    </Box>
  );
};
const RenderDates = (props: any) => {
  const { i, handleDrawerToggle } = props;
  const [selected, setSelected] = useState(false);

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();
        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[2]}
        width={80}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value: any, index: any) => {
          return (
            <RenderBets
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              k={index}
              key={index}
            />
          );
        })}
    </Box>
  );
};
const RenderBets = (props: any) => {
  const { i, handleDrawerToggle } = props;
  const navigate = useNavigate();
  const path = window.location.pathname.split("/")[1];
  return (
    <Box
      onClick={(event) => {
        navigate(`/${path}/match`, { state: { matchId: i.matchId } });
        handleDrawerToggle();
        event.stopPropagation();
      }}
      sx={{
        width: "100%",
        display: "flex",
        marginLeft: "7%",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        under={false}
        color={colors[4]}
        width={70}
        title={i.title}
      />
    </Box>
  );
};
const RenderEvents = (props: any) => {
  const { i, handleDrawerToggle } = props;
  const [selected, setSelected] = useState(false);

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();

        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[0]}
        width={85}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value: any, index: any) => {
          return (
            <RenderDates
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              key={index}
            />
          );
        })}
    </Box>
  );
};

const RenderGames = (props: any) => {
  const { i, handleDrawerToggle } = props;
  const [selected, setSelected] = useState(false);
  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();

        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[1]}
        width={90}
        title={i.title}
      />
      {selected &&
        i?.values?.map((value: any, index: any) => {
          return (
            <RenderEvents
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              key={index}
            />
          );
        })}
    </Box>
  );
};

const SideBarAdmin = (props: any) => {
  const { handleDrawerToggle } = props;
  const [matchData] = useState(datas);

  return (
    <Box

    // headerGradient
    >
      <Box
        sx={[
          {
            width: "100%",
            marginTop: "5px",
            paddingX: "3%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "20px",
            height: "6vh",
            marginBottom: ".5vh",
            borderBottomRightRadius: ".5vh",
            borderTopRightRadius: ".5vh",
          },
          (theme: any) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          }),
        ]}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flex: 0.1 }}></Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              height: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                marginLeft: "1.8%",
                fontWeight: { xs: "500", lg: "600" },
              }}
            >
              All Sports
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <img
              style={{
                width: "15px",
                height: "8px",
              }}
              src={ARROWDROPDOWN}
            />
          </Box>
        </Box>
      </Box>
      {matchData?.map((i, k) => {
        return (
          <RenderGames
            key={k}
            handleDrawerToggle={handleDrawerToggle}
            i={i}
            k={k}
          />
        );
      })}
    </Box>
  );
};
export default SideBarAdmin;
