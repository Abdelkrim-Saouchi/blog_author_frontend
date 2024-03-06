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
import EditArticle, {
  action as editAction,
  loader as editLoader,
} from "./pages/EditArticle";
import DeleteArticle, { action as deleteAction } from "./pages/DeleteArticle";

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
      {
        path: "articles/:articleId/edit",
        element: <EditArticle />,
        action: editAction,
        loader: editLoader,
      },
      {
        path: "articles/:articleId/delete",
        element: <DeleteArticle />,
        action: deleteAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
