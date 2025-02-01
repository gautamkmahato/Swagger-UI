'use client'

import fetchJsonData from '@/app/actions/fetchJsonData';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import UploadSchema from '@/app/dashboard/_components/UploadSchema';
import Test from '@/app/_components/Test';
import Link from 'next/link';

 
export default function DocumentationPage() {

    const [checkDocIdStatus, setCheckDocIdStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [apiData, setApiData] = useState('');

    const params = useParams<{ docId: string }>();
    const docId = params.docId;
    console.log(params);

    useEffect(() => {
        async function checkJsonData() {
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
            
            // for(let i=0; i< ids.length; i++){
            //     if(ids[i] === docId){
            //         setCheckDocIdStatus(true);

            //     }
            // }
        }
        checkJsonData();
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
            {checkDocIdStatus ? <>
                <div className='bg-neutral-50'>
                    {/* Base */}
                    <div className="flex justify-end mr-12 pt-8">
                        <Link
                            className="inline-block rounded border border-orange-600 bg-buttonBackground px-12 py-3 text-sm font-medium text-white hover:bg-orange-600 hover:text-white focus:outline-none focus:ring active:text-orange-500"
                            href={`/documentation/${docId}`} target='_blank'
                        >
                            Open in New Window
                        </Link>
                    </div>
                    <Test apiData={apiData} docId={docId} />
                </div>

            </> : 
                <>
                    <UploadSchema docId={docId} />
                </>
            }
        </>
    )
}
