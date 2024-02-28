import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./components/Root";
import Home, { loader as homeLoader } from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import SignUp, { action as signUpAction } from "./pages/SignUp";
import WriteArticle, {
  action as writeAction,
  loader as writeLoader,
} from "./pages/WriteArticle";
import NewTopic, { action as topicAction } from "./pages/NewTopic";

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
        loader: homeLoader,
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
      {
        path: "write",
        element: <WriteArticle />,
        action: writeAction,
        loader: writeLoader,
      },
      {
        path: "topics/new",
        element: <NewTopic />,
        action: topicAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
