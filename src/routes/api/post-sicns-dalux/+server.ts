import { Container, CosmosClient, type JSONObject } from '@azure/cosmos';
import fs from 'fs';

//interface 
interface sicnsData {
    links: string[];
    daluxID: number;
    date: string;
    rawData: JSONObject;
}

interface daluxCustomLinks {
    link: string;
}
//helpers 
// first send the data to the dalux api with the fix url to visit 
function getDummyData() {
    const data = fs.readFileSync('src/data/fromsicns.json', 'utf8');
    //console.log(data, 'data');
    return JSON.parse(data);
}
function processDataToSend(rawData){
    //console.log(data, 'data');
    //initiallize interface
    const sicnsData: sicnsData = {
        links: rawData.links,
        daluxID: rawData.data.ID,
        date: rawData.data.lastChange,
        rawData: rawData
    }
    //console.log(sicnsData, 'this will have the data to be sent to dalux')
    return sicnsData;
}
//CREATE: send data to dalux api 
async function  sendDataDalux(data:sicnsData){
    //send data to dalux api 
    const modData =  modifyDaluxPost(data);
    console.log(JSON.stringify(modData), 'data to send to dalux')
    //modify the base object before creation in dalux 

    //fetch('http://localhost:3000/api/post-sicns-dalux', {
    // const res = await fetch('https://fm-api.dalux.com/api/v1/workorders', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': import.meta.env.VITE_DALUX_API_HEY
    //     },
    //     body: JSON.stringify(data.rawData)
    // })
    // .then(res => res.json())
    
    // return res;
}

function modifyDaluxPost(data:sicnsData){
    //modify the base object before creation in dalux right now dummy data
    //check if rawData.userDefinedFields has a property called  estado
    let mapUrl = data?.rawData?.data?.userDefinedFields.map((item) => {
        if(item.name === 'URLSICNS'){
            item.value ={...item, value:'http://localhost:5173/getData/23439'} 
        }
        return item;
    let baseData = data?.rawData?.data?.userDefinedFields;
    console.log(baseData, 'base data')
    if(baseData){
        baseData = 'http://localhost:5173/getData/23439'
        return data;
    }

    
}


//receive data from dalux api and send to cosmos db

//post function
export async function POST({ request }: { request: Request }): Promise<Response> {
  //import data fromsicns.json here 
  const rawData = getDummyData();
  const data = processDataToSend(rawData);
  const daluxRes = await sendDataDalux(data);
  console.log(daluxRes, 'dalux response');
  //set up cosmos db usgin env variables 
  const endpoint = import.meta.env.VITE_COSMOS_ENDPOINT;
  const key = import.meta.env.VITE_COSMOS_WKEY;
  const databaseId = import.meta.env.VITE_DBID;
  const containerId = import.meta.env.VITE_CONTAINERID;
  console.log(endpoint + '/' + key, 'data to send')
  let client = new CosmosClient({ endpoint: endpoint + '/', key });
  //export the container
  let container = client.database(databaseId).container(containerId);
  const response = null
//   const data = await request.json();
//   console.log(data);
//   const { resource: createdItem } = await container.items.create(data);
//   //create a response object to send back to the client
//   const response = {
//     status: 200,
//     body: createdItem

//   }
  return new Response(response) ;

  

  
}