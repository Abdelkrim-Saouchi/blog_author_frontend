import { useEffect, useRef, useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { useStore } from "../store/useStore";

const Header = () => {
  const token = useStore((state) => state.token);
  const menuRef = useRef(null);
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("touchend", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideClick);

    () => {
      document.removeEventListener("touchend", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
      return;
    };
  }, []);

  return (
    <header className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 px-2 py-2 md:px-4">
      <Link to="/">
        <span className="icon-[game-icons--bookmarklet] text-3xl"></span>
      </Link>

      <nav className="hidden md:block">
        <ul className="flex gap-6 font-semibold">
          {!token && (
            <>
              <li>
                <Link to="/login" className="hover:opacity-70 ">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:opacity-70 ">
                  Sign up
                </Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link
                  to="/write"
                  className="flex items-center gap-1 hover:opacity-70 "
                >
                  Write
                  <span className="icon-[ph--note-pencil-thin] text-xl"></span>
                </Link>
              </li>
              <li>
                <fetcher.Form method="post" action="/">
                  <button className="flex items-center gap-1 hover:opacity-70">
                    Logout
                    <span className="icon-[mdi--exit-run] text-xl"></span>
                  </button>
                </fetcher.Form>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="md:hidden">
        <span
          onClick={toggleMenu}
          className="icon-[mdi--hamburger-menu] text-3xl"
        ></span>
      </div>
      {open && (
        <nav
          ref={menuRef}
          className="absolute right-4 top-10 z-10 rounded border border-slate-200 bg-white px-4 py-4 shadow-md md:hidden "
        >
          <ul className="flex flex-col gap-4 font-semibold">
            {!token && (
              <>
                <li onClick={toggleMenu} className="p-2 hover:bg-slate-200">
                  <Link to="/login">Login</Link>
                </li>
                <li onClick={toggleMenu} className="p-2 hover:bg-slate-200">
                  <Link to="/singup">Sign up</Link>
                </li>
              </>
            )}
            {token && (
              <li className="p-2 hover:bg-slate-200">
                <fetcher.Form method="post" action="/">
                  <button className="flex items-center gap-1 hover:opacity-70">
                    Logout
                    <span className="icon-[mdi--exit-run] text-xl"></span>
                  </button>
                </fetcher.Form>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
