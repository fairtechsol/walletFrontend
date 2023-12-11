import Select from "react-select";

const SelectField = ({ label, touched, error, ...props }: any) => {
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <Select {...props} />
      {touched && error ? <div style={{ color: "red" }}>{error}</div> : null}
    </div>
  );
};

export default SelectField;
