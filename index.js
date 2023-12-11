import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const port = 3500;
//Middleware for CORS POLICY
app.use(cors());


app.use(express.json());



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


 
  

 

app.post('/route', async (request, response)=>{
  try {
  // check if all the reuired fields present in the request
  if( !request.body.from ||
      !request.body.to )
  {
      // if not then return 
      return response.status(400).send(
          {
              message:`Send all the reuired fields: from, to`
          }
      );
  
  }
  //else request toll info
  else{
    let routeData = JSON.stringify({
      "from": request.body.from,
      "to":request.body.to,
      "waypoints": []
    });

    try {
      
      let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints',
          headers: { 
            'x-api-key': 'j86LH8mTR3GQ9nPpGmj3n6p3BMDgGq8L', 
            'content-type': 'application/json'
          },
          data : routeData
        };
        
        axios.request(config)
        .then((responsed) => {
          return response.status(200).json({
          
              result: JSON.stringify(responsed.data)
          });
         
        })
        .catch((error) => {
          console.log(error);
        });

        


     
  } catch (error) {
     console.log(`Error occured POST method of tollguru route`);
     
  }



  
     
    
  }
      
  } catch (error) {
  
      console.log("Error in the POST method of custom route "+error.message);
      response.status(500).send({message:error.message});
      
  }
  
  });


 