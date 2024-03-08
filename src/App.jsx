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
import TopicsPage, { loader as topicsLoader } from "./pages/TopicsPage";
import EditTopic, {
  loader as editTopicLoader,
  action as editTopicAction,
} from "./pages/EditTopic";
import ReadArticle, {
  loader as readArticleLoader,
  action as readArticleAction,
} from "./pages/ReadArticle";
import UpdateComment, {
  loader as commentLoader,
  action as upCommentAction,
} from "./components/UpdateComment";
import DeleteComment, {
  action as delCommentAction,
} from "./components/DeleteComment";

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
        path: "topics",
        element: <TopicsPage />,
        loader: topicsLoader,
      },
      {
        path: "topics/new",
        element: <NewTopic />,
        action: topicAction,
      },
      {
        path: "topics/:topicId",
        element: <EditTopic />,
        loader: editTopicLoader,
        action: editTopicAction,
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
      {
        path: "articles/:articleId",
        element: <ReadArticle />,
        loader: readArticleLoader,
        action: readArticleAction,
        children: [
          {
            path: "comments/:commentId/update",
            element: <UpdateComment />,
            loader: commentLoader,
            action: upCommentAction,
          },
          {
            path: "comments/:commentId/delete",
            element: <DeleteComment />,
            action: delCommentAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
