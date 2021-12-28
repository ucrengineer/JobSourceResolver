using Dapper;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApi.DAL.Interface;
using WebApi.DAL.Models;

namespace WebApi.DAL.Repository
{
    public class JobsRepository : IJobsRepository
    {
        private readonly SqlConnection _connection;
        private readonly ILogger _logger;

        public JobsRepository(ILogger<JobsRepository> logger, IDbConnection connection)
        {
            this._connection = (SqlConnection)connection;
            this._logger = logger;
        }

        public IEnumerable<JobOpportunity> GetJobOpportunties()
        {
            string procName = Constants.GetJobOpportunities;

            try
            {
                using (_connection)
                {
                    this._logger.LogDebug("{DbProcedure}", procName);
                    var result = SqlMapper.Query<JobOpportunity>(_connection, procName, commandType: CommandType.StoredProcedure);
                   
                    
                    return result;
                }


            }
            catch(Exception ex)
            {
                this._logger.LogError(ex, "{DbProcedure}", procName);
                throw ex;
            }

        }

        public string PutJobOpportunties(IEnumerable<JobOpportunity> JobOpps)
        {

            string procName = Constants.PutJobOpportunities;
            var json = JsonConvert.SerializeObject(JobOpps);
            DataTable dataTable = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));

            var dyParam = new DynamicParameters();
            dyParam.Add("@JobOpps", dataTable.AsTableValuedParameter("[dbo].[type_opportunities]"));



            try
            {
                using (_connection)
                {
                    this._logger.LogDebug("{DbProcedure}", procName);

                    var result = SqlMapper.Query(_connection, procName, param:dyParam,  commandType: CommandType.StoredProcedure);
                    

                    return null;
                }


            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "{DbProcedure}", procName);
                throw ex;
            }

        }
    }
}
