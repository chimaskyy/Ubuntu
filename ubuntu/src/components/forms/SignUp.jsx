// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Link } from "react-router-dom";

// export default function SignUpPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
// //   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       // Here you would typically call your API to create a new user
//       console.log("Signing up with:", { email, password });

//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Redirect to login page after successful sign-up
//       router.push("/auth/login");
//     } catch (err) {
//       setError("Failed to create account. Please try again.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
//         <div className="mx-auto w-full max-w-sm lg:w-96">
//           <div className="text-center">
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//               Create your account
//             </h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Or{" "}
//               <Link
//                 to="/auth/login"
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 sign in to your account
//               </Link>
//             </p>
//           </div>

//           <Card className="mt-8">
//             <CardContent className="p-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <Label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email address
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="mt-1"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <Label
//                     htmlFor="password"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Password
//                   </Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     className="mt-1"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <Label
//                     htmlFor="confirmPassword"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Confirm Password
//                   </Label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     className="mt-1"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>

//                 {error && (
//                   <Alert variant="destructive">
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 )}

//                 <div>
//                   <Button type="submit" className="w-full">
//                     Sign up
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       {/* <div className="relative hidden w-0 flex-1 lg:block">
//         <img
//           className="absolute inset-0 h-full w-full object-cover"
//           src="https://images.unsplash.com/photo-1532427259563-32c007050aa2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE5pZ2VyaWFuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
//           width={1920}
//           height={1080}
          
//         />
//       </div> */}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import {
  authenticateWithGoogle,
  signUpWithEmail,
  loginWithEmail,
} from "@/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone:"",
    photo:"",
  });
  const [isLogin, setIsLogin] = useState(false);
 useEffect(() => {
   if (user) {
     navigate("/");
   }
 }, [user, navigate]);
  const handleGoogleAuth = () => dispatch(authenticateWithGoogle());

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginWithEmail({ email: form.email, password: form.password,  }));
    } else {
      dispatch(
        signUpWithEmail({
          email: form.email,
          password: form.password,
          name: form.name,
          phone: form.phone,
          photo: form.photo,

        })
      );
    }
  };

   return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
       <div className="max-w-md w-full space-y-8">
         <Toaster />
         <div className="bg-white shadow-md rounded-lg p-8">
           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
             {isLogin ? "Log in to your account" : "Create your account"}
           </h2>
           {error && (
             <p className="mt-2 text-center text-red-600 text-sm">{error}</p>
           )}
           <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
             {!isLogin && (
               <div className="pt-4">
                 <label htmlFor="name" className="sr-only">
                   Name
                 </label>
                 <input
                   id="name"
                   name="name"
                   type="text"
                   value={form.name}
                   onChange={handleChange}
                   autoComplete="name"
                   required={!isLogin}
                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                   placeholder="Name"
                 />
               </div>
             )}
             <div className="pt-4">
               <label htmlFor="email-address" className="sr-only">
                 Email address
               </label>
               <input
                 id="email-address"
                 name="email"
                 type="email"
                 value={form.email}
                 onChange={handleChange}
                 autoComplete="email"
                 required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="Email address"
               />
             </div>
             <div className="pt-4">
               <label htmlFor="email-address" className="sr-only">
                 Phone Number
               </label>
               <input
                 id="phone-number"
                 name="phone"
                 type="phone"
                 value={form.phone}
                 onChange={handleChange}
                 autoComplete="phone"
                 required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="Phone Number"
               />
             </div>
             <div className="relative pt-4">
               <label htmlFor="password" className="sr-only">
                 Password
               </label>
               <input
                 id="password"
                 name="password"
                 type={showPassword ? "text" : "password"}
                 value={form.password}
                 onChange={handleChange}
                 autoComplete={isLogin ? "current-password" : "new-password"}
                 required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="Password"
               />
               <button
                 type="button"
                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                 onClick={() => setShowPassword(!showPassword)}
               >
                 {showPassword ? (
                   <EyeOffIcon className="h-5 w-5 text-gray-500" />
                 ) : (
                   <EyeIcon className="h-5 w-5 text-gray-500" />
                 )}
               </button>
             </div>

             <div>
               <button
                 type="submit"
                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
               >
                 {status === "loading"
                   ? isLogin
                     ? "Logging In..."
                     : "Signing Up..."
                   : isLogin
                   ? "Log In"
                   : "Sign Up"}
               </button>
             </div>
           </form>

           <div className="mt-6">
             <div className="relative">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-gray-300"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                 <span className="px-2 bg-white text-gray-500">
                   Or continue with
                 </span>
               </div>
             </div>

             <div className="mt-6">
               <button
                 onClick={handleGoogleAuth}
                 className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
               >
                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                   <path
                     fill="currentColor"
                     d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                   />
                 </svg>
                 Continue with Google
               </button>
             </div>
           </div>
         </div>

         <div className="text-center mt-4">
           <p className="text-sm text-gray-600">
             {isLogin ? "Don't have an account? " : "Already have an account? "}
             <button
               onClick={() => setIsLogin(!isLogin)}
               className="font-medium text-blue-600 hover:text-blue-500"
             >
               {isLogin ? "Sign Up" : "Log In"}
             </button>
           </p>
         </div>
       </div>
     </div>
   );
};

export default SignUp;


