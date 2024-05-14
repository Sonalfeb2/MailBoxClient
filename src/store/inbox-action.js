import { InboxSliceActions } from "./inbox-reducer";
export const fetchData = () => {
  const arr = [];
  const userEmail = localStorage.getItem("userEmail");
  return async dispatch => {
    try {
      const res = await fetch(
        `https://mail-box-80520-default-rtdb.firebaseio.com/receivers.json?orderBy="to"&equalTo="${userEmail}"`
      );
  console.log(res)
      if (!res.ok) {
        throw  Error("Failed Fetching Data");
      }
      const data = await res.json();
      
      for (let [key, value] of Object.entries(data)) {
        arr.push({ ...value, id: key });
      }
      dispatch(InboxSliceActions.getList(arr));
    } catch (error) {
      console.log(error);
    }
  };
};
export const UpdateData = e => {
  return async dispatch => {
    try {
      const res = await fetch(
        `https://mail-box-80520-default-rtdb.firebaseio.com/receivers/${e.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            read: true
          })
        }
      );
      if (!res.ok) {
        throw new Error("Failed to Updated");
      }
      dispatch(fetchData());
    } catch (error) {
      console.log(error);
    }
  };
};
