import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AvatarIcon from '../assets/icons/1.jpg';
import '../authentification/styles.css';

export default function PageClient() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/signup');
  };

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
      setUser(userResponse.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const projectsResponse = await axios.get(`http://127.0.0.1:8000/api/projets/${userId}`);
      setUserProjects(projectsResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets de l'utilisateur :", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchUserData();
    fetchUserProjects();
  }, []);

  if (loading) {
    return <div className="loading">Chargement en cours...</div>;
  }

  return (
    <section className="bg-image min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Bienvenue sur votre page Client !</h1>
        <p className="text-white">Voici les projets auxquels vous êtes associé :</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center relative">
                <div className="relative inline-block w-16 h-16 overflow-hidden bg-blue-700 rounded-full">
                  <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xl">
                    {user.nom ? user.nom.substring(0, 2).toUpperCase() : 'nom'}
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold mb-2">{user.nom}</h2>
                <p className="text-gray-600 mb-2"><span className="font-bold text-primary">Domaine:</span> {user.domain}</p>
                <p className="text-gray-600 mb-2"><span className="font-bold text-primary">Email:</span> {user.email}</p>
                <p className="text-gray-600 mb-2"><span className="font-bold text-primary">Telephone:</span> {user.telephone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Liste des projets</h2>
              {userProjects.length === 0 ? (
                <p>Aucun projet.</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-primary">Nom</th>
                      <th className="border px-4 py-2 text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProjects.map((projet, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{projet.titre_projet}</td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => openModal(projet)}
                            className="text-blue-600 hover:underline"
                          >
                            Voir les détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-8 flex justify-between">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Déconnexion</button>
                <button onClick={() => navigate("/DemandeClient")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Ajouter un projet</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">{selectedProject.titre_projet}</h2>
            <p><strong>Description:</strong> {selectedProject.description_projet || 'Non spécifié'}</p>
            <p><strong>Technologies souhaitées:</strong> {selectedProject.technologies_souhaitees || 'Non spécifié'}</p>
            <p><strong>Préférences de conception:</strong> {selectedProject.preferences_conception || 'Non spécifié'}</p>
            <p><strong>Fonctionnalités requises:</strong> {selectedProject.fonctionnalites_requises || 'Non spécifié'}</p>
            <p><strong>Budget alloué:</strong> {selectedProject.budget_alloue || 'Non spécifié'}</p>
            <p><strong>Délai de livraison:</strong> {selectedProject.delai_livraison || 'Non spécifié'}</p>
            <p><strong>Exigences spécifiques:</strong> {selectedProject.exigences_specifiques || 'Non spécifié'}</p>
            <p><strong>Exemples de sites web:</strong> {selectedProject.exemples_sites_web || 'Non spécifié'}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
