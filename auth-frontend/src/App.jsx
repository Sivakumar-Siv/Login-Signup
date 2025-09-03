import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSubmit = async () => {
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/login", { email, password });
        setLoggedInUser(res.data.email);
      } else {
        await axios.post("http://localhost:5000/signup", { email, password });
        alert("Account created! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleLogout = () => setLoggedInUser(null);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      {/* Dark overlay with blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Frosted glass card */}
      <div className="relative bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-80 z-10 border border-white/30">
        {loggedInUser ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Welcome 🎉</h2>
            <p className="text-white">You are successfully logged in</p>
            <p className="font-semibold mt-2 text-white">{loggedInUser}</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-white">{isLogin ? "Login" : "Sign Up"}</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-2 bg-white/60 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-2 bg-white/60 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded mb-2 bg-white/60 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
            <p className="mt-4 text-sm text-white">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-blue-300 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
