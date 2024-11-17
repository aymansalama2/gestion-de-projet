import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCity } from '@fortawesome/free-solid-svg-icons';
// import "tailwindcss/animate.css";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <Footer />
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Your Website</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-300">Accueil</Link></li>
          <li><Link to="/services" className="text-white hover:text-gray-300">Services</Link></li>
          <li><Link to="/about" className="text-white hover:text-gray-300">À Propos</Link></li>
          <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

const FirstSection = () => {
  const numberOfClients = 1000;

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Bienvenue sur notre site web</h2>
        <p className="text-lg mb-8">Nous avons servi plus de {numberOfClients} clients à travers le monde. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="flex justify-center">
          <div className="w-1/3 mr-4 relative">
            <input type="text" placeholder="Recherche" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500" />
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-500" />
          </div>
          <div className="w-1/3 mr-4 relative">
            <input type="text" placeholder="Ville" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500" />
            <FontAwesomeIcon icon={faCity} className="absolute left-3 top-3 text-gray-500" />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Recherche</button>
        </div>
        <p className="mt-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </section>
  );
};

const SecondSection = () => {
  return (
    <section className="bg-gray-200 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Nos Partenaires Technologiques</h2>
        <div className="flex justify-center items-center space-x-8">
          <LogoCard logo="/logo1.png" title="Techno Company 1" />
          <LogoCard logo="/logo1.png" title="Tech Innovations" />
          <LogoCard logo="/logo1.png" title="Future Tech Solutions" />
          <LogoCard logo="/logo1.png" title="Innovative Technologies" />
        </div>
      </div>
    </section>
  );
};

const LogoCard = ({ logo, title }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="w-48 h-48 bg-white p-4 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
    >
      <img src={logo} alt={title} className="w-full h-24 mx-auto mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </motion.div>
  );
};

const ThirdSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Services en Vedette</h2>
        <div className="grid grid-cols-4 gap-8">
          <ServiceCard title="Service 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          <ServiceCard title="Service 2" description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          <ServiceCard title="Service 3" description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
          <ServiceCard title="Service 4" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
      <Link to="/services" className="text-blue-500 mt-2 inline-block">En savoir plus</Link>
    </div>
  );
};

const FourthSection = () => {
  return (
    <section className="bg-cover bg-center py-40" style={{backgroundImage: "url('/background.jpg')"}}>
      <div className="container mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-4 bg-red">Découvrez Nos Offres Spéciales</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded">Connexion</button>
      </div>
    </section>
  );
};

const FifthSection = () => {
  return (
    <section className="bg-gray-300 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Contenu de la Cinquième Section</h2>
         
      </div>
    </section>
  );
};

const SixthSection = () => {
  return (
    <section className="bg-gray-400 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Contenu de la Sixième Section</h2>
              </div>
    </section>
  );
};

const SeventhSection = () => {
  return (
    <section className="bg-gray-500 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Contenu de la Septième Section</h2>
               </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Informations de Contact</h2>
          <p>Adresse: 123 Rue de la République, 75001 Paris</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
          <p>Email: contact@votresite.com</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Liens Utiles</h2>
          <ul>
            <li><Link to="/about" className="text-white hover:text-gray-300">À Propos</Link></li>
            <li><Link to="/services" className="text-white hover:text-gray-300">Services</Link></li>
            <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 Your Website. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Home;
