import axios from "axios";

const instance = axios.create({    
    baseURL:"http://localhost:5001/clone-e2e84/us-central1/api" // The api(cloud function) URL
});

export default instance;