import { Link, useLoaderData } from "react-router-dom";
import { getTopics } from "../api/getTopics";
import useAutoLogout from "../hooks/useAutoLogout";

export const loader = async () => {
  return await getTopics();
};

const TopicsPage = () => {
  const { topics } = useLoaderData();

  // logout automatically if jwt token is invalid
  useAutoLogout();

  return (
    <main className="space-y-4 px-4 py-2 pt-4 md:px-40">
      <h2 className="text-2xl font-bold">Topics List:</h2>
      <div className="flex gap-4">
        {topics.map((topic) => (
          <Link
            to={`/topics/${topic._id}`}
            key={topic._id}
            className="rounded border p-3 shadow hover:bg-slate-400"
          >
            {topic.name}
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold">Create Topic: </h2>
      <Link
        to="/topics/new"
        className="my-4 block w-fit rounded-2xl bg-black p-3 text-white"
      >
        Create
      </Link>
    </main>
  );
};
export default TopicsPage;
