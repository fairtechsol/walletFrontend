import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { formatToINR } from "../../helper";

interface AccountListRowProps {
  containerStyle?: React.CSSProperties;
  fContainerStyle?: React.CSSProperties & { background?: string };
  fTextStyle?: React.CSSProperties;
  element?: {
    matchName?: string;
    commissionAmount?: number | string;
    matchType?: "SESSION" | string;
    betType?: string;
    stake?: number | string;
    odds?: number | string;
    isActive?: boolean;
    teamName?: string;
    date?: string;
    partnerShip?: number;
    userName?: string;
  };
  showOptions?: boolean;
  showChildModal?: boolean;
  profit?: any;
}

interface FormattedElement {
  name?: string;
  commissionAmount?: string;
  commissionType?: string;
  betType?: string;
  stack?: string;
  odds?: string | number;
  isActive?: boolean;
  teamBet?: string;
  createAt?: string;
  myCommission?: string;
  userName?: string;
}

const AccountListRow: React.FC<AccountListRowProps> = ({
  containerStyle = {},
  fContainerStyle = {},
  fTextStyle = {},
  element = {},
}) => {
  const formatElement = (): FormattedElement => ({
    name: element?.matchName,
    commissionAmount: formatToINR(Number(element?.commissionAmount) || 0),
    commissionType: element?.matchType === "SESSION" ? "Session" : "Match",
    betType: element?.betType,
    stack: element?.stake ? formatToINR(Math.abs(Number(element.stake))) : undefined,
    odds: element?.odds,
    isActive: element?.isActive,
    teamBet: element?.teamName,
    createAt: element?.date,
    myCommission: element?.partnerShip
      ? `${formatToINR(
        ((Number(element.commissionAmount) || 0) * element.partnerShip) / 100
      )}(${element.partnerShip}%)`
      : undefined,
    userName: element?.userName,
  });
  const [elementToUDM, setElementToUDM] = useState<FormattedElement>(
    formatElement()
  );

  useEffect(() => {
    setElementToUDM(formatElement());
  }, [element?.matchType]);

  return (
    <>
      {!elementToUDM?.isActive && (
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            height: "45px",
            position: "absolute",
            display: "flex",
            width: "auto",
            overflowX: "auto",
          }}
        />
      )}

      <Box
        sx={[
          {
            width: { xs: "218%", lg: "100%", md: "100%" },
            display: "flex",
            height: "45px",
            background: "#0B4F26",
            alignItems: "center",
            overflow: "hidden",
            borderBottom: "2px solid white",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={[
            {
              width: { lg: "12.2%", md: "12.5%", xs: "12.5%" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            sx={[
              {
                fontSize: { xs: "10px", lg: "12px", md: "10px" },
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
                color: ["#319E5B", "#303030"].includes(
                  fContainerStyle.background || ""
                )
                  ? "white"
                  : "white",
              },
              fTextStyle,
            ]}
          >
            {elementToUDM?.userName}
          </Typography>
        </Box>
        <Box
          sx={[
            {
              width: { lg: "12.3%", md: "12.5%", xs: "12.5%" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            sx={[
              {
                fontSize: { xs: "10px", lg: "12px", md: "10px" },
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
                color: ["#319E5B", "#303030"].includes(
                  fContainerStyle.background || ""
                )
                  ? "white"
                  : "white",
              },
              fTextStyle,
            ]}
          >
            {elementToUDM.commissionType}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[
              { fontSize: "12px", fontWeight: "600", lineHeight: "0.9" },
              fTextStyle,
            ]}
          >
            {elementToUDM?.createAt ? (
              <>
                {moment(elementToUDM?.createAt).format("L")} <br />
                {moment(elementToUDM?.createAt).format("LTS")}
              </>
            ) : (
              ""
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "24.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[
              { fontSize: "12px", fontWeight: "600", lineHeight: "1" },
              fTextStyle,
            ]}
          >
            {elementToUDM?.teamBet}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.odds}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "15%", md: "15%", xs: "15%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            textTransform: "capitalize",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.betType}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "15%", md: "15%", xs: "15%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.stack}
          </Typography>
        </Box>

        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.commissionAmount}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.myCommission}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default memo(AccountListRow);
