import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import { useLocation, useNavigate } from "react-router-dom";
import Blog from "./Components/Blog";
import Signup from "./Components/Signup";
import CreateBlog from "./Components/CreateBlog";
import HeaderLower from "./Components/HeaderLower";
import HeaderUpper from "./Components/HeaderUpper";
import Footer from "./Components/Footer";
import { useEffect } from "react";
import PostDetails from "./Components/PostDetails";
import PostDescription from "./Components/PostDescription";
import UserProfile from "./Components/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import "swiper/css";
import Increment from "./Components/Increment";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App1() {
  const location = useLocation();
  const showCreateForm =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/userProfile" ||
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/reset-password");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/blog");
    }
  }, []);
  return (
    <>
      {!showCreateForm && (
        <>
          <HeaderUpper />
        </>
      )}
      <Toaster
        toastOptions={{
          success: {
            style: {
              border: "1px solid green",
            },
          },
          error: {
            style: {
              background: "red",
              border: "1px solid red",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/blogDetails/:id" element={<PostDetails />} />
        <Route path="/postDescription" element={<PostDescription />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/demo" element={<Increment />} />
      </Routes>
      {!showCreateForm && <Footer />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <App1></App1>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
