const About = () => {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-500">
        Welcome to my Auth App!
      </h1>
      <p className="mb-4 text-slate-400">
        The HOME , ABOUT data only shown when u login otherwise it shows blank
        page when, So test out the authenticatication U can update the Profile
        Picture and data also which uses firebase to store the images
      </p>
    </div>
  );
};

export default About;
