'use client'

import { useEffect, useState } from 'react'
import Test from '../_components/Test'
import fetchJsonData from '../actions/fetchJsonData'

interface JsonDataResponse {
  openapi_schema: string
  [key: string]: unknown
}

// Proper Next.js page component typing for App Router
export default function DocumentationPage({
  params,
}: {
  params: { docId: string }
}) {
  const { docId } = params
  const [checkDocIdStatus, setCheckDocIdStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [apiData, setApiData] = useState('')

  useEffect(() => {
    let isMounted = true
    async function getJsonData() {
      setLoading(true)
      try {
        const response = await fetchJsonData(docId)
        const jsonData = response as JsonDataResponse[]
        
        if (isMounted) {
          if (jsonData[0]?.openapi_schema) {
            setCheckDocIdStatus(true)
            setApiData(jsonData[0].openapi_schema)
          } else {
            setErrorMessage("Please upload the JSON data")
          }
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error 
              ? error.message 
              : "Failed to load documentation"
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    getJsonData()
    return () => {
      isMounted = false
    }
  }, [docId])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="documentation-container">
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      
      {checkDocIdStatus ? (
        <Test apiData={apiData} docId={docId} />
      ) : (
        <div className="no-data">
          <h1>No Data available</h1>
        </div>
      )}
    </div>
  )
}