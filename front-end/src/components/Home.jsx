import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="bg-image min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white font-semibold text-xl mr-8">
              Gestion de Projet
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              À Propos
            </Link>
          </div>
          <div>
            <Link to="/login" className="text-gray-300 hover:text-white mr-4">
              Connexion
            </Link>
            <Link to="/signup" className="text-gray-300 hover:text-white">
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-white text-center">
          Gestion de Projet de Tâches
        </h1>
        <p className="text-lg text-white mb-8 text-center">
          Bienvenue sur notre plateforme de gestion de projet de tâches. Notre application vous
          permet de créer, suivre et gérer efficacement vos projets et tâches.
        </p>

        {/* Slider */}
        <Slider {...settings} className="mb-8">
  <div className="text-center">
    <img src="src/assets/photos/3.jpg" alt="Slide 3" className="w-100 h-auto mx-auto rounded-lg" />
  </div>
  <div className="text-center">
    <img src="src/assets/photos/2.jpg" alt="Slide 2" className="w-100 h-auto mx-auto rounded-lg" />
  </div>
  <div className="text-center">
    <img src="src/assets/photos/4.jpg" alt="Slide 4" className="w-100 h-auto mx-auto rounded-lg" />
  </div>
  <div className="text-center">
    <img src="src/assets/photos/6.jpg" alt="Slide 6" className="w-100 h-auto mx-auto rounded-lg" />
  </div>
  <div className="text-center">
    {/* <img src="src/assets/photos/7.jpg" alt="Slide 7" className="w-100 h-auto mx-auto rounded-lg" /> */}
  </div>
</Slider>


        {/* Feature Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Cahier des charges</h2>
            <p className="text-gray-700 mb-4">
              Ce cahier des charges vise à définir les fonctionnalités et les spécifications
              requises pour le développement d'une application de gestion de projet de tâches.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Fonctionnalités Principales</h2>
            <p className="text-gray-700 mb-4">
              Les fonctionnalités principales doivent inclure la création de projet, le suivi de
              projet et la gestion des tâches.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Fonctionnalités Avancées</h2>
            <p className="text-gray-700 mb-4">
              Les fonctionnalités avancées doivent inclure la collaboration sur les tâches, les
              notifications et les rapports/statistiques.
            </p>
          </div>

          {/* Nouvelle section de fonctionnalité */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Nouvelle Fonctionnalité</h2>
            <p className="text-gray-700 mb-4">
              Ajoutez ici une description de la nouvelle fonctionnalité que vous souhaitez inclure.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="flex justify-center">
          <Link
            to="/signup"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full"
          >
            S'inscrire
          </Link>
        </div>
      </div>

      {/* Footer */}
<footer className="bg-gray-800 py-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
    {/* Texte du copyright */}
    <div className="text-white text-center">
      © 2024 Gestion de Projet de Tâches. Tous droits réservés.
    </div>
    
    
  </div>
</footer>

    </div>
  );
};

export default Home;
