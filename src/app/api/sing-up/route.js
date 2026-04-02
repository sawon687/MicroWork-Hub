import connect from "@/lib/dbconnect";
import bcrypt from "bcryptjs";
const userColl=connect('userCOllection')

export async function POST(req,res){
  try {
      const body=await req.json();
    const  {name,email,password,role,photo}=body;
    if(!name || !email || !password ||!role || !photo){
        return new Response(JSON.stringify({error:"All fields are required",success:false}),{status:400})
    }
     let coin=null 
    if(role === "Worker" ){
        coin=10;
    }else if(role==="Buyer"){
        coin=50;
    }
    else{
        return new Response(JSON.stringify({message:"Invalid role",success:false}),{status:400})
    }
      
    const exitUser=await userColl.findOne({email:email});

    if(exitUser){
        
        return new Response(JSON.stringify({message:"User already exists",sucess:false}),{status:400})
    }


     

const hashedPassword = await bcrypt.hash(password, 10);
    body.coin=coin;
     body.createdAt=new Date().toISOString();
     body.updatedAt=new Date().toISOString();
     body.password=hashedPassword
 
    const result=await userColl.insertOne(body);

    if(result.insertedId){
        return new Response (JSON.stringify({message:'Your account has been created successfully!',success:true}),{status:201})
    }
  } catch (error) {
    console.log("🔥 ERROR:", error);
    return new Response(JSON.stringify({error:"Internal Server Error",success:false}),{status:500})
  }


    
}



