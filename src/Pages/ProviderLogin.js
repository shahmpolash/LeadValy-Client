import React, { useState } from "react";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Shared/Loading";

const ProviderLogin = () => {
  const location = useLocation();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, , signInLoading] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [loginError, setLoginError] = useState(null);
  const [userMail] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      // Fetch the JWT token from the server after successful login
      const response = await fetch('https://dry-inlet-34467-1e797feb3813.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify({ email: data.email, password: data.password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const { token } = await response.json();
        // Store the JWT token in localStorage
        localStorage.setItem('token', token);
      }

      navigate("/");
    } catch (error) {
      setLoginError("Incorrect email or password. Please try again.");
    }
    setLoading(false);
  };

  if (userMail) {
    navigate("/");
    return null;
  }

  const from = location.state?.from?.pathname || "/";
  if (loading || gLoading) {
    return <Loading />;
  }

  if (user || gUser) {
    navigate(from, { replace: true });
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div id="wrapper" className="theme-cyan">
      <div className="vertical-align-wrap">
        <div className="vertical-align-middle auth-main">
          <div className="auth-box">
            <div className="top">
              <img src="assets/images/logo-white.svg" alt="Iconic" />
            </div>
            <div className="card">
              <div className="header">
                <p className="lead">Login to your account</p>
              </div>
              <div className="body">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <form
                        className="form-auth-small"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="form-group">
                          <label
                            htmlFor="signin-email"
                            className="control-label sr-only"
                          >
                            Email
                          </label>
                          <input
                            {...register("email", { required: true })}
                            aria-invalid={errors.email ? "true" : "false"}
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="signin-password"
                            className="control-label sr-only"
                          >
                            Password
                          </label>
                          <input
                            {...register("password", { required: true })}
                            aria-invalid={errors.password ? "true" : "false"}
                            type="password"
                            placeholder="Enter your password"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group clearfix">
                          <label className="fancy-checkbox element-left">
                            <input type="checkbox" />
                            <span>Remember me</span>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                        >
                          LOGIN
                        </button>
                        <div className="bottom">
                          <span>
                            Don't have an account?{" "}
                            <Link to="/register">Register</Link>
                          </span>
                        </div>
                      </form>

                    <div className="separator-linethrough">
                      <span>OR</span>
                    </div>
                    <button onClick={handleGoogleSignIn} className="btn btn-signin-social" fdprocessedid="hspnuj">
                      <i className="fa fa-google google-color" />
                      Sign in with Google
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderLogin;
