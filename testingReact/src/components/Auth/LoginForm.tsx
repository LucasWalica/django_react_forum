import React, { useEffect, useState } from 'react';
import isAuthenthicated, { login } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {

    useEffect(() => {
        if(isAuthenthicated()){
            navigate('/home');
        }
    })
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username : '',
        password : '',
    });

    interface FormData{
        username:string;
        password:string;
    }
    const [errors, setErrors] = useState<FormData>({
        username : '',
        password: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.username) newErrors.username = 'El nombre de usuario es requerido.';
        if (!formData.password) {
          newErrors.password = 'La contraseña es requerida.';
        } else if (formData.password.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit= async (e :React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        if(!validateForm()) return;

        try{
            const data = await login(formData);
            localStorage.setItem("token", data.token);
            console.log(data.token);
            setSuccessMessage('Usuario logueado exitosamente.');
            setFormData({ username: '', password: ''}); 
            setErrors({username: '', password: ''});
            navigate('/home');
        }catch (error: any) {
            setErrorMessage(error.detail || 'Ocurrió un error al loguear el usuario.');
        }

      };

    

      const goToRegister = () => {
        navigate('/');
      }


      return (
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {successMessage && (
            <div className="p-2 bg-green-100 text-green-700 mb-4 rounded">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="p-2 bg-red-100 text-red-700 mb-4 rounded">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.username && (
                <span className="text-sm text-red-500">{errors.username}</span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button className="w-full p-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                onClick={goToRegister}>
                    Ir a register
                </button>
                <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                >
                    Loggearse
                </button>
            </div>
          </form>
        </div>
      );
    };

    export default LoginForm;


