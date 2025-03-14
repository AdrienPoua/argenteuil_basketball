"use client";

import { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";
import { 
  Bell, Settings, Calendar, Clock, User, FileText, 
  Activity, TrendingUp, DollarSign 
} from "lucide-react";

// Données simulées pour les graphiques
const monthlyData = [
  { name: "Jan", value: 400 },
  { name: "Fév", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Avr", value: 800 },
  { name: "Mai", value: 700 },
  { name: "Juin", value: 900 }
];

const pieData = [
  { name: "Projet A", value: 40 },
  { name: "Projet B", value: 30 },
  { name: "Projet C", value: 20 },
  { name: "Projet D", value: 10 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Activités récentes simulées
const recentActivities = [
  { id: 1, action: "Document mis à jour", target: "Rapport trimestriel", time: "Il y a 5 min", icon: <FileText size={16} /> },
  { id: 2, action: "Nouvel utilisateur", target: "Marie Durand", time: "Il y a 30 min", icon: <User size={16} /> },
  { id: 3, action: "Réunion planifiée", target: "Planification Q3", time: "Il y a 2 heures", icon: <Calendar size={16} /> },
  { id: 4, action: "Tâche terminée", target: "Mise à jour du site", time: "Il y a 1 jour", icon: <Activity size={16} /> }
];

// Tâches à faire simulées
const todos = [
  { id: 1, title: "Préparer la présentation client", done: false },
  { id: 2, title: "Réviser les spécifications du projet", done: true },
  { id: 3, title: "Rencontre avec l'équipe design", done: false },
  { id: 4, title: "Finaliser le budget Q3", done: false }
];

export default function Page() {
  const [currentTodos, setCurrentTodos] = useState(todos);

  const toggleTodo = (id: number) => {
    setCurrentTodos(currentTodos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header du Dashboard */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={20} />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                MU
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques résumées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow flex items-start">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenus</p>
              <h2 className="text-2xl font-bold">€24,500</h2>
              <p className="text-sm text-green-500">+12% par rapport au mois dernier</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex items-start">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nouveaux utilisateurs</p>
              <h2 className="text-2xl font-bold">145</h2>
              <p className="text-sm text-green-500">+18% par rapport au mois dernier</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex items-start">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Taux de conversion</p>
              <h2 className="text-2xl font-bold">3.6%</h2>
              <p className="text-sm text-red-500">-2% par rapport au mois dernier</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex items-start">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valeur moyenne</p>
              <h2 className="text-2xl font-bold">€168</h2>
              <p className="text-sm text-green-500">+5% par rapport au mois dernier</p>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Performance mensuelle</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Répartition des projets</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activités récentes */}
          <div className="bg-white rounded-lg shadow col-span-2">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Activités récentes</h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="py-4 flex">
                    <div className="mr-4 text-gray-500">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}: <span className="font-bold">{activity.target}</span>
                      </p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock size={12} className="mr-1" /> {activity.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  Voir toutes les activités →
                </button>
              </div>
            </div>
          </div>

          {/* Tâches à faire */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Tâches à faire</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {currentTodos.map(todo => (
                  <li key={todo.id} className="flex items-start">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 rounded border-gray-300 text-indigo-600 mt-0.5 focus:ring-indigo-500"
                    />
                    <span 
                      className={`ml-3 text-sm ${
                        todo.done ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}
                    >
                      {todo.title}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Ajouter une tâche..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
