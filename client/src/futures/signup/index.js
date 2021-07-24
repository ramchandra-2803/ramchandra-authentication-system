import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Cookies from "cookies-js";

import Form from "../../shared/Form";

const SignUp = () => {
  const [password, setPassword] = useState("password");
  const history = useHistory();

  if (Cookies.get("authSystem")) history.push("/");
  document.querySelector("title").innerHTML = "Sign Up - ramchandra account";

  return (
    <div className="auth my-5">
      <h1 className="heading logo  m-0 mt-2">Create Your Account</h1>
      <h6 className="heading m-0">Sign Up</h6>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const {
            firstName,
            lastname,
            username,
            emailAddress,
            password,
            confirm,
          } = e.target;

          const error = (field, msg) => {
            if (!msg) return field.classList.remove("error");
            field.classList.add("error");
            field.querySelector(".msg.error").innerHTML = msg;
          };

          if (
            !firstName.value ||
            !lastname.value ||
            firstName.value === lastname.value
          )
            return error(
              firstName.parentElement.parentElement,
              "Enter your currect name!"
            );

          error(firstName.parentElement.parentElement);

          if (!username.value || !!!/^[a-z0-9/.]{8,16}$/.exec(username.value))
            return error(
              username.parentElement.parentElement,
              "Choose currect username!"
            );
          error(username.parentElement.parentElement);

          if (
            !emailAddress.value ||
            !!!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.exec(
              emailAddress.value
            )
          )
            return error(
              emailAddress.parentElement.parentElement,
              "Enter valid email address!"
            );
          error(emailAddress.parentElement.parentElement);

          if (
            !password.value ||
            !confirm.value ||
            !!!/^.{8,}$/.exec(password.value)
          )
            return error(
              password.parentElement.parentElement,
              "Create your strong password!"
            );

          if (password.value !== confirm.value)
            return error(
              password.parentElement.parentElement,
              "Con't match your password!"
            );
          error(password.parentElement.parentElement);

          fetch("/account/create/", {
            method: "post",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
              first: firstName.value,
              last: lastname.value,
              email: emailAddress.value,
              username: username.value,
              password: password.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              alert(data.msg);
              if (data.token)
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
        <div className="mb-1 row">
          <Form
            type="text"
            name="firstName"
            value="First name"
            pattern="[A-Za-z]{3,}"
            title="You can use letters"
          />
          <Form
            type="text"
            name="lastname"
            value="Last name"
            pattern="[A-Za-z]{3,}"
            title="You can use letters"
          />
          <div className="msg error m-0"></div>
        </div>
        <div className="mb-2">
          <Form
            type="text"
            name="username"
            value="Choose username"
            pattern="[a-z0-9/.]{8,16}"
            title="You can use letters, numbers & periods"
          />
          <div className="msg error m-1"></div>
          <div className="msg">You can use letters, numbers & periods</div>
        </div>
        <div className="mb-1">
          <Form
            type="email"
            name="emailAddress"
            value="Email address"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Enter valid email address"
          />
          <div className="msg error m-1"></div>
        </div>
        <div className="mb-1 row">
          <Form
            type={password}
            name="password"
            value="Create password"
            pattern=".{8,}"
            title="Use 8 or more characters with a mix of letters, numbers & symbols"
          />
          <Form
            type={password}
            name="confirm"
            value="One more time"
            pattern=".{8,}"
            title="Use 8 or more characters with a mix of letters, numbers & symbols"
          />
          <div className="msg error m-0"></div>
          <div className="msg">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </div>
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
          By clicking Continue, you agree to the ramchandra{" "}
          <a href="#userAgreeMent">User Agreement</a>,{" "}
          <a href="#privacyPOlocy">Privacy Policy</a>, and{" "}
          <a href="#cookiesPolicy">Cookie Policy</a>.
        </div>
        <button className="btn btn-primary my-1">Continue</button>
      </form>
      <p className="text-center mb-1">
        Already on ramchandra? <NavLink to="signin">Sign in</NavLink>
      </p>
    </div>
  );
};

export default SignUp;
