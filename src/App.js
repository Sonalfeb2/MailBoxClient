import React from "react";
import Header from "./components/layout/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/inbox-action";
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
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
