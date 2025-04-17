import { Box, Typography } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { ARROWDROPDOWN } from "../../../assets";

interface SmallDropDownProps {
  setPageLimit?: (value: number) => void;
  pageLimit: number;
  setCurrentPage?: (value: number) => void;
}

const SmallDropDown = ({
  setPageLimit,
  pageLimit,
  setCurrentPage,
}: SmallDropDownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={{
          width: "47px",
          height: "30px",
          justifyContent: "space-around",
          alignItems: "center",
          display: "flex",
          background: "white",
          borderRadius: "5px",
          border: "2px solid #DEDEDE",
          marginX: "5px",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>{pageLimit}</Typography>
        <img
          src={ARROWDROPDOWN}
          style={{
            width: "12px",
            height: "7px",
            zIndex: 5,
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
      </Box>
      {open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            width: "47px",
            alignSelf: "center",
            marginX: "5px",
            borderRadius: "2px",
            marginTop: "2px",
            position: "absolute",
            zIndex: 22,
          }}
        >
          {[5, 10, 15, 20, 50, 100].map((item: any, idx: any) => {
            return (
              <Fragment key={idx}>
                <Typography
                  onClick={() => {
                    setPageLimit?.(+item);
                    setCurrentPage?.(1);
                    setOpen(false);
                  }}
                  sx={{ textAlign: "center", paddingY: "1px" }}
                >
                  {item}
                </Typography>
                <Box
                  sx={{ width: "100%", height: "1px", background: "#DEDEDE" }}
                />
              </Fragment>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default memo(SmallDropDown);
