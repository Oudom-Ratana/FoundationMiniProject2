import { useForm } from "react-hook-form"
import { useUserLoginMutation } from "../../services/authApi";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken, setUser } from "../../features/auth/authSlice";
import { GoogleLoginComponent } from "../oauth/GoogleCoponent";
import { GithubLoginComponent } from "../oauth/GithubComponent";

import { baseApi } from "../../services/baseApi";

export default function LoginComponent() {
  // define useForm
  const [loginRequest] = useUserLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = z.object({
    email: z.string("Please input")
      .email({ pattern: z.regexes.html5Email }),
    password: z.string()
      .min(6, "At least 6 letters")
      .max(50, "At most 50 letters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password Must contain at least one special character"),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLoginSubmit = async (data) => {
    try {
      const response = await loginRequest({
        userLoginRequest: data
      });
      if (response?.data?.accessToken) {
        toast.success("Login Successfully!!");
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setRefreshToken(response.data.refreshToken));
        const userObj = {
          email: data.email,
          displayName: data.email.split('@')[0],
          photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        };
        dispatch(setUser(userObj));
        dispatch(baseApi.util.resetApiState());
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        toast.error("Login Failed!!");
      }
    } catch (error) {
      toast.error("Login Failed!!");
    }
  }

  return (
    <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
      <div className=" rounded-2xl flex max-w-3xl p-5 items-center">
        <ToastContainer />
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you already a member, easily log in now.
          </p>
          <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-6 items-center text-gray-500">
            <hr className="border-gray-300" />
            <p className="text-center text-sm my-2">OR</p>
            <hr className="border-gray-300" />
          </div>
          
          <GoogleLoginComponent label="Login with Google" />
          <GithubLoginComponent label="Login with Github" />

          <div className="mt-6 text-sm">
            Forget password?
          </div>
          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0">If you don't have an account..</p>
            <button className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
              <a href="/auth/register" className="text-white hover:underline">
                Register
              </a>
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="login form image"
          />
        </div>
      </div>
    </section>
  )
}
