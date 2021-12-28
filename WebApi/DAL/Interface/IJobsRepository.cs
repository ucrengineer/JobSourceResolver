using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.DAL.Models;

namespace WebApi.DAL.Interface
{
    public interface IJobsRepository
    {
        IEnumerable<JobOpportunity> GetJobOpportunties();

        string PutJobOpportunties(IEnumerable<JobOpportunity> JobOpps);

    }
}
