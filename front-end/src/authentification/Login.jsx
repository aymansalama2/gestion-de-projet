import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import AvatarIcon from '../assets/icons/1.jpg'; // Assurez-vous d'utiliser la bonne image
import './styles.css'; // Importez votre fichier CSS
import { auth } from '../firebase';  // Importer l'auth Firebase
import { sendPasswordResetEmail } from 'firebase/auth';  // Importer la méthode pour envoyer un email de réinitialisation

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false); // Ajouter un état pour gérer le formulaire de réinitialisation
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);

      if (response.data.success) {
        const userId = response.data.id;
        localStorage.setItem('userId', userId);
        console.log(userId);
        if (credentials.email === 'admin@gmail.com' && credentials.password === '123456') {
          navigate('/admin');
        } else if (credentials.email.endsWith('@employee.com')) {
          navigate('/employee');
        } else {
          navigate('/Profile');
        }
      } else {
        setError('Adresse e-mail ou mot de passe incorrect');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('Erreur réseau : impossible de se connecter au serveur');
      } else {
        setError('Erreur lors de la requête : ' + error.message);
      }
    }

    setLoading(false);
  };

  const handlePasswordReset = async () => {
    if (!credentials.email) {
      setError('Veuillez entrer votre adresse e-mail');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, credentials.email);
      setError('Un e-mail de réinitialisation de mot de passe a été envoyé.');
    } catch (error) {
      setError('Erreur lors de l\'envoi de l\'email : ' + error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-900 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <NavLink to="/" className="text-white font-semibold text-2xl mr-8 hover:text-teal-400 transition duration-300">Gestion de Projet</NavLink>
            <NavLink to="/about" className="text-gray-300 hover:text-white transition duration-300">À Propos</NavLink>
          </div>
          <div>
            <NavLink to="/login" className="text-gray-300 hover:text-white mr-4 transition duration-300">Connexion</NavLink>
            <NavLink to="/signup" className="text-gray-300 hover:text-white transition duration-300">S'inscrire</NavLink>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="bg-image min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto p-8 rounded-lg bg-white shadow-lg flex">
          <div className="w-1/2 flex justify-center items-center">
            <img src={AvatarIcon} alt="Avatar" className="h-auto max-h-full w-full" />
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Welcome back!</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <div className="mb-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={credentials.email}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between mb-5">
                <NavLink to="/signup" className="text-blue-600 hover:text-blue-500 text-sm">Vous n'avez pas de compte ? Inscrivez-vous</NavLink>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setResetPassword(true)}
                  className="text-blue-600 hover:text-blue-500 text-sm"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </form>

            {resetPassword && (
              <div className="mt-5">
                <h3 className="text-lg font-medium text-center">Réinitialiser le mot de passe</h3>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Entrez votre e-mail"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2 px-3 text-gray-700"
                  />
                </div>
                <button
                  onClick={handlePasswordReset}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Réinitialiser le mot de passe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
