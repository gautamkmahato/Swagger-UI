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

  // Fetch projects on component mount
  useEffect(() => {
    async function getAllProjects() {
      if (!user || !user.id) return; // Ensure user.id is available before proceeding
      setLoading(true);
      try {
        const result: Project[] = await fetchProjects(user.id); // Fetch projects using the authenticated user id
        if (result) {
          setProjects(result);
        } else {
          setErrorMessage('Error fetching Projects');
        }
      } catch (error) {
        setErrorMessage(`Error: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    }
    if (isLoaded && isSignedIn) {
      getAllProjects();
    }
  }, [user, isLoaded, isSignedIn]); // Depend on user, isLoaded, and isSignedIn

  // Function to refresh the projects list
  const refreshProjects = async () => {
    if (!user || !user.id) return; // Ensure user.id is available before proceeding
    setLoading(true);
    try {
      const result: Project[] = await fetchProjects(user.id); // Fetch projects using the authenticated user id
      if (result) {
        setProjects(result);
      } else {
        setErrorMessage('Error fetching Projects');
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
    return <div>Please sign in to view this page</div>;
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
              id={user.id} // Pass the user id to the form
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
