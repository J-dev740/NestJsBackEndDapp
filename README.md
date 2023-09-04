 ## WalkThrough
 - This is the BackEnd Part
   - build with NestJs
   - language: Typescript
 - This server is connected to
   - Database:MongoDb
   - Moralis StreamAPI through a webhook
   - frontEnd: NextJs (javascript)
## Description(BACKEND PART)
  - This server is  hosted locally on port 8000 ```http://localhost:8000/user```  and listens to api calls on routes``` /user``` & ```/user/:number```
  - MoralisStream API is setUp using Moralis Sdk which will create a contact(smartContract) stream
  - Moralis records streams from blockchain events from ```Sepolia Testnet ``` through Alchemy Node
  - These stream events are received by webhook url
    - ```webhookUrl: "https://a484-103-160-194-170.ngrok-free.app/user" ``` provided  in Moralis Sdk file
    - which will POST stream Data (EVENTS) to our NESTJS server through POST METHOD  and event Data can be found In the logs[] section of the decodedLogs
    - This decoded data is then posted to MongooseDb Contact Collection
    - According to a Schema defined in user folder on our BackEnd and accordingly  in the DAPP DATABASE that I created in MongooseDB atlas
  ## Description(FRONTEND PART)
  - frontEnd is built with NEXTJS which will query the Databse with the help of APIS defined in NESTJS backend part
  - styling in the frontend part id done using TailwindCss
  - by using Ether.js with NEXTJs this Dapp interacts with SmartContract Directly
  - Due to these Statechaging interactions with smartContract will emit Events
  - which are captured by the BackEnd APIs
  - And are used to post and query data
  - in MongoDb database
    # SCREENSHOTS
    ## Landing Page
    - ![image](https://github.com/J-dev740/NestJsBackEndDapp/assets/104488219/9e456f72-3e62-4a0e-b1f6-4f33554d78d8)
    - ## Add contacts to BlockChain (user interface)
    - ![image](https://github.com/J-dev740/NestJsBackEndDapp/assets/104488219/8ee03644-6f5e-454d-ac0b-f17c0833156d)
    - ## update contact listing
    - ![image](https://github.com/J-dev740/NestJsBackEndDapp/assets/104488219/f2c24c5f-9bf7-49c5-a61e-312e6eb32359)
    - ## Delete contact listing (from SmartContract also through interface with feedback) with the help of trash icon
    - ![image](https://github.com/J-dev740/NestJsBackEndDapp/assets/104488219/556f0dd1-4f14-4041-b165-c218bdce05ef)
    - ## Backend logs while moralis Streams were being recorded yesterday
    - ![image](https://github.com/J-dev740/NestJsBackEndDapp/assets/104488219/8c8ae18d-4903-4815-9a55-56804cac88a0)





    
