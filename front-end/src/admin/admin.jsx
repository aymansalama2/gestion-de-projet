import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [selectedTab, setSelectedTab] = useState('projects');
  const [showTasks, setShowTasks] = useState(false); 
  const [users, setUsers] = useState([]);

console.log(projectId)
  const fetchProjectsData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projets`);
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données des projets:', error);
    }
  };
  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/projets/${projectId}`);
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
    }
  };

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/aa`);
      setUsers(response.data);
      const allUsers = response.data;
      const clientUsers = allUsers.filter(user => !user.email.endsWith('@employee.com'));
      const employeeUsers = allUsers.filter(user => user.email.endsWith('@employee.com'));
      setClients(clientUsers);
      setEmployees(employeeUsers);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tasks`);
      setTasks(response.data);
      setShowTasks(true);
      setSelectedTab('taches'); // Sélectionnez automatiquement l'onglet "Tâches" après le chargement des tâches
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };
  
  
  


  useEffect(() => {
    fetchProjectsData();
    fetchUsersData();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/signup');
  };

  const getUserById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.nom : 'Utilisateur inconnu';
  };
  const getUserByIds = (userId) => {
    return users.find(user => user.id === userId);
  };
  

  const renderContent = () => {
    switch (selectedTab) {
      case 'clients':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-8">Liste des clients</h1>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nom</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Téléphone</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {clients.map((client) => (
                  // Check if the email is admin@gmail.com
                  client.email !== 'admin@gmail.com' && (
                    <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{client.nom}</td>
                      <td className="py-3 px-6 text-left">{client.email}</td>
                      <td className="py-3 px-6 text-left">{client.telephone}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        );
      
        case "détails":
        const showProjectDetails = (project) => {
          const detailsMessage = `
            Exemples Sites Web: ${project.exemples_sites_web}
            Exigences Spécifiques: ${project.exigences_specifiques}
            Délai de Livraison: ${project.delai_livraison}
            Budget Alloué: ${project.budget_alloue}
            Fonctionnalités Requises: ${project.fonctionnalites_requises}
            Préférences de Conception: ${project.preferences_conception}
            Technologies Souhaitées: ${project.technologies_souhaitees}
            Description du Projet: ${project.description_projet}
            User ID: ${project.user_id}
            Titre du Projet: ${project.titre_projet}
          `;
          // console.log(detailsMessage);
        };

        // const handleClickDetails = (project) => {
        //   showProjectDetails(project);
        // };

        return (
          <div>
          <h1 className="text-3xl font-bold mb-8">Détails du projet</h1>
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{project.titre_projet}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 mb-2"><strong>Exemples Sites Web:</strong> {project.exemples_sites_web}</p>
                    <p className="text-gray-600 mb-2"><strong>Exigences Spécifiques:</strong> {project.exigences_specifiques}</p>
                    <p className="text-gray-600 mb-2"><strong>Délai de Livraison:</strong> {project.delai_livraison}</p>
                    <p className="text-gray-600 mb-2"><strong>Budget Alloué:</strong> {project.budget_alloue}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2"><strong>Fonctionnalités Requises:</strong> {project.fonctionnalites_requises}</p>
                    <p className="text-gray-600 mb-2"><strong>Préférences de Conception:</strong> {project.preferences_conception}</p>
                    <p className="text-gray-600 mb-2"><strong>Technologies Souhaitées:</strong> {project.technologies_souhaitees}</p>
                    <p className="text-gray-600 mb-2"><strong>User ID:</strong> {project.user_id}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Description du Projet:</strong> {project.description_projet}</p>
              </div>
            </div>
          ))}
        </div>
        
        );

      case 'employees':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-8">Liste des employés</h1>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>

                  <th className="py-3 px-6 text-left">Nom</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Téléphone</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{employee.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{employee.nom}</td>
                    <td className="py-3 px-6 text-left">{employee.email}</td>
                    <td className="py-3 px-6 text-left">{employee.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        case "taches":
          return(
            <div>
              <h1 className="text-3xl font-bold mt-8 mb-8">Liste des tâches</h1>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Label de la tâche</th>
                    <th className="py-3 px-6 text-left">id de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">project_id</th>

                    <th className="py-3 px-6 text-left">Nom de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">Email de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">Statut</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{task.label}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{task.user_id}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{task.project_id}</td>

                      <td className="py-3 px-6 text-left whitespace-nowrap">{getUserByIds(task.user_id)?.nom || 'Utilisateur inconnu'}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{getUserByIds(task.user_id)?.email || 'Email inconnu'}</td>
                      <td className="py-3 px-6 text-left">{task.status ? 'Terminé' : 'En cours'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        
        default:
          return (
            <div>
            <h1 className="text-3xl font-bold mb-8">Liste des projets</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => setSelectedTab('détails')}>
  Voir les détails des projets
</button>


            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre du projet</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de l'utilisateur</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID de l'utilisateur</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{project.titre_projet}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getUserById(project.user_id)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{project.user_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <td className="px-6 py-4 whitespace-nowrap">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105" onClick={() => handleDeleteProject(project.id)}>Supprimer</button>
          </td>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105" onClick={() => navigate(`/gestion_des_taches/${project.id}`)}>Tâches</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          );
        
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <div>
            <button className={`mr-4 ${selectedTab === 'projects' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => setSelectedTab('projects')}>Projets</button>
            <button className={`mr-4 ${selectedTab === 'taches' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => fetchAllTasks()}>Tâches</button>
            <button className={`mr-4 ${selectedTab === 'clients' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => setSelectedTab('clients')}>Clients</button>
            <button className={`mr-4 ${selectedTab === 'employees' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => setSelectedTab('employees')}>Employés</button>
            
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Déconnexion</button>
          </div>
        </div>
      </nav>

      <div className="flex-grow p-6">{renderContent()}</div>
    </div>
  );
}
