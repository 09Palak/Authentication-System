import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, AlertCircle, CheckCircle, Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log('Username updated:', e.target.value);
    
    // Clear error for this field when user starts typing
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: '' }));
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log('Password updated: [hidden for security]');
    
    // Clear error for this field when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginSuccess(false);
    setIsSubmitted(true);

    console.log('=== LOGIN FORM SUBMISSION ===');
    console.log('Username:', username);
    console.log('Password: [hidden for security]');
    console.log('Remember Me:', rememberMe);

    // Validate form
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // If validation passes, show success
      console.log('✅ Validation passed! User can proceed to authentication.');
      console.log('Form Data:', {
        username: username,
        password: '••••••',
        rememberMe: rememberMe,
        timestamp: new Date().toLocaleString()
      });

      setLoginSuccess(true);
      setErrors({});

      // Reset form after 2 seconds
      setTimeout(() => {
        setUsername('');
        setPassword('');
        setRememberMe(false);
        setIsSubmitted(false);
        setLoginSuccess(false);
      }, 2000);
    } else {
      // If validation fails, show errors
      console.log('❌ Validation failed. Errors:', newErrors);
      setErrors(newErrors);
    }
  };

  // Handle clear form
  const handleClearForm = () => {
    setUsername('');
    setPassword('');
    setRememberMe(false);
    setErrors({});
    setIsSubmitted(false);
    setLoginSuccess(false);
    console.log('Form cleared by user');
  };

  // Handle demo credentials
  const handleDemoLogin = () => {
    setUsername('demouser');
    setPassword('demo123');
    console.log('Demo credentials loaded: username=demouser, password=demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
            <LogIn className="w-12 h-12 text-white mx-auto mb-3" />
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <p className="text-blue-100 mt-2">Enter your credentials to continue</p>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8">
            {/* Success Message */}
            {loginSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Login Successful!</h3>
                  <p className="text-sm text-green-700">Welcome, {username}!</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-5">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter your username"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.username
                        ? 'border-red-500 focus:ring-red-500 bg-red-50'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                </div>
                {errors.username && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.username}
                  </div>
                )}
                {username && !errors.username && (
                  <p className="text-xs text-gray-500 mt-1">✓ Username looks good</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? 'border-red-500 focus:ring-red-500 bg-red-50'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </div>
                )}
                {password && !errors.password && (
                  <p className="text-xs text-gray-500 mt-1">✓ Password looks good</p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                    console.log('Remember Me:', e.target.checked);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Remember me for next time
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Login
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-2">
            <button
              onClick={handleClearForm}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Clear
            </button>
            <button
              onClick={handleDemoLogin}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Use Demo
            </button>
          </div>
        </div>

        {/* Console Info Box */}
        <div className="mt-6 bg-gray-800 text-gray-100 rounded-lg p-4 text-xs font-mono">
          <p className="font-semibold text-blue-400 mb-2">📋 Form State Console</p>
          <div className="space-y-1 text-gray-300">
            <p>Username: <span className="text-green-400">{username || '(empty)'}</span></p>
            <p>Password: <span className="text-green-400">{password ? '••••••' : '(empty)'}</span></p>
            <p>Errors: <span className={Object.keys(errors).length > 0 ? 'text-red-400' : 'text-green-400'}>
              {Object.keys(errors).length > 0 ? JSON.stringify(errors) : 'None'}
            </span></p>
            <p>Submitted: <span className="text-yellow-400">{isSubmitted ? 'Yes' : 'No'}</span></p>
            <p className="text-gray-400 mt-2">👉 Check browser console for detailed logs</p>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Demo Credentials: <span className="font-mono font-semibold">demouser / demo123</span>
        </p>
      </div>
    </div>
  );
}
