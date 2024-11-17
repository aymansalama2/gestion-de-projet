import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../authentification/styles.css';


export default function DemandeClient() {
  const [formData, setFormData] = useState({
    titreProjet: '',
    descriptionProjet: '',
    technologiesSouhaitees: '',
    preferencesConception: '',
    fonctionnalitesRequises: '',
    budgetAlloue: '',
    delaiLivraison: '',
    exigencesSpecifiques: '',
    exemplesSitesWeb: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/projet', {
        titre_projet: formData.titreProjet,
        description_projet: formData.descriptionProjet,
        technologies_souhaitees: formData.technologiesSouhaitees,
        preferences_conception: formData.preferencesConception,
        fonctionnalites_requises: formData.fonctionnalitesRequises,
        budget_alloue: formData.budgetAlloue,
        delai_livraison: formData.delaiLivraison,
        exigences_specifiques: formData.exigencesSpecifiques,
        exemples_sites_web: formData.exemplesSitesWeb,
        user_id: parseInt(localStorage.getItem('userId'), 10),
      });

      console.log(response.data);
      alert('Projet créé avec succès !');
      localStorage.setItem('projetId', response.data.id);

      // Naviguer vers une autre page après la création du projet
      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de la requête :', error.message);
      alert('Erreur lors de la création du projet.');
    }
  };

  return (
    <div className="bg-image min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8  rounded-lg shadow-lg shadow-black">
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold mb-2">Demande de Projet</h2>
          <p className="text-white">Décrivez votre projet</p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Description du projet</h3>
            <div className="mb-4">
              <label htmlFor="titreProjet" className="block text-gray-700 font-semibold mb-2">
                Titre du projet :
              </label>
              <input
                type="text"
                value={formData.titreProjet}
                onChange={handleChange}
                required
                className="form-input w-full"
                id="titreProjet"
                name="titreProjet"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="descriptionProjet" className="block text-gray-700 font-semibold mb-2">
                Description du projet :
              </label>
              <textarea
                value={formData.descriptionProjet}
                onChange={handleChange}
                className="form-textarea w-full"
                id="descriptionProjet"
                name="descriptionProjet"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="technologiesSouhaitees" className="block text-gray-700 font-semibold mb-2">
                Technologies souhaitées :
              </label>
              <input
                type="text"
                value={formData.technologiesSouhaitees}
                onChange={handleChange}
                className="form-input w-full"
                id="technologiesSouhaitees"
                name="technologiesSouhaitees"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="preferencesConception" className="block text-gray-700 font-semibold mb-2">
                Préférences de conception :
              </label>
              <input
                type="text"
                value={formData.preferencesConception}
                onChange={handleChange}
                className="form-input w-full"
                id="preferencesConception"
                name="preferencesConception"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fonctionnalitesRequises" className="block text-gray-700 font-semibold mb-2">
                Fonctionnalités requises :
              </label>
              <input
                type="text"
                value={formData.fonctionnalitesRequises}
                onChange={handleChange}
                className="form-input w-full"
                id="fonctionnalitesRequises"
                name="fonctionnalitesRequises"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="budgetAlloue" className="block text-gray-700 font-semibold mb-2">
                Budget alloué :
              </label>
              <input
                type="number"
                value={formData.budgetAlloue}
                onChange={handleChange}
                className="form-input w-full"
                id="budgetAlloue"
                name="budgetAlloue"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="delaiLivraison" className="block text-gray-700 font-semibold mb-2">
                Délai de livraison :
              </label>
              <input
                type="date"
                value={formData.delaiLivraison}
                onChange={handleChange}
                className="form-input w-full"
                id="delaiLivraison"
                name="delaiLivraison"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exigencesSpecifiques" className="block text-gray-700 font-semibold mb-2">
                Exigences spécifiques :
              </label>
              <input
                type="text"
                value={formData.exigencesSpecifiques}
                onChange={handleChange}
                className="form-input w-full"
                id="exigencesSpecifiques"
                name="exigencesSpecifiques"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exemplesSitesWeb" className="block text-gray-700 font-semibold mb-2">
                Exemples de sites web :
              </label>
              <input
                type="text"
                value={formData.exemplesSitesWeb}
                onChange={handleChange}
                className="form-input w-full"
                id="exemplesSitesWeb"
                name="exemplesSitesWeb"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Envoyer
            </button>
            <button onClick={() => navigate('/profile')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Retour au Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
