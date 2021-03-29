using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LabTest.Data;
using LabTest.Data.DomainModels;

using LabTest.Service.Story;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LabTestWeb
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
            // For getting custom configurations setting values
            services.Configure<ApplicationConfigurations>(Configuration.GetSection("ApplicationConfigurations"));

            services.AddDistributedMemoryCache();
            services.AddMvc().AddSessionStateTempDataProvider();
            // for handling sessions
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(480);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            services.AddHttpContextAccessor();
            services.AddControllersWithViews();
            services.AddRazorPages().AddRazorRuntimeCompilation();
            services.AddControllers().AddNewtonsoftJson();
            services.AddMvc().AddNewtonsoftJson();

            services.AddDbContext<eSenderContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("labTestContext"));
            });
            // for authentications
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
               .AddCookie(options =>
               {

               });

            //DI Registrations
            services.AddScoped<ReporterStoryService>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=home}/{action=index}/{id?}");

            });

        }
    }
}
