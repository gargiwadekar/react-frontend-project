import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const loader = toast.loading("Checking credentials...");

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      toast.dismiss(loader);
      toast.success("Login Successful!");
      localStorage.setItem('token', res.data.token);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      toast.dismiss(loader);
      toast.error(err.response?.data?.error || "Login Failed!");
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="login-page">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="welcome-div">
        <h1>Welcome to Digital Notice Board</h1>
        <p>Please login to continue</p>
      </div>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
