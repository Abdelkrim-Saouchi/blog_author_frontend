import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./components/Root";
import Home from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import SignUp, { action as signUpAction } from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
