'use client';

import ProjectCard from './_components/ProjectCard';
import ModalBox from '../_components/ModalBox';
import Form from './_components/ProjectForm';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import fetchProjects from '../actions/fetchProjects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    async function getAllProjects() {
      setLoading(true);
      try {
        const result = await fetchProjects();
        console.log(result)
        if (result) {
          setProjects(result);
        } else {
          setErrorMessage('Error in fetching Projects');
        }
      } catch (error) {
        setErrorMessage(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    getAllProjects();
  }, []);

  // Function to refresh the projects list
  const refreshProjects = async () => {
    setLoading(true);
    try {
      const result = await fetchProjects();
      if (result) {
        setProjects(result);
      } else {
        setErrorMessage('Error in fetching Projects');
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-8 bg-neutral-50 text-white">
      {errorMessage && <h1>{errorMessage}</h1>}
      <div className="flex justify-between items-center px-8">
        <h1 className="text-2xl font-medium">Projects</h1>
        <ModalBox
          name="New Project"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)} // Toggle modal state
        >
          <Form
            onFormSubmit={() => {
              setIsModalOpen(false); // Close the modal
              refreshProjects(); // Refresh the projects list
            }}
          />
        </ModalBox>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {projects && projects.map((project, index) => (
            <div key={index}>
              <Link href={`/dashboard/${project.project_id}`}>
                <ProjectCard
                  title={project.project_name}
                  description={project.description}
                  created_at={project.created_at}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
