import { Form, useNavigate, useNavigation } from "react-router-dom";
import { deleteArticle } from "../api/delelteArticle";
import useAutoLogout from "../hooks/useAutoLogout";

export const action = async ({ params }) => {
  return await deleteArticle(params.articleId);
};

const DeleteArticle = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";
  const loading = navigation.state === "loading";

  // logout automatically if jwt token is invalid
  useAutoLogout();

  const cancel = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="px-4 py-2 pt-4 md:px-40">
      <Form className="space-y-4" method="post">
        <h2 className="text-2xl font-bold">Delete article</h2>
        <p>Are you sure you want to delete this Article?</p>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2  rounded bg-black p-2 text-white"
          >
            {busy ? (
              <>
                {" "}
                <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
                Deleting{" "}
              </>
            ) : (
              "Delete"
            )}
          </button>

          <button
            onClick={cancel}
            type="button"
            className="flex items-center  gap-2 rounded bg-black p-2 text-white"
          >
            {loading ? (
              <>
                {" "}
                <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
                Caneling{" "}
              </>
            ) : (
              "Cancel"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
};
export default DeleteArticle;
