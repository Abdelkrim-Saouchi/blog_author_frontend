import { useLoaderData } from "react-router-dom";
import { getArticles } from "../api/getArticles";

export const loader = async () => {
  return await getArticles();
};

const Home = () => {
  const data = useLoaderData();
  console.log("data:", data);

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <div className="flex items-center gap-6 border-b border-gray-200 pb-4 opacity-70">
        HOme
      </div>
    </main>
  );
};

export default Home;
