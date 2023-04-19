import { useState } from "react";
import axios from "axios";

function usePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = async (url: string, data: any, token: string | null | undefined) => {
        setLoading(true);
        try {
            const response = await axios.post(url, data, {
                headers: token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {},
            });
            return response.data;
        } catch (error) {
            setError(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, error };
}

export default usePost;
