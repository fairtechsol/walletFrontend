import { Typography } from "@mui/material";

interface BlockProps {
  setSearch: (value: string) => void;
  i: any;
  setOpen: (value: boolean) => void;
}

const Block = ({ setSearch, i, setOpen }: BlockProps) => {
  return (
    <Typography
      onClick={() => {
        setSearch(i);
        setOpen(false);
      }}
      sx={{
        paddingY: "5px",
        paddingLeft: "10px",
        fontSize: "10px",
        fontWeight: "500",
        color: "black",
        "&:hover": {
          cursor: "pointer",
          background: "#3498ff33",
        },
      }}
    >
      {i?.userName}
    </Typography>
  );
};

export default Block;
