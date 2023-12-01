// Create a module analyzeImage that takes a URL and returns a JSON object with the image analysis with Image Analysis API 4.0
 import axios from 'axios';

const analyzeImage = async (url) => {
  const subscriptionKey = process.env.REACT_APP_VISION_KEY;
  const uriBase = process.env.REACT_APP_VISION_ENDPOINT + "vision/v3.0/analyze";
  const params = {
    "visualFeatures": "Categories,Description,Color",
    "details": "",
    "language": "en"
  };
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    },
    params: params
  };
  const body = {
    "url": url
  };
  const response = await axios.post(uriBase, body, options);
  return response.data;
};

const isConfigured = () => {
  return process.env.REACT_APP_VISION_KEY && process.env.REACT_APP_VISION_ENDPOINT;
}

 export { isConfigured };
 export default analyzeImage;



