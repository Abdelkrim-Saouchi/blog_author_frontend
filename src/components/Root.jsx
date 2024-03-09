import { useEffect } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { useStore } from "../store/useStore";
import Header from "./Header";

export const loader = () => {
  const token = localStorage.getItem("author-jwt-token");
  return token;
};

export const action = async () => {
  localStorage.removeItem("author-jwt-token");
  localStorage.removeItem("author-exipresIn");
  return redirect("/");
};

const Root = () => {
  const token = useLoaderData();
  const navigation = useNavigation();
  const setToken = useStore((state) => state.setToken);

  useEffect(() => {
    setToken(token);
  }, [setToken, token]);

  return (
    <>
      <Header />

      <div
        className={
          navigation.state === "loading"
            ? "opacity-25 transition-opacity delay-200 duration-200"
            : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;
