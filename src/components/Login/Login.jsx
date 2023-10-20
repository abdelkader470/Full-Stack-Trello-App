import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { tokenContext } from "../../context/Token";

function Login() {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState("");
  let [success, setSucess] = useState("");
  let navigate = useNavigate();
  let token = useContext(tokenContext);
  function loginFn(values) {
    setIsLoading(true);
    axios
      .post("https://task-app-nkax.onrender.com/user/login", {
        ...values,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsLoading(false);
        token.setToken(res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.data.Message) setError("Incorrect Email or password");
      });
  }
  const validationSchema = Yup.object({
    Email: Yup.string()
      .matches(
        /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/,
        "Invalid Email format"
      )
      .required("This field is required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid Password format"
      )
      .required("This field is required"),
  });

  let formik = useFormik({
    initialValues: {
      Email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginFn(values);
    },
  });
  return (
    <div
      className="w-50 mx-auto my-5  pt-4 px-5 bg-gradient border rounded-5"
      style={{ backdropFilter: `blur(20px)` }}
    >
      <h3 className="text-center mt-2 text-white">Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your Email"
            type="email"
            name="Email"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.Email && formik.touched.Email ? (
            <div className="text-danger py-0 px-2">{formik.errors.Email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-danger py-0 px-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>

        {error ? (
          <div className="mb-2 mx-2 text-danger alert-danger alert py-1 ">
            {error}
          </div>
        ) : (
          ""
        )}
        <div>
          <button
            type="submit"
            className="btn btn-outline-dark my-4 w-50 m-auto d-block rounded-pill border-white"
          >
            {isLoading ? <i className="fa fa-spin fa-spinner"></i> : <>Login</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
