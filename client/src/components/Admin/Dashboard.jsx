import React, { useEffect, useState } from "react";
import { FaUsers, FaEnvelope, FaClipboardList } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    gymnastics: 0,
    fitness: 0,
    contacts: 0,
    recent: [],
  });
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gymnasticsRes, fitnessRes, contactsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/gymnastics/count`),
          axios.get(`${API_BASE_URL}/api/adult-fitness/count`),
          axios.get(`${API_BASE_URL}/api/contact/count`),
        ]);

        setStats({
          gymnastics: gymnasticsRes.data.count,
          fitness: fitnessRes.data.count,
          contacts: contactsRes.data.count,
          recent: [], 
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaUsers size={24} />
            </div>
            <div>
              <h3 className="text-gray-500">Gymnastics</h3>
              <p className="text-2xl font-bold">{stats.gymnastics}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaUsers size={24} />
            </div>
            <div>
              <h3 className="text-gray-500">Fitness</h3>
              <p className="text-2xl font-bold">{stats.fitness}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FaEnvelope size={24} />
            </div>
            <div>
              <h3 className="text-gray-500">Messages</h3>
              <p className="text-2xl font-bold">{stats.contacts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {stats.recent.length > 0 ? (
          <ul className="divide-y">
            {stats.recent.map((item, index) => (
              <li key={index} className="py-3">
                {item.type}: {item.name} -{" "}
                {new Date(item.date).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
