import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ListHeaderModal from "./ListHeader";
import {
  getSearchClientList,
  resetSearchUserList,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ApiConstants } from "../../../utils/Constants";
import { toast } from "react-toastify";
import service from "../../../service";
import { stripUrl } from "../../../helper";

const DirectUserBlock = ({ setShow }: any) => {
  const theme = useTheme();
  const matchesxs = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();

  const { searchUserList } = useSelector(
    (state: RootState) => state.user.userList
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = () => {
    dispatch(
      getSearchClientList({
        userName: searchQuery,
        isUser: true,
      })
    );
  };

  const handleToggle = async (userDetail: any, field: any) => {
    try {
      if (transactionPassword) {
        const payload = {
          userId: userDetail?.id,
          betBlock:
            field === "betBlock" ? !userDetail?.betBlock : userDetail?.betBlock,
          userBlock:
            field === "userBlock"
              ? !userDetail?.userBlock
              : userDetail?.userBlock,
          transactionPassword: transactionPassword,
          userDomain: userDetail?.domain
        };

        const resp: any = await service.post(
          ApiConstants.SUPERADMIN.LOCK_UNLOCK_USER,
          payload
        );
        if (resp?.status === "success") {
          setUsers((prevUsers: any) =>
            prevUsers.map((user: any) =>
              user.id === userDetail?.id
                ? { ...user, [field]: !user[field] }
                : user
            )
          );
        }
      } else {
        toast.error("Transaction Code is Required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUsers(searchUserList?.users || []);
  }, [searchUserList]);

  useEffect(() => {
    dispatch(resetSearchUserList());
  }, []);

  return (
    <>
      <Box
        sx={{
          width: { xs: "70%", lg: "70%", md: "70%" },
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          overflow: "hidden",
          border: "2px solid white",
          background: "#fff",
        }}
      >
        <Box sx={{ marginX: "0", background: "#F8C851", height: "50px" }}>
          <ListHeaderModal
            title="Direct User Block"
            setShow={setShow}
            matchesxs={matchesxs}
          />
        </Box>
        <Box
          sx={{
            overflowX: "auto",
            width: { xs: "100%", lg: "100%", md: "100%" },
          }}
        >
          <Box display="flex" alignItems="center" gap={2} m={2}>
            <TextField
              label="Search Users"
              variant="outlined"
              required
              size="small"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
              Load
            </Button>
          </Box>
          <Box display="flex" alignItems="center" m={2} width={"50%"}>
            <TextField
              label="Transaction Code"
              required
              variant="outlined"
              size="small"
              fullWidth
              value={transactionPassword}
              onChange={(e) => setTransactionPassword(e.target.value)}
            />
          </Box>
          {/* Table */}
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 400, overflowY: "auto" }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600" }}>User Name</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Domain</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600" }}>
                    User Block
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "600" }}>
                    Bet Block
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Record Found!
                    </TableCell>
                  </TableRow>
                )}
                {users?.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{stripUrl(user.domain)}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={user?.userBlock}
                        onChange={() => handleToggle(user, "userBlock")}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={user?.betBlock}
                        onChange={() => handleToggle(user, "betBlock")}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default DirectUserBlock;
