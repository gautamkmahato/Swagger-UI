'use client'

import { useEffect, useState } from 'react'
import Test from '../_components/Test'
import fetchJsonData from '../actions/fetchJsonData'

interface JsonDataResponse {
  openapi_schema: string
  [key: string]: unknown
}

export default function Documentation({ params }: { params: { docId: string } }) {
    const { docId } = params
    const [checkDocIdStatus, setCheckDocIdStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [apiData, setApiData] = useState('')

    useEffect(() => {
        async function getJsonData() {
            setLoading(true)
            try {
                const response = await fetchJsonData(docId)
                const jsonData = response as JsonDataResponse[]
                
                if (jsonData[0]?.openapi_schema) {
                    setCheckDocIdStatus(true)
                    setApiData(jsonData[0].openapi_schema)
                } else {
                    setErrorMessage("Please upload the JSON data")
                }
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred")
            } finally {
                setLoading(false)
            }
        }
        getJsonData()
    }, [docId])

    if (loading) {
        return <h1>Loading...</h1>
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
    )
}