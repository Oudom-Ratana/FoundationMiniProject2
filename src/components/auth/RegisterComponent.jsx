import { useForm } from "react-hook-form"
import { useUserRegisterMutation } from "../../services/authApi";
import { useNavigate } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast,ToastContainer } from "react-toastify";
import { GoogleLoginComponent } from "../oauth/GoogleCoponent";
import { GithubLoginComponent } from "../oauth/GithubComponent";


export default function RegisterComponent() {

  const [registerRequest] = useUserRegisterMutation();
  const navigate = useNavigate();

  const formSchema = z.object({
    username: z.string("Enter Username")
      .min(5, { message: "username is required" }),
    email: z.string("Please input")
      .email({ pattern: z.regexes.html5Email }),
    password: z.string()
      .min(6, "At least 6 letters")
      .max(50, "At most 50 letters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password Must contain at least one special character"),
    confirmPassword: z.string()
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
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })


  const handleRegisterSubmit = async (data) => {
    const userRegisterRequest = {
      ...data,
      phoneNumber: "0965150695",
      address: {
        addressLine1: "Phnom Penh",
        addressLine2: "Phnom Penh",
        road: "st 907",
        linkAddress: "N/A",
      },
      profile: "https://i.pinimg.com/236x/69/78/b2/6978b2a6ccaf2fb60a359208044ac394.jpg",
    };
    try {
      const result = await registerRequest({ userRegisterRequest });
      console.log("Register result:", result);
      toast.success("Registered successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 500);
    }
    catch (error) {
      console.log(error);
      toast.error("Registration error!");
    }
  }

  return (
   <div className="flex justify-center items-center min-h-screen bg-white">
    <ToastContainer/>
  <div className="w-full flex items-center justify-center">
    <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Register</h2>
      <form 
        onSubmit={handleSubmit(handleRegisterSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            {...register("username")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Sign up
        </button>
      </form>
      {/* <button className="w-full mt-4 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        Register with Google
      </button> */}

      {/* // Google login */}
      <GoogleLoginComponent label="Register with Google" isRegister={true} />

      {/* // Github login */}
      <GithubLoginComponent label="Register with Github" isRegister={true} />

      <p className="mt-6 text-sm text-center text-gray-600">
        Already have an account?
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
</div>

  )
}
