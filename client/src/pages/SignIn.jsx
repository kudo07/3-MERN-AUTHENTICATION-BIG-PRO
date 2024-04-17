import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SIGNIN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="font-bold text-pink-500 hover:text-black p-4 hover:bg-violet-200 rounded-lg cursor-pointer"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="font-bold text-pink-500 hover:text-black p-4 hover:bg-violet-200 rounded-lg cursor-pointer"
        />
        <button
          disabled={loading}
          className="font-bold text-pink-500 hover:text-black p-4 hover:bg-violet-200 rounded-lg cursor-pointer hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'LOADING...' : 'SIGNIN'}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="bold">Don&apos;t have an account ?</p>
        <Link to="/sign-up">
          <span className="bold underline text-violet-400">SIGNUP</span>
        </Link>
      </div>
      <p className="text-red-500 mt-5">{error && 'Something Went Wrong'}</p>
    </div>
  );
};

export default SignIn;
