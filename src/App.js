import React from "react";
import Header from "./layout/Header";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import Home from "./component/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/InboxAction";
function App() {
  const dispatch = useDispatch();
  setInterval(() => {
    dispatch(fetchData());
  }, 2000);

  const userId = useSelector(state => state.authSlice.userId);

  const router = createBrowserRouter([
    {
      path: "/",
      element: userId ? <Header /> : <Navigate to="/login" replace />,
      children: [
        {
          path: "/",
          element: <Home />
        }
      ]
    },
    {
      path: "/login",
      element: userId ? <Navigate to="/" replace /> : <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
