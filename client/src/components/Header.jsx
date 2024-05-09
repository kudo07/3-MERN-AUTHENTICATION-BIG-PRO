import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold  text-pink-500 hover:text-black p-1 hover:bg-pink-500 rounded-lg cursor-pointer">
            AUTH-APP
          </h1>
        </Link>

        <ul className="flex  gap-4 ">
          <Link to="/">
            <li className="font-bold text-pink-500 hover:text-black p-1 hover:bg-pink-500 rounded-lg cursor-pointer ">
              HOME
            </li>
          </Link>
          <Link to="/about">
            <li className="font-bold text-pink-500 hover:text-black p-1 hover:bg-pink-500 rounded-lg cursor-pointer ">
              ABOUT
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li className="font-bold  text-pink-500 hover:text-black p-1 hover:bg-pink-500 rounded-lg cursor-pointer">
                SIGNIN
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
