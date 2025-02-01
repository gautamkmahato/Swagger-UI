'use client'

import Test from '@/app/_components/Test';
import fetchJsonData from '@/app/actions/fetchJsonData';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function NewWindowDocumentationPage() {
    const params = useParams<{ docId: string }>();
    const docId = params.docId;
    console.log(params); 

    const [checkDocIdStatus, setCheckDocIdStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [apiData, setApiData] = useState('');
    useEffect(() => {
        async function getJsonData() {
            // call the fetchJsonData function to check if the docId has jsonData or not
            setLoading(true);
            const jsonData = await fetchJsonData(docId);
            if(jsonData[0].openapi_schema){
                setCheckDocIdStatus(true);
                setLoading(false);
                setApiData(jsonData[0].openapi_schema);
            } else{
                setErrorMessage(`Please upload the JSON data:`)
                setLoading(false);

            }
        }
        getJsonData();
    }, [docId]);

    if(loading){
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return (
        <>
            {errorMessage && <h1>{errorMessage}</h1>}
            {checkDocIdStatus ? <Test apiData={apiData} docId={docId} /> : 
                <>
                    <h1>No Data available</h1>
                </>
            }
        </>
    )
}
