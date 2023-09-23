const {MongoClient}=require('mongodb');
//const url ="mongodb+srv://Nayra:nodejs123@cluster0.5eou9di.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
const url ="mongodb+srv://Nayra:nodejs123@cluster0.5eou9di.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

const client = new MongoClient(url);



async function main(){
    try{  
        await client.connect();
        console.log("Connected successfully to server");
    }
    catch(err){
        console.log("Erroring in connetion");
    }
    const db =client.db("code-zone");
    const  collection =db.collection("courses");
    const findResult =await collection.find().toArray();
    console.log(findResult);

    return "done" ;
}


main();

// if log only to collection
// You should see the mongod process start up and print some status information.
// and print Connected successfully to server