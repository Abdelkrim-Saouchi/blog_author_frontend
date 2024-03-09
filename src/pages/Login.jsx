import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { login } from "../api/login";
import ms from "ms";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const error = {};

  const res = await login(formData);

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("author-jwt-token", data.token);
    const authorExpiresIn = Date.now() + ms(data.expiresIn);
    localStorage.setItem("author-expiresIn", authorExpiresIn);

    return redirect("/");
  }
  if (res.status === 401) {
    error.isLoginError = true;
    return error;
  }
  if (res.status === 400) {
    const data = await res.json();
    error.serverErrors = data.errors;
    return error;
  }
  if (res.status === 500) {
    error.isInternalError = true;
    return error;
  }
};

const Login = () => {
  const location = useLocation();
  const error = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  return (
    <main className="flex flex-col items-center p-4">
      {location.state?._isRedirect && (
        <p className="mb-4 text-xl font-semibold text-green-600">
          Your Sign up was successful. You can login now.
        </p>
      )}

      <h2 className="mb-4 text-2xl font-bold">Login:</h2>

      {error?.isLoginError && (
        <p className="mb-4 text-red-600">Email or password incorrect!</p>
      )}

      {error?.serverErrors?.length > 0 && (
        <ul className="mb-4 list-inside list-disc text-red-600">
          {error.serverErrors.map((element, index) => {
            return <li key={index}>{element.msg}</li>;
          })}
        </ul>
      )}

      {error?.isInternalError && (
        <p className="mb-4 text-red-600">
          Something wrong happened! check if you are signed up.
        </p>
      )}

      <Form
        method="post"
        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 md:px-8"
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            required
            autoComplete="username"
            className="rounded bg-gray-100 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            className="rounded bg-gray-100 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="flex items-center gap-2 rounded-2xl bg-black p-3 text-white"
        >
          {busy ? (
            <>
              {" "}
              <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
              Logging{" "}
            </>
          ) : (
            "Login"
          )}
        </button>
      </Form>
    </main>
  );
};

export default Login;
