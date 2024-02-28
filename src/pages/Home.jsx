import { useLoaderData } from "react-router-dom";
import { getArticles } from "../api/getArticles";
import ArticleCard from "../components/ArticleCard";

export const loader = async () => {
  return await getArticles();
};

const Home = () => {
  const data = useLoaderData();
  console.log("data:", data);
  const published =
    data.articles?.filter((article) => !article.published) || [];
  const unpublished =
    data.articles?.filter((article) => article.published) || [];

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <div className="">
        <h2 className="border-b border-gray-200 text-3xl font-bold">
          Unpublished articles:
        </h2>
        <div className="my-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {published.length > 0 ? (
            published.map((article) => (
              <ArticleCard
                key={article.id}
                creationDate={article.creationDate}
                title={article.title}
                content={article.content}
                articleId={article.id}
              />
            ))
          ) : (
            <p className="p-3 font-semibold text-red-600">
              You must be logged in to see articles
            </p>
          )}
        </div>
        <h2 className="border-b border-gray-200 text-3xl font-bold">
          Published articles:
        </h2>
        <div className="my-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {unpublished.length > 0 ? (
            unpublished.map((article) => (
              <ArticleCard
                key={article.id}
                creationDate={article.creationDate}
                title={article.title}
                content={article.content}
                articleId={article.id}
              />
            ))
          ) : (
            <p className="p-3 font-semibold text-red-600">
              You must be logged in to see articles
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
