async function getEmpToken() {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is missing');
    }

    try {
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
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

        // Parse JSON before logging
        const data = await response.json();
        console.log("Response JSON payload:", data);
        return data;

    } catch (error) {
        console.error('Error during session start:', error);
        throw error; // Re-throw the error if needed for further handling
    }
}

// getEmpToken()
//     .then(empToken => {
//         console.log(`token is : ${empToken.client_secret.value}`);
//     })
//     .catch(err => {
//         console.error("Failed to get token:", err);
//     });

let empToken = await getEmpToken();
console.log(`Emp token: ${empToken.client_secret.value}`);