import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { setAccessToken, setUser } from "../../features/auth/authSlice";
import { baseApi } from "../../services/baseApi";

export const GithubLoginComponent = ({ label = "Continue with Github", isRegister = false }) => {
  // setup login, popup, logout
  const [error, setError] = useState();
  // pending
  const [pending, setIsPending] = useState(false);
  // data (user credential)
  const [userState, setUserState] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create provider
  const provider = new GithubAuthProvider();
  provider.addScope('user:email');

  // useEffect tracking on user credential
  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
      }
    });
    return () => unsubscriber();
  }, []);

  // setup login with github
  const loginWithgithub = async () => {
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("login unsuccessfully");
      }
      const user = res.user;
      console.log("github Info: ", user);

      if (isRegister) {
        await signOut(auth);
        toast.success("Registered with GitHub successfully! Please log in.");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 500);
      } else {
        const token = await user.getIdToken();
        const userObj = {
          displayName: user.displayName || user.email?.split('@')[0] || "GitHub User",
          email: user.email,
          photoURL: user.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        };
        dispatch(setAccessToken(token));
        dispatch(setUser(userObj));
        dispatch(baseApi.util.resetApiState());
        toast.success("Logged in with GitHub successfully!");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    } catch (error) {
      setError(error);
      toast.error("GitHub action failed!");
      console.log(error.message);
      setIsPending(false);
    }
  };

  //logout features
  const githubLogout = async () => {
    setIsPending(false);
    setError(null);
    try {
      await signOut(auth);
      setIsPending(true);
      console.log("Logout successfully!");
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      className="w-full mt-4 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition font-medium"
      onClick={loginWithgithub}
    >
      <img
        src="https://www.svgrepo.com/show/394174/github.svg"
        alt="github"
        className="w-5 h-5 mr-2"
      />
      {label}
    </button>
  );
};