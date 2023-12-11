export interface AddAccountInterface {
  userName?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  city?: string;
  number?: string;
  domain?: string;
  roleName: {
    label: string;
    value: string;
  };
  creditReference?: string;
  uplinePartnership?: string;
  myPartnership?: string;
  downlinePartnership?: string;
  matchCommissionType?: string;
  matchCommission?: string;
  sessionCommission?: string;
  remarks?: string;
  adminTransPassword?: string;
  session?: boolean;
  bookmaker?: boolean;
}

export interface DropdownInterface {
  id?: string;
  title?: string;
  data?: any;
  containerStyle?: any;
  titleStyle?: any;
  valueContainerStyle?: any;
  dropStyle?: any;
  dropDownStyle?: any;
  dropDownTextStyle?: any;
  Detail?: any;
  place?: any;
  type?: any;
  matchesSelect?: any;
  disable?: boolean;
  setSelected?: (value: any) => void;
  name?: string;
  openDrop?: boolean;
  defaultValue?: string;
}
