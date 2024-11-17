import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle, FaGithub, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const userId = parseInt(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isNaN(userId)) {
          const userResponse = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
          setUser(userResponse.data);

          const tasksResponse = await axios.get(`http://127.0.0.1:8000/api/tasks/user/${userId}`);
          setTasks(tasksResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleTaskStatusChange = async (taskId, currentStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}`, { status: !currentStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: !currentStatus } : task))
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  };

  const handleGithubNavigation = () => {
    window.open('https://github.com/', '_blank');
  };

  const handleNotifications = () => {
    alert('Vous avez des notifications.');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/signup');
  };

  const projects = [
    { name: 'Project 1', githubLink: 'https://github.com/' },
    { name: 'Project 2', githubLink: 'https://github.com/' },
    { name: 'Project 3', githubLink: 'https://github.com/' },
  ];

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen">
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4 font-semibold text-xl">
            {user.nom ? user.nom.substring(0, 2).toUpperCase() : '??'}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{user.nom || 'Nom indisponible'}</h2>
            <p className="text-gray-300">{user.domain || 'Domaine non spécifié'}</p>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-gray-400">{user.telephone}</p>
          </div>
        </div>
        <div className="flex items-center">
          <select
            onChange={(e) => window.open(e.target.value, '_blank')}
            className="mr-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Sélectionner un projet</option>
            {projects.map((project, index) => (
              <option key={index} value={project.githubLink}>
                {project.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleNotifications}
            className="mr-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-yellow-300"
          >
            <FaBell className="inline-block mr-2" />
            Notifications
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
          >
            <FaSignOutAlt className="inline-block mr-2" />
            Déconnexion
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Mes Tâches</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition ${
                task.status ? 'opacity-70' : ''
              }`}
            >
              <h2 className="text-xl font-bold text-blue-400 mb-3">{task.label}</h2>
              <p className="text-gray-300 mb-4">Statut : {task.status ? 'Fait' : 'En attente'}</p>
              {!task.status && (
                <button
                  onClick={() => handleTaskStatusChange(task.id, task.status)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300"
                >
                  Commencer la tâche
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            Aucune tâche disponible pour le moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Employee;
