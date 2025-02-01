'use client';

import DocumentationCard from '../_components/DocumentationCard'
import ModalBox from '../../_components/ModalBox'
import DocumentationForm from '../_components/DocumentationForm'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import fetchDocumentationByProjectId from '../../actions/fetchDocumentationByProjectId'

// const apiDocumentations = [
//     {
//         id: 1,
//         title: "User API",
//         description: "This is a sample twitter(X) api, its free to use for certain limit",
//         jsonData: {
//             "openApi": 3.0
//         },
//         created_at: "25-01-2025"
//     },
//     {
//         id: 2,
//         title: "Auth API",
//         description: "A sample google apis for the use and this is a sample google(X) api, its free to use for certain limit",
//         jsonData: {
//             "openApi": 3.0
//         },
//         created_at: "25-01-2025"
//     },
//     {
//         id: 3,
//         title: "Products API",
//         description: "Its a logistic company and This is a sample FedEx api, its free to use for certain limit",
//         jsonData: {
//             "openApi": 3.0
//         },
//         created_at: "25-01-2025"
//     },
//     {
//         id: 4,
//         title: "Media API",
//         description: "Test description for the use of this is a sample amazon api, its free to use forf certain limit",
//         jsonData: {
//             "openApi": 3.0
//         },
//         created_at: "25-01-2025"
//     },
//     {
//         id: 5,
//         title: "Shipping API",
//         description: "Microsoft apis are the best in the industry and this is a sample microsoft(X) api.",
//         jsonData: {
//             "openApi": 3.0
//         },
//         created_at: "25-01-2025"
//     }
    
// ]

export default function ApiDocumentation() {

    const [apiDocumentations, setApiDocumentations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const params = useParams<{ project_id: string }>()
    console.log(params);
    //setProjectId(params.project_id);

    useEffect(() =>{
        async function getApiDocumentation() {
            setLoading(true);
            console.log(params.id)
            const result = await fetchDocumentationByProjectId(params.id);
            console.log(result)
            if(result){
                setApiDocumentations(result);
                setLoading(false);
            } else{
                console.log(`Error in fetching Projects: ${result}`)
                setErrorMessage(`Error in fetching Projects: ${result}`);
                setLoading(false);
            }
        }
        getApiDocumentation();
    }, [params.id]);

    // Function to refresh the projects list
    const refreshProjects = async () => {
        setLoading(true);
        try {
            const result = await fetchDocumentationByProjectId(params.id);
          if (result) {
            setApiDocumentations(result);
          } else {
            setErrorMessage('Error in fetching Projects');
          }
        } catch (error) {
          setErrorMessage(`Error: ${error.message}`);
        } finally {
          setLoading(false);
        }
    };

    if(loading){
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return (
        <>
            <div className='p-8'>
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
                        project_id={params.id}
                        />
                    </ModalBox> 
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {/* Grid Items */}
                        
                        {apiDocumentations && apiDocumentations.map((documentation, index) => (
                            <div key={index}>
                                <DocumentationCard id={params.id} docId={documentation.api_id} title={documentation.title} description={documentation.description} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}
