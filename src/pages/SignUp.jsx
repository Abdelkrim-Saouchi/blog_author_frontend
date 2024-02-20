import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createAuthor } from "../api/createAuthor";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const error = {};
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");

  if (password !== confirmation) {
    error.isPasswordMismatch = true;
    return error;
  }

  // otherwise create author
  const res = await createAuthor(formData);

  if (res.ok) {
    // if success redirect to login page
    return redirect("/login");
  } else {
    // if users inputs are not valid
    const data = await res.json();
    error.serverErrors = data.errors;
    return error;
  }
};

const SignUp = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  return (
    <main className="flex flex-col items-center p-4">
      <h2 className="mb-4 text-2xl font-bold">Sign up new user</h2>

      {error?.isPasswordMismatch && (
        <p className="mb-4 text-red-600">Password does not match!</p>
      )}

      {error?.serverErrors?.length > 0 && (
        <ul className="mb-4 list-inside list-disc text-red-600">
          {error.serverErrors?.map((element, index) => {
            return <li key={index}>{element.msg}</li>;
          })}
        </ul>
      )}

      <Form
        method="post"
        className="flex flex-col items-center rounded-lg border border-gray-200 p-4 md:px-8"
      >
        <div className="mb-4 flex flex-col">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            required
            className="rounded bg-gray-100 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Smith"
            required
            className="rounded bg-gray-100 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            autoComplete="email"
            className="rounded bg-gray-100 p-2"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="new-password"
            className="rounded bg-gray-100 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="passwordConfirmation">Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="confirmation"
            required
            autoComplete="new-password"
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
              <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
              Processing
            </>
          ) : (
            "Register"
          )}
        </button>
      </Form>
    </main>
  );
};

export default SignUp;
