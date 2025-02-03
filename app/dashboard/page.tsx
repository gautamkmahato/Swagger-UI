'use client';

import ProjectCard from './_components/ProjectCard';
import ModalBox from '../_components/ModalBox';
import Form from './_components/ProjectForm';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import fetchProjects from '../actions/fetchProjects';
import { useUser } from '@clerk/nextjs';

interface Project {
  project_id: string;
  project_name: string;
  description: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isSignedIn, user, isLoaded } = useUser();

  console.log(user);

  // Fetch projects on component mount
  useEffect(() => {
    async function getAllProjects() {
      if (!user) return;
      setLoading(true);
      try {
        const result: Project[] = await fetchProjects(user.id);
        console.log(result);
        if (result) {
          setProjects(result);
        } else {
          setErrorMessage('Error in fetching Projects');
        }
      } catch (error) {
        setErrorMessage(`Error: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    }
    if (isLoaded) {
      getAllProjects();
    }
  }, [user, isLoaded]);

  // Function to refresh the projects list
  const refreshProjects = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const result: Project[] = await fetchProjects(user.id);
      if (result) {
        setProjects(result);
      } else {
        setErrorMessage('Error in fetching Projects');
      }
    } catch (error) {
      setErrorMessage(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
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
          {user && (
            <Form
              onFormSubmit={() => {
                setIsModalOpen(false); // Close the modal
                refreshProjects(); // Refresh the projects list
              }}
              id={user.id}
            />
          )}
        </ModalBox>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.project_id}>
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
