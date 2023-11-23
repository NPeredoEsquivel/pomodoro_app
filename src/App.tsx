import React from "react";
import Main from "./components/Main/Main";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayoutScreen from "./screens/RootScreen/RootScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutScreen />,
    children: [
      {
        index: true, 
        element: <Main />,
      }
    ],

  }
])


const App: React.FC = () => {
  return <RouterProvider router={router}></RouterProvider>
};

export default App;
