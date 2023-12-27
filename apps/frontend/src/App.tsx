import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { 
  Root as RootScreen,
  Home as HomeScreen,
  Login as LoginScreen,
  Register as RegisterScreen
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
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
