import { useEffect, useState } from 'react'
import apiClient from 'services/axios'
import { useCancelToken } from 'hooks/useCancelToken'

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { newCancelToken, isCancel: isCancelled, axiosSource } = useCancelToken()

  useEffect(() => {
    if (axiosSource.current) axiosSource.current.cancel()
    const fetchData = async () => {
      try {
        const res = await apiClient.get(url, { ...options, cancelToken: newCancelToken() })
        if(!res) throw new Error('No response')
        setResponse(res.data)
        setLoading(false)
      } catch (err) {
        const composedError = {}
        if (isCancelled(err)) return
        if (err.response) {
          // Request made, server responded
          composedError.code = err?.response?.code
          composedError.message = err?.response?.message ?? err.message
        } else if (err.request)
          // Request made but no server response
          composedError.code = 500
        composedError.message = err.message
        console.warn('Error due to: ', err)
        setLoading(false)
        setError(composedError)
      }
    }
    setError(false)
    setLoading(true)
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options])

  return { response, loading, error }
}

export default useFetch
