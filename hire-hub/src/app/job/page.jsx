import axios from "axios";

export default async function page() {
  const response = await axios.get(
    `http://localhost:3000/api/job/getJobs`
  );
  const { data } = response;

  const job = data.data;
  console.log(data)
//   console.log(job)

  return (
<>
 
</>
  )
}

