import React from "react";
import HomeScreen from "./components/Main/Main";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayoutScreen from "./pages/RootScreen/RootScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutScreen />,
    children: [
      {
        index: true, 
        element: <HomeScreen />,
      }
    ],

  }
])


const App: React.FC = () => {
  return <RouterProvider router={router}></RouterProvider>
};

export default App;
