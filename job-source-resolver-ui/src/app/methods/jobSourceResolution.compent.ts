import { jobBoards } from "../models/jobBoards.model";
import { JobOpportunity } from "../models/JobOpportunity";

export function getNumber(jobOpportunities : JobOpportunity[],  root_domain : string) {
 return jobOpportunities.filter(x => x.job_source == root_domain).length

}

export function getJobs(jobOpportunities : JobOpportunity[],  root_domain : string){
  return jobOpportunities.filter(x => x.job_source == root_domain);
}







