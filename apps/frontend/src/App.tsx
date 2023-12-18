import React from "react";
import HomeScreen from "./pages/Home/Home";
import LoginScreen from "./pages/Login/Login";
import RegisterScreen from "./pages/Register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true, 
        element: <HomeScreen />,
      },
      {
        path: '/login',
        element: <LoginScreen />,
      },
      {
        path: '/register',
        element: <RegisterScreen />,
      }
    ],

  }
])


const App: React.FC = () => {
  return <RouterProvider router={router}></RouterProvider>
};

export default App;
