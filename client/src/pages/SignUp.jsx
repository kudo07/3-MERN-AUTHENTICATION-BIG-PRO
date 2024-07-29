import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      // to reset when we submit the form again
      // console.log(formData);
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      console.log(data.error);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="bold underline  text-pink-500 hover:text-black p-1 hover:bg-pink-800 rounded-lg  text-3xl text-center font-semibold my-7">
        {/* SIGNUP&apos; */}
        SIGNUP
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="font-bold text-pink-500 hover:text-black p-4 hover:bg-violet-200 rounded-lg cursor-pointer"
          onChange={handleChange}
        />
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
          {loading ? 'LOADING...' : 'SIGNUP'}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="bold">Have An Account?</p>
        <Link to="/sign-in">
          <span className="bold underline text-violet-400">SIGNIN</span>
        </Link>
      </div>
      <p className="text-red-500 mt-5">{error.message}</p>
    </div>
  );
};

export default SignUp;
