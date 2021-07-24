import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Form from "../../shared/Form";

import Cookies from "cookies-js";

const SignIn = () => {
  const [password, setPassword] = useState("password");
  const history = useHistory();

  if (Cookies.get("authSystem")) history.push("/");
  document.querySelector("title").innerHTML = "Sign Up - ramchandra account";

  return (
    <div className="auth my-5">
      <h1 className="heading logo  m-0 mt-2">Login Your Account</h1>
      <h6 className="heading m-0">Sign In</h6>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const { username, password } = e.target;

          const error = (field, msg) => {
            if (!msg) return field.classList.remove("error");
            field.classList.add("error");
            field.querySelector(".msg.error").innerHTML = msg;
          };

          if (!username.value || !!!/^[a-z0-9/.]{8,16}$/.exec(username.value))
            return error(
              username.parentElement.parentElement,
              "Enter currect username!"
            );

          error(username.parentElement.parentElement);

          if (!password.value)
            return error(
              password.parentElement.parentElement,
              "Enter your password!"
            );
          error(password.parentElement.parentElement);

          fetch("/account/signin/", {
            method: "post",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
              username: username.value,
              password: password.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data.token) alert(data.msg);

              if (data.token) {
                Cookies.set("authSystem", data.token, {
                  path: "/",
                  httpOnly: true,
                  expires: new Date(Date.now() + 604800000),
                });
                return window.location.reload();
              }
            });
        }}
        className="mt-2"
      >
        <div className="mb-2">
          <Form type="text" name="username" value="Username" title="Username" />
          <div className="msg error m-1"></div>
        </div>
        <div className="mb-1">
          <Form
            type={password}
            name="password"
            value="Password"
            title="Password"
          />
          <div className="msg error m-1"></div>
        </div>

        <div className="mb-1">
          <input
            type="checkbox"
            name="show_hide"
            id="show_hide"
            onChange={() =>
              password === "password"
                ? setPassword("text")
                : setPassword("password")
            }
          />
          <label htmlFor="show_hide" className="label">
            {password === "password" ? "Show" : "Hide"} Password
          </label>
        </div>
        <div className="msg text-center my-2">
          Not your computer? Use Guest mode to sign in privately.
        </div>
        <button className="btn btn-primary my-1">Continue</button>
      </form>
      <p className="text-center mb-1">
        New to ramchandra? <NavLink to="Signup">Create One</NavLink>
      </p>
      <p className="text-center mb-1">
        <NavLink to="forgotpassword">Forgot password</NavLink>
      </p>
    </div>
  );
};

export default SignIn;
