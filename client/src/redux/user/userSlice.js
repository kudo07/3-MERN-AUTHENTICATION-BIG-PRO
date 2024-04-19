import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};
const userSlice = createSlice({
  name: 'user',
  //   name of the slice
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
{
  /* <Container maxW="620px">
  <Header />
  <Routes>
    <Route
      path="/"
      element={user ? <HomePage /> : <Navigate to="/auth" />}
    ></Route>
    <Route
      path="/update"
      element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
    />
    <Route
      path="/auth"
      element={!user ? <AuthPage /> : <Navigate to="/" />}
    ></Route>
    <Route path="/:username" element={<UserPage />}></Route>
    <Route path="/:username/post/:pid" element={<PostPage />}></Route>
  </Routes>
  {user && <Logout />}
  {user && <CreatePost />}
  {/* clear cookies with fetch req, clear local storage,clear state */
}
// </Container>; */}
