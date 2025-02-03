'use client';

import DocumentationCard from '../_components/DocumentationCard';
import ModalBox from '../../_components/ModalBox';
import DocumentationForm from '../_components/DocumentationForm';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import fetchDocumentationByProjectId from '../../actions/fetchDocumentationByProjectId';

// Define the type for a single documentation item
interface Documentation {
  api_id: string;
  title: string;
  description: string;
  jsonData: {
    openApi: number;
  };
  created_at: string;
}

export default function ApiDocumentation() {
  const [apiDocumentations, setApiDocumentations] = useState<Documentation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const params = useParams<{ project_id: string }>();
  console.log(params);

  useEffect(() => {
    async function getApiDocumentation() {
      setLoading(true);
      console.log(params.project_id);
      const result = await fetchDocumentationByProjectId(params.project_id);
      console.log(result);
      if (result) {
        setApiDocumentations(result);
        setLoading(false);
      } else {
        console.log(`Error in fetching Projects: ${result}`);
        setErrorMessage(`Error in fetching Projects: ${result}`);
        setLoading(false);
      }
    }
    getApiDocumentation();
  }, [params.project_id]);

  // Function to refresh the projects list
  const refreshProjects = async () => {
    setLoading(true);
    try {
      const result = await fetchDocumentationByProjectId(params.project_id);
      if (result) {
        setApiDocumentations(result);
      } else {
        setErrorMessage('Error in fetching Projects');
      }
    } catch (error: any) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div className="p-8">
        {errorMessage && <h1>{errorMessage}</h1>}
        <div className="flex justify-between items-center px-8">
          <h1 className="text-2xl font-medium">API Documentations</h1>
          <ModalBox
            name="New Project"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(!isModalOpen)} // Toggle modal state
          >
            <DocumentationForm
              onFormSubmit={() => {
                setIsModalOpen(false); // Close the modal
                refreshProjects(); // Refresh the projects list
              }}
              project_id={params.project_id}
            />
          </ModalBox>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {/* Grid Items */}
            {apiDocumentations &&
              apiDocumentations.map((documentation, index) => (
                <div key={index}>
                  <DocumentationCard
                    id={params.project_id}
                    docId={documentation.api_id}
                    title={documentation.title}
                    description={documentation.description}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}