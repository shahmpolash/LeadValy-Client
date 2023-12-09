import React, { useState, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Shared/Loading";

const ProviderRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  let signInError;

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(data.email, data.password);
      navigate("/seller-update-profile");
    } catch (error) {
      console.error("Registration Error:", error);
      setLoginError(error.message);
    }
  };

  if (loading || gLoading) {
    return <Loading />;
  }

  if (error || gError) {
    signInError = (
      <p className="text-red-500 text-center">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  if (user || gUser) {
    const from = location.state?.from?.pathname || "/seller-update-profile";
    navigate(from, { replace: true });
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <>
      <div id="wrapper" className="theme-cyan">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top">
                <img src="assets/images/logo-white.svg" alt="Iconic" />
              </div>
              <div className="card">
                <div className="header">
                  <p className="lead">Create an account</p>
                </div>
                <div className="body">
                  <form
                    className="form-auth-small"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <label
                        htmlFor="signup-email"
                        className="control-label sr-only"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="usernameInput"
                        placeholder="Enter your Email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is Required",
                          },
                          pattern: {
                            value: /[A-Za-z]{3}/,
                            message: "Provide a Valid Email",
                          },
                        })}
                      />
                      <label className="label">
                        {errors.email?.type === "required" && (
                          <span className="label-text-alt text-red-500">
                            {errors.email.message}
                          </span>
                        )}
                        {errors.email?.type === "pattern" && (
                          <span className="label-text-alt text-red-500">
                            {errors.email.message}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="signup-password"
                        className="control-label sr-only"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        placeholder="Enter your password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Password is Required",
                          },
                          minLength: {
                            value: 6,
                            message: "Minimum 6 Characters",
                          },
                        })}
                      />
                      <label className="label">
                        {errors.password?.type === "required" && (
                          <span className="label-text-alt text-red-500">
                            {errors.password.message}
                          </span>
                        )}
                        {errors.password?.type === "minLength" && (
                          <span className="label-text-alt text-red-500">
                            {errors.password.message}
                          </span>
                        )}
                      </label>
                    </div>
                    {signInError}
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      REGISTER
                    </button>
                    <div className="bottom">
                      <span className="helper-text">
                        Already have an account? <Link to="/login">Login</Link>
                      </span>
                    </div>
                  </form>
                  <div className="separator-linethrough">
                    <span>OR</span>
                  </div>
                  <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-signin-social"
                    fdprocessedid="hspnuj"
                  >
                    <i className="fa fa-google google-color" />
                    Sign in with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderRegister;
