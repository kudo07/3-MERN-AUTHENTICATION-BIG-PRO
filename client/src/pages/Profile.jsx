import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
const Profile = () => {
  // states
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(image);
  //
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  //
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  //
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  //
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">PROFILE</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              ERROR uploading image (file must less than 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent == 100 ? (
            <span className="text-green-400">Image Uploaded Successfully</span>
          ) : (
            ''
          )}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="USERNAME"
          className="font-bold text-pink-500 hover:text-black p-4
        hover:bg-violet-200 rounded-lg cursor-pointer"
          onChange={handleChange}
        />

        <input
          defaultValue={currentUser.email}
          type="text"
          id="email"
          placeholder="email"
          className="font-bold text-pink-500 hover:text-black p-4
        hover:bg-violet-200 rounded-lg cursor-pointer"
          onChange={handleChange}
        />

        <input
          type="text"
          id="password"
          placeholder="password"
          className="font-bold text-pink-500 hover:text-black p-4
        hover:bg-violet-200 rounded-lg cursor-pointer"
          onChange={handleChange}
        />
        <button className="bg-purple-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-purple-200">Deleted Account</span>
        <span className="text-purple-200">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong!!'}</p>
      <p>{}</p>
    </div>
  );
};

export default Profile;
