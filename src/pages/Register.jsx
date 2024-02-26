import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordConditions, setPasswordConditions] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validatePasswordConditions(value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePasswordConditions = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const conditionsMet = passwordRegex.test(value);
    setPasswordConditions(conditionsMet);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!passwordConditions) {
        setErrorMessage('Las condiciones de contraseña no se cumplen.');
        return;
      }

      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor.');
      }

      setFormData({ username: '', password: '' });
      setPasswordConditions(false);
      setErrorMessage('');

      window.location.href = '/search';
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al registrar el usuario');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-sm" data-v0-t="card">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Register</h3>
          {passwordConditions && (
            <div className="text-sm text-green-500">
              Las condiciones de contraseña se cumplen.
            </div>
          )}
          {errorMessage && (
            <div className="text-sm text-red-500">
              {errorMessage}
            </div>
          )}
        </div>
        <div className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="username"
                name="username"
                placeholder="Enter your username"
                required=""
                type="text"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative space-y-2">
              <div className="flex items-center">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="ml-auto inline-block text-sm underline cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </a>
              </div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                name="password"
                placeholder="Enter your password"
                required=""
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white h-10 w-full rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
