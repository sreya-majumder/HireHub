import { Job } from "@/models/Job";
import { connect } from "@/database/mongo.config";


export async function POST(request: Request) {
  
  try {
    await connect();
  const payload = await request.json();

  const jobId = payload.id; 
  console.log('user is '+payload.jobId)
    await Job.deleteMany( {_id : jobId } );
   

    return Response.json({ message: 'Job deleted successfully' }, { status: 200 });
 
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 400,
      error: error,
    });
  }
}