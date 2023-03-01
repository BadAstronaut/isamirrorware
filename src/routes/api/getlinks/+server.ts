import { Container, CosmosClient } from '@azure/cosmos';
import type { RequestHandler } from '@sveltejs/kit'

interface LinkElement {
    idVal: string;
}

export const GET:RequestHandler = async (params) =>{
  const  idVal  = params.url.searchParams.get('idVal')
  //set up cosmos db usgin env variables 
  const endpoint = import.meta.env.VITE_COSMOS_ENDPOINT;
  const key = import.meta.env.VITE_COSMOS_RKEY;
  const databaseId = import.meta.env.VITE_DBID;
  const containerId = import.meta.env.VITE_CONTAINERID;
  console.log(endpoint + '/' + key, 'data to send')
  let client = new CosmosClient({ endpoint: endpoint + '/', key });
  //export the container
  let container = client.database(databaseId).container(containerId);

  const { resources: [element] } = await container.items.query<Element>({
    query: `SELECT * FROM c WHERE c.idVal = "${idVal}"`,
    // replace "property" with the name of the property in your Cosmos DB table that you want to search for
  }).fetchAll();

  //console.log(element.tfiler, 'element from get links');
  if (!element) {
    return new Response(JSON.stringify({
    body: { message: `Element with property value "${idVal}" not found` }
    }))
  }
  let tfiler = element.tfiler;
  console.log(tfiler, 'tfiler from get links')
  return new Response(JSON.stringify({
    body:tfiler
  }))

  

  
}