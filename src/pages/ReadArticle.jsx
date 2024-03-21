import { Outlet, useLoaderData } from "react-router-dom";
import LikesCommentsBar from "../components/LikesCommentsBar";
import CommentsSection from "../components/CommentsSection";
import { getArticle } from "../api/getArticle";
import { createComment } from "../api/createComment";
import useAutoLogout from "../hooks/useAutoLogout";
import PseudoImage from "../components/PseudoImage";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const token = localStorage.getItem("author-jwt-token");
  console.log("id:", params);
  // create comment on article
  if (formData.get("commentBtn") === "create") {
    const content = formData.get("commentText");
    return await createComment(params.articleId, token, content);
  }

  // // delete comment on article
  // if (formData.get("commentBtn") === "delete") {

  // }
};

export const loader = async ({ params }) => {
  return await getArticle(params.articleId);
};

const ReadArticle = () => {
  const article = useLoaderData();

  // logout automatically if jwt token is invalid
  useAutoLogout();

  return (
    <main className="relative flex flex-col items-center px-4 py-2 pt-4 text-xl">
      <div className="md:w-3/5">
        <h2 className="my-6 text-6xl font-bold">{article.title}</h2>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <PseudoImage
              firstLetter={article.author.firstName[0].toUpperCase()}
            />
            <p className="font-bold">
              {article.author.firstName} {article.author.lastName}
            </p>
          </div>
          <div className="gap-2 text-gray-500">
            <span>{article.readTime} min read</span> .{" "}
            <span>{article.creationDate}</span>
          </div>
        </div>
        <LikesCommentsBar
          likesNumber={article.likes.length}
          commentsNumber={article.comments.length}
        />
        {article.imgURL && (
          <img src={article.imgURL} alt="Article" className="mb-8" />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="prose max-w-full leading-relaxed"
        ></div>
        <div className="my-8">
          {article.topics.map((topic) => (
            <span key={topic._id} className="rounded-lg bg-gray-100 p-2">
              {topic.name}
            </span>
          ))}
        </div>

        <CommentsSection comments={article.comments} />
      </div>
      <Outlet />
    </main>
  );
};
export default ReadArticle;
