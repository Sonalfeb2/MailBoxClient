import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSentData } from "../store/SentBoxAction";

const useCustomHook = (url, props) => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (url === "sentboxFetchData") {
        dispatch(fetchSentData());
      }
    },
    [url, dispatch]
  );

  return "success";
};
export default useCustomHook;
