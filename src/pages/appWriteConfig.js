import { Client, Databases } from "appwrite";

export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
export const COLLECTION_ID_MESSAGES = import.meta.env.VITE_COLLECTION_ID_MESSAGES

const client = new Client();
export const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') //API Endpoint
    .setProject(import.meta.env.VITE_APP_KEY); //project ID

export default client