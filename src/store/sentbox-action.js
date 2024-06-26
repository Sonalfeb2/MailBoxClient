import { SentBoxSliceActions } from "./sentbox-reducer";
export const fetchSentData = () => {
  const arr = [];
  const userEmail = localStorage.getItem("userEmail");
  return async dispatch => {
    try {
      const res = await fetch(
        `https://mail-box-80520-default-rtdb.firebaseio.com/senders.json?orderBy="from"&equalTo="${userEmail}"`
      );

      if (!res.ok) {
        throw new Error("Failed Fetching Data");
      }
      const data = await res.json();

      for (let [key, value] of Object.entries(data)) {
        arr.push({ ...value, id: key });
      }
      dispatch(SentBoxSliceActions.getList(arr));
    } catch (error) {
      console.log(error);
    }
  };
};