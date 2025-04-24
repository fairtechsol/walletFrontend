import { Box, Typography } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { memo, useState } from "react";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { formatToINR, stripUrl } from "../../../helper";
import StyledImage from "../../Common/StyledImages";
import ChildUserList from "./ChildUserList";
import UserListModalComponent from "./UserListModalComponent";

const AllUserListSeparate = ({
  item,
  index,
  getBetReport,
  sessionBetData,
  selectedId,
  matchId,
  bet1Data,
  sessionBets,
}: any) => {
  const [showChildUserList, setShowChildUserList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBets, setShowBets] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showSessionBets, setShowSessionBets] = useState(false);
  const [showSubUsers, setSubSusers] = useState({
    value: false,
    id: "",
    roleName: "",
    url: null,
    eventType: "",
  });

  const handleSubUserClick = () => {
    if (!["user"].includes(item?.roleName)) {
      if (showSubUsers?.value && showSubUsers?.id === item?.userId) {
        setSubSusers({
          value: false,
          id: "",
          url: null,
          roleName: "",
          eventType: "",
        });
        setShowChildUserList(false);
      } else {
        setSubSusers({
          value: true,
          id: item?.userId,
          url: item?.url,
          roleName: item?.roleName,
          eventType: item?.eventType,
        });
        setShowChildUserList(true);
      }
    }
  };

  return (
    <Box key={index} sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "45px",
          background: "white",
          display: "flex",
          padding: 0.1,
        }}
      >
        <Box
          sx={{
            width: { xs: "10%", lg: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "black",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
          >
            {index > 9 ? index : "0" + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "65%", lg: "80%", md: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: "center",
            display: "flex",
            paddingX: "10px",
            background: "#0B4F26",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Box
            onClick={(e) => {
              e.stopPropagation();
              setShowModal((prev) => !prev);
            }}
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", lg: "15px" },
                color: "white",
                fontWeight: "700",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
              }}
            >
              {item?.userName}
              {`
              ${item?.url ? "(" + stripUrl(item?.url) + ")" : ""}`}
            </Typography>
          </Box>
          {item?.roleName !== "user" && (
            <StyledImage
              onClick={handleSubUserClick}
              src={ArrowDown}
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  showSubUsers?.id === item?.userId && showChildUserList
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            background: "#27AC1E",
            paddingX: "2px",
            width: { xs: "25%", lg: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "12px", xs: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Profit
            </Typography>
            <StyledImage
              src={ARROW_UP}
              sx={{
                width: { lg: "25px", xs: "15px" },
                height: { lg: "12px", xs: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss >= 0 ? formatToINR(item?.totalLoss) : 0}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#E32A2A",
            paddingX: "2px",
            width: { xs: "25%", lg: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "12px", xs: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Loss
            </Typography>
            <StyledImage
              src={ARROWDOWN}
              sx={{
                width: { lg: "25px", xs: "15px" },
                height: { lg: "12px", xs: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss < 0 ? formatToINR(item?.totalLoss) : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ModalMUI
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserListModalComponent
          setShowModal={setShowModal}
          setShowBets={setShowBets}
          setShowSessionBets={setShowSessionBets}
          setShowSessions={setShowSessions}
          item={item}
          showBets={showBets}
          showSessions={showSessions}
          showSessionBets={showSessionBets}
          selectedId={selectedId}
          getBetReport={getBetReport}
          sessionBetData={sessionBetData}
          matchId={matchId}
        />
      </ModalMUI>
      {showSubUsers?.value && (
        <Box
          sx={{
            width: { xs: "100%", lg: "99%" },
            marginTop: { xs: ".25vh" },
            marginLeft: { lg: "1%" },
            display: "flex",
            flexDirection: { lg: "row", xs: "column" },
          }}
        >
          <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <Box
              sx={{
                width: { xs: "100%", lg: "100%", md: "100%" },
                overflow: "hidden",
                marginY: { xs: ".2vh", lg: "1vh" },
                padding: 0.2,
              }}
            >
              <ChildUserList
                id={showSubUsers?.id}
                url={showSubUsers?.url}
                show={showSubUsers?.value}
                eventType={showSubUsers?.eventType}
                setShow={showSubUsers}
                matchId={matchId}
                bet1Data={bet1Data}
                roleName={showSubUsers?.roleName}
                getBetReport={getBetReport}
                sessionBetData={sessionBetData}
                sessionBets={sessionBets}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(AllUserListSeparate);
