import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const axiosInstance=useAxios()
  useEffect(() => {
    axiosInstance
      .get(`/projects/${id}`,{withCredentials:true})
      .then((res) => setProject(res.data.project))
      .catch((err) => {console.error(err)
         toast.error("cannot show this single card")
      });
  }, [id]);

  if (!project) {
    return (
      <div className="p-6 text-center text-gray-500">Loading project details...</div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{project.projectName}</h1>
      
      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mb-6">
        {project.status}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold">Project Type</p>
          <p>{project.projectType}</p>
        </div>
        <div>
          <p className="font-semibold">Category</p>
          <p>{project.category}</p>
        </div>
        <div>
          <p className="font-semibold">Client</p>
          <p>{project.client}</p>
        </div>
        <div>
          <p className="font-semibold">Date Received</p>
          <p>{new Date(project.dateReceived).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Date Delivered</p>
          <p>{new Date(project.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Last Updated</p>
          <p>{new Date(project.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Activity Timeline</h2>
        <p className="text-gray-500 text-sm">No timeline data available.</p>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
