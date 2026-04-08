import { ObjectId } from 'mongodb';
import connect from '../../../../lib/dbconnect';

const taskColl = connect("TaskCollection");

export async function GET(req,{params}){
   
try {
        const {id}=await params;

    const query={
        _id:new ObjectId(id)
    }

    const result=await taskColl.findOne(query)

    return new Response(JSON.stringify({message:'data found',success:true, data:result},{status:200}))
} catch (error) {
    return new Response(JSON.stringify({message:'somthing worng',success:false}))
}


}