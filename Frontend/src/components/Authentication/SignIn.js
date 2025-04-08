import React, { useState, useContext } from 'react';
import email from '../../assets/email.png';
import password from '../../assets/password.png';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const SignIn = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/signin", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      setIsAuthenticated(true);
      alert("Successfully Signed In");
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className=" bg-secondary-dark flex items-center justify-center px-4 py-10">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-primary-dark p-8 sm:p-10 rounded-lg shadow-2xl flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-300">Welcome Back</h1>
          <p className="text-slate-500 text-base">Sign in to access personalized deals and trusted reviews.</p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border border-slate-500 rounded-lg p-2 bg-primary-dark shadow">
          <img className="w-8 p-1 bg-secondary-dark rounded" src={email} alt="email" />
          <input
            className="flex-1 bg-transparent text-slate-400 placeholder-slate-500 focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 border border-slate-500 rounded-lg p-2 bg-primary-dark shadow">
          <img className="w-8 p-1 bg-secondary-dark rounded" src={password} alt="password" />
          <input
            className="flex-1 bg-transparent text-slate-400 placeholder-slate-500 focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        {/* Sign Up Redirect */}
        <div className="text-right text-sm text-slate-400">
          <Link to="/signup" className="hover:text-slate-200">Don't have an account?</Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-md py-2 font-medium shadow-lg transition-all"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
