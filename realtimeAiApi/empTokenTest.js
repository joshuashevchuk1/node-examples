function getEmpToken() {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is missing');
    }

    try {
        const response = fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: "verse",
            }),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = response.json();
        return data; // Handle the response data as needed

    } catch (error) {
        console.error('Error during session start:', error);
        throw error; // Re-throw the error if needed for further handling
    }
}

getEmpToken()