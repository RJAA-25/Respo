import { useState, useEffect } from "react";

const useInput = (validate, warning, obj = null) => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onCheck = () => {
    if (!valid) {
      obj ? setError(warning(obj, value)) : setError(warning(value));
    }
  };

  useEffect(() => {
    if (obj) {
      setValid(validate(obj, value));
      setError(warning(obj, value));
    } else {
      setValid(validate(value));
      if (validate(value)) setError("");
    }
  }, [value, validate, warning, obj]);

  return { value, valid, error, onChange, onCheck, setError };
};

export default useInput;
