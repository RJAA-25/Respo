import { useState } from "react";

const useRequest = (requestFnc) => {
  const [loading, setLoading] = useState(false);

  const sendRequest = async (config, updateFnc) => {
    setLoading(true);
    await requestFnc(config, updateFnc);
    setLoading(false);
  };

  return { loading, sendRequest };
};

export default useRequest;
