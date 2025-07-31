import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { FaUserTie, FaTags, FaCalendarAlt, FaLayerGroup, FaClipboardList } from 'react-icons/fa';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get(`/projects/${id}`, { withCredentials: true })
      .then((res) => setProject(res.data.project))
      .catch((err) => {
        console.error(err);
        toast.error("Cannot show this project's details.");
      });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-purple-50 to-pink-50">
        <div className="text-gray-500 text-lg">Loading project details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-3">
            {project.projectName}
          </h1>
          <span className="inline-block bg-purple-200 text-purple-800 font-semibold text-sm px-4 py-1 rounded-full shadow">
            {project.status}
          </span>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <InfoCard icon={<FaLayerGroup />} label="Project Type" value={project.projectType} />
          <InfoCard icon={<FaTags />} label="Category" value={project.category} />
          <InfoCard icon={<FaUserTie />} label="Client" value={project.client} />
          <InfoCard icon={<FaCalendarAlt />} label="Date Received" value={formatDate(project.dateReceived)} />
          <InfoCard icon={<FaCalendarAlt />} label="Date Delivered" value={formatDate(project.createdAt)} />
          <InfoCard icon={<FaClipboardList />} label="Last Updated" value={formatDate(project.updatedAt)} />
        </div>

        {/* Timeline Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">📊 Activity Timeline</h2>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-dashed border-gray-300 text-sm text-gray-600">
            No timeline data available.
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow hover:shadow-md transition duration-300">
    <div className="text-purple-600 text-xl mt-1">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-base font-bold text-gray-900">{value || '—'}</p>
    </div>
  </div>
);

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString();
};

export default ProjectDetailsPage;
