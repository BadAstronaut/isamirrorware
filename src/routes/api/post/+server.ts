import { Container, CosmosClient } from '@azure/cosmos';

export async function POST({ request }: { request: Request }): Promise<Response> {

  //set up cosmos db usgin env variables 
  const endpoint = import.meta.env.VITE_COSMOS_ENDPOINT;
  const key = import.meta.env.VITE_COSMOS_WKEY;
  const databaseId = import.meta.env.VITE_DBID;
  const containerId = import.meta.env.VITE_CONTAINERID;
  console.log(endpoint + '/' + key, 'data to send')
  let client = new CosmosClient({ endpoint: endpoint + '/', key });
  //export the container
  let container = client.database(databaseId).container(containerId);

  const data = await request.json();
  console.log(data);
  const { resource: createdItem } = await container.items.create(data);
  //create a response object to send back to the client
  const response = {
    status: 200,
    body: createdItem

  }
  return new Response(response) ;

  

  
}