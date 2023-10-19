import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Views/Dashboard";
import LoginView from "./Views/Auth/LoginView";
import SignUpView from "./Views/Auth/SignupView";
import UnknownView from "./Views";

import { ProtectedRoutes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/signup",
    element: <SignUpView />,
  },
  {
    path: "/*",
    element: <UnknownView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
