import axios from "axios";

const ImageGenerationOpenAI = {
    generateImage: async (text) => {    
        const openAiKey = process.env.REACT_APP_OPENAI_API_KEY;
        const urlBase = "https://api.openai.com/v1/images/generations";
        const bearerToken = "Bearer " + openAiKey;
        const requestData = {
            model: "dall-e-2",
            prompt: text,
            n: 1,
            size: "512x512", // Set the desired image size here
            style: "natural",
        };
        
        const headers = {
          'Content-Type': 'application/json',
           Authorization: bearerToken,
        };
          
        const response = await axios.post(urlBase, requestData, {
            headers: headers,
        });
        return response.data;
    },

    isConfigured: () => {
        return process.env.REACT_APP_OPENAI_API_KEY;
    }
}

export default ImageGenerationOpenAI;