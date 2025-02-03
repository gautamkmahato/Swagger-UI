'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import Test from '../_components/Test';
import fetchJsonData from '../actions/fetchJsonData';

export default function Documentation() {
    const router = useRouter();
    const [checkDocIdStatus, setCheckDocIdStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [apiData, setApiData] = useState('');
    
    // Safely extract docId from router.query when it's available
    const docId = router.query?.docId;

    useEffect(() => {
        if (!docId) return; // Make sure docId exists before calling the function

        async function getJsonData() {
            setLoading(true);
            const jsonData = await fetchJsonData(docId);
            if (jsonData[0]?.openapi_schema) {
                setCheckDocIdStatus(true);
                setLoading(false);
                setApiData(jsonData[0].openapi_schema);
            } else {
                setErrorMessage(`Please upload the JSON data:`);
                setLoading(false);
            }
        }

        getJsonData();
    }, [docId]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {errorMessage && <h1>{errorMessage}</h1>}
            {checkDocIdStatus ? (
                <Test apiData={apiData} docId={docId} />
            ) : (
                <h1>No Data available</h1>
            )}
        </>
    );
}
