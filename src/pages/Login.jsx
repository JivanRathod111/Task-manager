import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "/img1.jpg";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 w-full h-[100vh] rounded-[8px] overflow-hidden">
      <div className="flex w-full h-full justify-start md:p-4">
       
        <div
          className="hidden md:block w-[689px] rounded-[10px] bg-cover bg-center mr-[40px]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        
        <div className="w-[390px] px-10 py-4 rounded-[16px] flex flex-col justify-center gap-2 bg-white ">
          <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
          <p className="text-xs text-gray-500">Login to your account to continue.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="mt-3 space-y-3">
               
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="you@example.com"
                  />
                  <div className="min-h-[18px]">
                    <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>
                </div>

             
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-1.5 pr-10 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="min-h-[18px]">
                    <ErrorMessage name="password" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>
                </div>

        
                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium py-2 rounded-lg"
                >
                  Sign In
                </button>

            
                <p className="text-xs text-center text-gray-600">
                  Don’t have an account?{" "}
                  <a href="/signup" className="text-indigo-600 font-medium hover:underline">
                    Sign up
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
