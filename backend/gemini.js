import axios from "axios";

const geminiResponse = async (prompt) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL;

        const result = await axios.post(
            apiUrl,
            {
                model: "gemini-3.8-flash",
                input: prompt
            },
            {
                headers: {
                    "x-goog-api-key": process.env.GEMINI_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        const modelOutput = result.data.steps.find(
            step => step.type === "model_output"
        );

        return modelOutput.content[0].text;

    } catch (error) {
        console.log(
            "Gemini ERROR:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export default geminiResponse;