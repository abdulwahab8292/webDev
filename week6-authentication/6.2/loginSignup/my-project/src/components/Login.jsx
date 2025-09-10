function Login() {
  function submitHandler(){
    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form>
        <div className="w-[400px] bg-white p-8 mx-auto rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Login to Your Account
          </h2>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="mr-2 leading-tight"
            />
            <label htmlFor="remember" className="text-gray-600">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              onClick={submitHandler}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
