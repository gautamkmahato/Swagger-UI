'use client'

import { useEffect, useState } from 'react'
import Test from '../_components/Test'
import fetchJsonData from '../actions/fetchJsonData'

// Props interface
interface PageProps {
    params: {
        docId: string
    }
    searchParams: { [key: string]: string | string[] | undefined }
}

interface JsonDataResponse {
    openapi_schema: string
    [key: string]: any
}

export default function Documentation({ params }: PageProps) {
    const { docId } = params
    const [checkDocIdStatus, setCheckDocIdStatus] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [apiData, setApiData] = useState<string>('')

    useEffect(() => {
        async function getJsonData() {
            setLoading(true)
            const jsonData = await fetchJsonData(docId) as JsonDataResponse[]
            
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