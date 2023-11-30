export interface InputInterface {
  title?: string;
  value?: any;
  containerStyle?: any;
  required?: boolean;
  placeholder?: string;
  titleStyle?: any;
  inputStyle?: any;
  inputContainerStyle?: any;
  inputProps?: any;
  type?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  img?: any;
  img1?: any;
  imgstyle?: any;
  place?: number;
  okButtonRef?: string;
  onChange?: (value: any) => void;
  name?: string;
}

export interface LoaderInterface {
  text?: string;
  height?: string;
  width?: string;
}

export interface PaginationInterface {
  currentPage: string;
  pages: string | number;
  callPage: (value: any) => void;
}
