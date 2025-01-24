import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { signUpWithEmail, authenticateWithGoogle } from "@/reducers/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { 
  EyeIcon, 
  EyeOffIcon, 
  Mail, 
  User, 
  Phone, 
  Lock,
  ShoppingBag,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    photo: "",
    
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log("acceptTerms:", acceptTerms);
  }, [acceptTerms]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    dispatch(
      signUpWithEmail({
        email: form.email,
        password: form.password,
        name: form.name,
        phone: form.phone,
        photo: form.photo,
        acceptTerms,
      })
    )
      .unwrap()
      .catch(() => {
        toast.error("Sign-up failed. Please try again.");
      });
  };

  const handleGoogleSignUp = () => {
    dispatch(authenticateWithGoogle())
      .unwrap()
      .catch((error) => {
        toast.error(error.message || "Failed to sign up with Google");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left side - Illustration */}
        {/* <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
          <div className="max-w-lg">
            <ShoppingBag className="h-12 w-12 text-primary mb-8" />
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to Ubuntu Store
            </h1>
            <p className="text-gray-600 mb-8">
              Join our community of shoppers and enjoy exclusive deals,
              personalized recommendations, and seamless shopping experience.
            </p>
            <img
              src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?auto=format&fit=crop&q=80&w=1920"
              alt="Shopping illustration"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div> */}

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24">
          <div className="w-full max-w-md space-y-8">
            <Toaster />

            {/* Sign up with Google */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create Account
                </h2>
                <p className="mt-2 text-gray-600">
                  Start your shopping journey today
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full py-6"
                onClick={handleGoogleSignUp}
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
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

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
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="+234 XXX XXX XXXX"
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => {
                      console.log("Checkbox checked:", checked);
                      setAcceptTerms(checked);
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  status === "loading" ||
                  !form.email ||
                  !form.password ||
                  // !validateEmail(form.email) ||
                  // !validatePassword(form.password) ||
                  !acceptTerms
                }
              >
                {status === "loading" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-4 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className="text-primary hover:underline block"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;