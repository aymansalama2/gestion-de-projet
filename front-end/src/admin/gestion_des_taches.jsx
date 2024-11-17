import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GestionDesTaches() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [taskInputs, setTaskInputs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les données du projet
  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projets/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du projet:', error);
    }
  };

  // Récupérer la liste des employés
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      const filteredEmployees = response.data.filter(user => user.email.includes('employee.com'));
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchEmployees();
      setLoading(false);
    }
  }, [projectId]);

  const handleAddTaskInput = () => {
    const newInput = { label: '', employeeId: '', id: Math.random().toString(36).substr(2, 9) };
    setTaskInputs(prevInputs => [...prevInputs, newInput]);
  };

  const handleInputChange = (id, value) => {
    const updatedInputs = taskInputs.map(input => (input.id === id ? { ...input, label: value } : input));
    setTaskInputs(updatedInputs);
  };

  const handleEmployeeChange = (id, employeeId) => {
    const updatedInputs = taskInputs.map(input => (input.id === id ? { ...input, employeeId } : input));
    setTaskInputs(updatedInputs);
  };

  const handleStoreInput = async (input) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/tasks`, {
        label: input.label,
        user_id: +input.employeeId,
        project_id: projectId,
      });
      console.log('Tâche enregistrée avec succès');
      // Redirige vers la page d'administration
      navigate('/admin');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la tâche :', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Chargement...</div>;
  }

  return (
    <div className="bg-image container mx-auto px-4 py-8">
      <h1 className="text-white text-3xl font-bold mb-8">
        Gestion des tâches pour le projet "{project ? project.titre_projet : 'Chargement...'}"
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Tâches du projet</h2>
          {/* Afficher ici les tâches existantes */}
          {project && project.tasks ? (
            <ul className="text-white">
              {project.tasks.map((task) => (
                <li key={task.id} className="mb-2">
                  {task.label} - Assignée à : {task.user_nom || 'Non assignée'}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">Aucune tâche trouvée.</p>
          )}
        </div>
        <div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-xl font-semibold mb-4">Ajouter une tâche</h2>
            {taskInputs.map((input) => (
              <div key={input.id} className="mb-4">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Entrez la tâche"
                  value={input.label}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                />
                <select
                  className="input-field mt-2"
                  onChange={(e) => handleEmployeeChange(input.id, e.target.value)}
                >
                  <option value="">Sélectionnez un employé</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.nom}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleStoreInput(input)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Enregistrer
                </button>
              </div>
            ))}
            <button
              onClick={handleAddTaskInput}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter une tâche
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
