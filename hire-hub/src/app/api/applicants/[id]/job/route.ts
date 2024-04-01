// import { NextRequest, NextResponse } from 'next/server';
// import { connect } from '@/database/mongo.config';
// import { Job } from '@/models/Job';
// import { User } from '@/models/User';

// connect();

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;
//     const user = await User.findById(id);
//     const userSkills = user?.skills.map((skill: { name: string }) => skill.name.toLowerCase().split(',')) || [];
//     const flattenedSkills = userSkills.flat();
    

//     const urlSearchParams = new URLSearchParams(request.nextUrl.search);
//     const search = urlSearchParams.get('search');
//     const location = urlSearchParams.get('location');
//     const minSalaryParam = urlSearchParams.get('minSalary');
//     const maxSalaryParam = urlSearchParams.get('maxSalary');
//     const skill = urlSearchParams.get('skill');

//     const filter: any = {};
//     if (search) {
//       filter.title = { $regex: search, $options: 'i' };
//     }
//     if (location) {
//       filter.location = location;
//     }

//     if (minSalaryParam && maxSalaryParam) {
//       const minSalary = parseInt(minSalaryParam);
//       const maxSalary = parseInt(maxSalaryParam);
//       if (!isNaN(minSalary) && !isNaN(maxSalary)) {
//         filter.salary = { $gte: minSalary, $lte: maxSalary };
//       }
//     }

//     if (skill) {
//       filter.skills = skill;
//     }

//     const jobs = await Job.find(filter);

//     const jobsWithMatchingSkills = jobs.map(job => {
//       const jobSkills = job.skills.map((skill: string) => skill.toLowerCase());
//       const matchingSkills = jobSkills.filter((skill: any) => flattenedSkills.includes(skill));
//       return { job, matchingSkills };
//     });

    
//     jobsWithMatchingSkills.sort((a, b) => b.matchingSkills.length - a.matchingSkills.length);

//     const matchingJobs = jobsWithMatchingSkills.filter(item => item.matchingSkills.length > 0).map(item => item.job);
//     const remainingJobs = jobsWithMatchingSkills.filter(item => item.matchingSkills.length === 0).map(item => item.job);

//     const remainingJobsSorted = remainingJobs.sort((a, b) => {
//         if (b.applicants.length !== a.applicants.length) {
//             return b.applicants.length - a.applicants.length;
//         } else {
//             return remainingJobs.indexOf(b) - remainingJobs.indexOf(a);
//         }
//     });

//     const sortedJobs = [...matchingJobs, ...remainingJobsSorted];

//     return NextResponse.json(sortedJobs, { status: 200 });


//   } catch (error: any) {
//     console.error('Error fetching existing jobs:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/database/mongo.config';
import { Job } from '@/models/Job';
import { User } from '@/models/User';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const user = await User.findById(id);
    const userSkills = user?.skills.map((skill: { name: string }) => skill.name.toLowerCase().split(',')) || [];
    const flattenedSkills = userSkills.flat();


    const urlSearchParams = new URLSearchParams(request.nextUrl.search);
    const search = urlSearchParams.get('search');
    const location = urlSearchParams.get('location');
    const minSalaryParam = urlSearchParams.get('minSalary');
    const maxSalaryParam = urlSearchParams.get('maxSalary');
    const skill = urlSearchParams.get('skill');

    const filter: any = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (location) {
      filter.location = location;
    }

    if (skill) {
        filter.skills = skill;
    }

    if (minSalaryParam && maxSalaryParam) {
      const minSalary = parseInt(minSalaryParam);
      const maxSalary = parseInt(maxSalaryParam);
      if (!isNaN(minSalary) && !isNaN(maxSalary)) {
        filter.salary = { $gte: minSalary, $lte: maxSalary };
      }
    }

    const jobs = await Job.find(filter);

    const reversedJobs = jobs.reverse();

    return NextResponse.json(reversedJobs, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching existing jobs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
