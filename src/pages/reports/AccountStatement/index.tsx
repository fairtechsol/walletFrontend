import { Box } from "@mui/material";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Common/Pagination";
import YellowHeader from "../../../components/report/AccountStatement/YellowHeader";
import ListHeaderRow from "../../../components/report/AccountStatement/ListHeaderRow";
import TableHeaderList from "../../../components/report/AccountStatement/TableHeaderList";
import TableDataRow from "../../../components/report/AccountStatement/TableDataRow";

const AccountStatement = () => {
  const loading = false;
  const pageCount = "10";

  const statementObj = [
    {
      id: "51bb3e25-a0c5-4483-a2c3-c1d9b3d869bc",
      createAt: "2023-12-01T04:08:31.292Z",
      userId: "76ba076a-0d75-424d-ae1e-79c1ace7fc9c",
      match_id: null,
      current_amount: 100000,
      amount: 100000,
      trans_type: "add",
      action_by: {
        id: "0fcef171-3e9c-4b97-bba2-7c2e7bca112f",
        userName: "FAIRGAMEWALLET",
        phoneNumber: "1234567890",
      },
      settling: 0,
      description: "",
      user: {
        id: "76ba076a-0d75-424d-ae1e-79c1ace7fc9c",
        userName: "AJFADMIN",
        phoneNumber: "0",
      },
    },
    {
      id: "d0f8b960-5fd3-40e9-b56c-b9da84f2e738",
      createAt: "2023-12-01T04:07:48.602Z",
      userId: "bad689d1-197b-4ec2-8711-a68df38562c9",
      match_id: null,
      current_amount: 1000,
      amount: 0,
      trans_type: "credit_refer",
      action_by: {
        id: "76ba076a-0d75-424d-ae1e-79c1ace7fc9c",
        userName: "AJFADMIN",
        phoneNumber: "0",
      },
      settling: 0,
      description: "CREDIT REFRENCE as user create",
      user: {
        id: "bad689d1-197b-4ec2-8711-a68df38562c9",
        userName: "USER51",
        phoneNumber: "0",
      },
    },
  ];
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ marginX: { xs: "2vw", lg: "1vw" } }}>
          <YellowHeader />
        </Box>

        <Box
          sx={[
            {
              marginX: { xs: "2vw", lg: "1vw" },
              minHeight: "100px",
              borderRadius: "2px",
              border: "2px solid white",
              width: "97.5%",
              borderTopRightRadius: {
                xs: "10px",
                lg: "0px",
                md: "10px",
              },
              borderTopLeftRadius: {
                xs: "10px",
                lg: "0px",
                md: "10px",
              },
              background: "#F8C851",
            },
          ]}
        >
          <ListHeaderRow />

          {loading ? (
            <Box
              sx={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader text="" />
            </Box>
          ) : (
            <>
              <Box sx={{ overflowX: "scroll", width: "100%" }}>
                <TableHeaderList />
                {statementObj?.map((item) => (
                  <TableDataRow
                    key={item?.id}
                    index={item?.id}
                    containerStyle={{ background: "#FFE094" }}
                    profit={true}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    date={item?.createAt}
                    description={item?.description}
                    closing={item?.current_amount}
                    trans_type={item?.trans_type}
                    amount={item?.amount}
                    fromuserName={item?.action_by?.userName}
                    touserName={item?.user?.userName}
                  />
                ))}
              </Box>
              <Pagination
                currentPage={1}
                pages={pageCount}
                setCurrentPage={() => {}}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AccountStatement;
