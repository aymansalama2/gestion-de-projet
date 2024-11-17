import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-blue-700 min-h-screen">
      <nav className="bg-gray-900 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white font-semibold text-2xl mr-8 hover:text-teal-400 transition duration-300">Gestion de Projet</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">À Propos</Link>
          </div>
          <div>
            <Link to="/login" className="text-gray-300 hover:text-white mr-4 transition duration-300">Connexion</Link>
            <Link to="/signup" className="text-gray-300 hover:text-white transition duration-300">S'inscrire</Link>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <h1 className="text-5xl font-extrabold mb-4 text-white text-center animate__animated animate__fadeIn">À Propos de Gestion de Projet de Tâches</h1>

        <div className="bg-white p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Notre Mission</h2>
          <p className="text-lg text-gray-700 mb-8">
            Notre mission est de fournir une plateforme de gestion de projet de tâches complète et efficace, permettant à nos clients de suivre et de gérer leurs projets de manière transparente et organisée.
          </p>
          
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Nos Valeurs</h2>
          <ul className="list-disc list-inside mb-8 space-y-2">
            <li className="text-lg text-gray-700">Transparence</li>
            <li className="text-lg text-gray-700">Efficacité</li>
            <li className="text-lg text-gray-700">Collaboration</li>
            <li className="text-lg text-gray-700">Innovation</li>
          </ul>
          
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">À Propos de l'Équipe</h2>
          <p className="text-lg text-gray-700 mb-8">
            Notre équipe est composée de professionnels passionnés par la gestion de projet et la technologie. Nous sommes déterminés à fournir à nos clients les meilleurs outils pour optimiser leur productivité et leur succès.
          </p>
          
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Contactez-Nous</h2>
          <p className="text-lg text-gray-700">
            Pour toute question ou demande d'information, n'hésitez pas à nous contacter à l'adresse suivante : <a href="mailto:contact@gestion-projet-taches.com" className="text-teal-600 hover:text-teal-400 transition duration-300">contact@gestion-projet-taches.com</a>.
          </p>
        </div>
      </div>

      <footer className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <p className="text-sm">&copy; 2024 Gestion de Projet de Tâches. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
