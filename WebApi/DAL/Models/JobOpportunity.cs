using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.DAL.Models
{
    public class JobOpportunity
    {
        public int id { get; set; }
        public string job_title { get; set; }
        public string company_name { get; set; }
        public string job_url { get; set; }
        public string job_source { get; set; }
    }
}
