import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !phone || !password) {
      toast.error("All fields are required!");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits!");
      return;
    }

    const loader = toast.loading("Registering credentials...");

    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, phone, password });
      toast.dismiss(loader);
      toast.success("Registered Successfully!");
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      toast.dismiss(loader);
      toast.error(err.response?.data?.error || "Registration Failed!");
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
    }
  };

  return (
    <div className="register-page">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="welcome-div">
        <h1>Welcome to Digital Notice Board</h1>
        <p>Please register to continue</p>
      </div>
      <div className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/, ''))}
          maxLength={10}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>Already have account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}
