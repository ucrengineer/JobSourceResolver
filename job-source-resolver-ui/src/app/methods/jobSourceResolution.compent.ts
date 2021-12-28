import { jobBoards } from "../models/jobBoards.model";
import { JobOpportunity } from "../models/JobOpportunity";

// return number of opportunities
export function getNumber(jobOpportunities : JobOpportunity[],  root_domain : string) {
 return jobOpportunities.filter(x => x.job_source == root_domain).length

}

// return number of jobs
export function getJobs(jobOpportunities : JobOpportunity[],  root_domain : string){
  return jobOpportunities.filter(x => x.job_source == root_domain);
}







