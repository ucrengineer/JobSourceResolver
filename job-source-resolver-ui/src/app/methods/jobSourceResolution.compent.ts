import { JobOpportunity } from "../models/JobOpportunity";

export function getNumber(jobOpportunities : JobOpportunity[],  root_domain : string) {
  var number = 0;
  jobOpportunities.forEach(
    (opp)=> {
      if (opp.job_url != null && opp.job_url.includes(root_domain)){
        number++;
      }

    })
    return number;

}

export function getJobs(jobOpportunities : JobOpportunity[],  root_domain : string){
  const data :JobOpportunity[] =  []
  jobOpportunities.forEach(
    (opp) => {
      if(opp.job_url != null && opp.job_url.includes(root_domain)){
        data.push(opp)
      }
    }
  )

  return data;
}

