import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { authenticateWithGoogle, loginWithEmail } from "@/reducers/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  EyeIcon,
  EyeOffIcon,
  Mail,
  Lock,
  ShoppingBag,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await setPersistence(auth, browserLocalPersistence);
    dispatch(loginWithEmail({ email: form.email, password: form.password }))
      .unwrap()
      .catch(() => {
        toast.error(error?.message || "Wrong password or email.");
      });
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left side - Illustration */}
        {/* <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
          <div className="max-w-lg">
            <ShoppingBag className="h-12 w-12 text-primary mb-8" />
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome back to Ubuntu Store
            </h1>
            <p className="text-gray-600 mb-8">
              Log in to your account to access your orders, wishlist, and
              personalized shopping experience.
            </p>
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=1920"
              alt="Shopping illustration"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div> */}

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24">
          <div className="w-full max-w-md space-y-8">
            <Toaster />

            {/* Sign in with Google */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="mt-2 text-gray-600">
                  Sign in to continue shopping
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full py-6"
                onClick={() => dispatch(authenticateWithGoogle())}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-4 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-primary hover:underline font-medium"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
