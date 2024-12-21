import React, { useEffect, useState } from 'react';
import isAuthenthicated, { register } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';



const RegisterForm = () => {

    useEffect(() => {
        if(isAuthenthicated()){
            navigate('/home');
        }
    });

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        username : '',
        password : '',
        email : ''
    });

    interface FormData{
        username:string;
        password:string;
        email:string;
    }
    const [errors, setErrors] = useState<FormData>({
        username : '',
        password: '',
        email : ''
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
        if (!formData.email) {
          newErrors.email = 'El correo electrónico es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'El correo electrónico no es válido.';
        }
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
            const data = await register(formData);
            localStorage.setItem("token", data.token);
            setSuccessMessage('Usuario registrado exitosamente.');
            setFormData({ username: '', password: '',  email: '' }); 
            setErrors({username: '', password: '',  email: ''});
            navigate('/home')
        }catch (error: any) {
            setErrorMessage(error.detail || 'Ocurrió un error al registrar el usuario.');
        }

      };


      const goToLogin = () => {
        navigate('/login');
      }


      return (
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Registro</h1>
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
              <label htmlFor="email" className="block mb-1 font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
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
                onClick={goToLogin}>
                    Ir a Login
                </button>
                <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                >
                Registrarse
                </button>
            </div>
          </form>
        </div>
      );
    };

    export default RegisterForm;


