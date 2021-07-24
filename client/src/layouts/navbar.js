import { useHistory } from "react-router";

import Cookies from "cookies-js";

export default function NavBar() {
  const history = useHistory();

  return (
    <div className="navbar">
      <div className="logo" onClick={() => history.push("/")}>
        ramchandra
      </div>
      <div className="buttons">
        {Cookies.get("authSystem") ? (
          <button
            className="btn btn-danegr"
            onClick={() => {
              Cookies.expire("authSystem");
              fetch("/account/signout", {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                  token: Cookies.get("authSystem"),
                }),
              })
                .then((res) => res.json())
                .then((data) => alert(data.msg));

              window.location.reload();
            }}
          >
            Sing Out
          </button>
        ) : (
          <>
            <button
              className="btn btn-white"
              onClick={() => history.push("/signin")}
            >
              Sign In
            </button>
            <button
              className="btn btn-primary"
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
