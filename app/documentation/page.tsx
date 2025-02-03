'use client'

import { useEffect, useState } from 'react'
import Test from '../_components/Test'
import fetchJsonData from '../actions/fetchJsonData'

interface PageProps {
    params: { docId: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default function Documentation({ params }: PageProps) {
    const { docId } = params
    const [checkDocIdStatus, setCheckDocIdStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [apiData, setApiData] = useState('')

    useEffect(() => {
        async function getJsonData() {
            // call the fetchJsonData function to check if the docId has jsonData or not
            setLoading(true)
            const jsonData = await fetchJsonData(docId)
            if (jsonData[0].openapi_schema) {
                setCheckDocIdStatus(true)
                setLoading(false)
                setApiData(jsonData[0].openapi_schema)
            } else {
                setErrorMessage(`Please upload the JSON data:`)
                setLoading(false)
            }
        }
        getJsonData()
    }, [docId])

    if (loading) {
        return (
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