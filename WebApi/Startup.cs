using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApi.DAL.Interface;
using WebApi.DAL.Repository;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddControllers();

            // dependency injection

            services.AddTransient<IJobsRepository, JobsRepository>();
            services.AddTransient<IDbConnection>(
                db => new SqlConnection(Configuration.GetSection("DataConnections").GetSection("ConnectionString").Value)
                );

            // Need this for Development
            services.AddCors(opt =>
            {
                // this defines a CORS policy called "default"
                opt.AddPolicy("default",
                  builder => builder.SetIsOriginAllowedToAllowWildcardSubdomains()
                                .WithOrigins(Configuration.GetSection("CrossOriginConfig").Get<string[]>())
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                  );
            });

            // Swagger
            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new OpenApiInfo { Title = "Job Resources API", Version = "v1" });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            if (env.IsDevelopment())
            {
                app.UseCors("default");
                app.UseDeveloperExceptionPage();
                app.UseSwaggerUI(config =>
                {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Job Resources API");
                });
            }
            else
            {
                app.UseSwaggerUI(config =>
                {
                    // when deploying to IIS need to have the './' and remove the first 'swagger'
                    config.SwaggerEndpoint("./v1/swagger.json", "Job Resources API");
                });
            }

            app.UseRouting();

          //  app.UseCors("default");
            app.UseCors(
                    options => options.WithOrigins("https://jobsourceresolverapp.azurewebsites.net").AllowAnyMethod()
                    .AllowAnyHeader()
                    );
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
