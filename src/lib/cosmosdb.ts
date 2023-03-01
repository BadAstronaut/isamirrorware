import { Container, CosmosClient } from '@azure/cosmos';
//set up cosmos db usgin env variables 
const endpoint = import.meta.env.VITE_COSMOS_ENDPOINT;
const key = import.meta.env.VITE_COSMOS_WKEY;
const databaseId = import.meta.env.VITE_DBID;
const containerId = import.meta.env.VITE_CONTAINERID;
console.log(endpoint + '/'+ key , 'data to send')
let client= new CosmosClient({ endpoint: endpoint + '/', key });
//export the container
export const container= client.database(databaseId).container(containerId);