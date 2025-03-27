import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ListItems from "../../components/walletSettings/ListItems";
import { getUsersProfile } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";

const WalletSettings = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersProfile());
  }, []);

  return <ListItems title={"Wallet"} />;
};

export default WalletSettings;
