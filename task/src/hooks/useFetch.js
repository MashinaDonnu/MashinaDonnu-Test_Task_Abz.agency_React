import {useCallback, useState} from "react";

export const useFetch = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method, body = null, headers = {}) => {
        setLoading(true)
        try {
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()
            setLoading(false)
            return data;
        } catch (e) {
            setLoading(false)
            setError(e)
            throw new Error(e)
        }

    }, [])

    return {loading, setLoading, request, error}
}