import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Register.style.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState("");
  let [success, setSucess] = useState("");
  let navigate = useNavigate();
  function registerFn(values) {
    setIsLoading(true);
    axios
      .post("https://task-app-nkax.onrender.com/user/signup", {
        ...values,
      })
      .then((res) => {
        setIsLoading(false);
        setSucess(res.data.Message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.data.Message.writeErrors)
          setError(err.response.data.Message.writeErrors[0].err.errmsg);
        else if (err.response.data.Message === "User is already signed up")
          setError(err.response.data.Message);
      });
  }

  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(25, "UserName should be 25 character at max")
      .min(3, "UserName should be 3 character at min")
      .required("This field is required"),
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

    age: Yup.number()
      .max(75, "Your age must be less that 75")
      .min(12, "Your age must be more tha 12")
      .required("This field is required"),
    gender: Yup.string()
      .required()
      .oneOf(["male", "female"], "This field is required"),
    phone: Yup.string()
      .matches(/01(0|1|2|5)[0-9]{8}/, "Invalid Phone format")
      .required("This field is required"),
  });

  let formik = useFormik({
    initialValues: {
      userName: "",
      Email: "",
      password: "",
      age: "",
      gender: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      registerFn(values);
    },
  });
  return (
    <div
      className="w-50 mx-auto my-5  pt-4 px-5 bg-gradient border rounded-5"
      style={{ backdropFilter: `blur(20px)` }}
    >
      <h3 className="text-center mt-2 text-white">Register</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2 mx-2 ">
          <input
            className="form-control bg-gradient"
            placeholder="Enter Your User Name"
            type="text"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName && formik.touched.userName ? (
            <div className="text-danger py-0 px-2">
              {formik.errors.userName}
            </div>
          ) : (
            ""
          )}
        </div>
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

        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your Phone"
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-danger py-0 px-2">{formik.errors.phone}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your Age"
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.age && formik.touched.age ? (
            <div className="text-danger py-0 px-2">{formik.errors.age}</div>
          ) : (
            ""
          )}
        </div>

        <div className="form-group mb-2 mx-2">
          <label className="text-white">Gender:</label>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            className="ms-3"
            onChange={formik.getFieldProps("gender").onChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="male" className="text-white ms-2">
            Male
          </label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            className="ms-3"
            onChange={formik.getFieldProps("gender").onChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="female" className="text-white ms-2">
            Female
          </label>
          {formik.errors.gender && formik.touched.gender ? (
            <p className={`${styles.meAlert}`}>{formik.errors.gender}</p>
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
            {isLoading ? (
              <i className="fa fa-spin fa-spinner"></i>
            ) : (
              <>Register</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
