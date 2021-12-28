using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.DAL.Interface;
using WebApi.DAL.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly ILogger<JobsController> _logger;
        private readonly IJobsRepository _jobsRepository;

        public JobsController(ILogger<JobsController> logger, IJobsRepository jobsRepository)
        {
            _logger = logger;
            _jobsRepository = jobsRepository;
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get()
        {
            try
            {
                _logger.LogDebug("{Request}", HttpContext.Request);
                var result = _jobsRepository.GetJobOpportunties();
                return new JsonResult(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest("Error has occured with the request");
            }
        }

        [HttpPut]
        [Route("put")]
        public async Task<IActionResult> Put(IEnumerable<JobOpportunity> JobOpps)
        {
            try
            {
                _logger.LogDebug("{Request}", HttpContext.Request);
                var result = _jobsRepository.PutJobOpportunties(JobOpps);
                return new JsonResult(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }

        }
    }
}
