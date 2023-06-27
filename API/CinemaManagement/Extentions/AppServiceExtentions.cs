using CinemaManagement.Data;
using CinemaManagement.Interfaces;
using CinemaManagement.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using CinemaManagement.Helpers;
using Microsoft.AspNetCore.Http.Features;

namespace CinemaManagement.Extentions
{
    public static class AppServiceExtentions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("Default"),
                    sqlServerOptionsAction: sqlOptions =>
                    {
                        sqlOptions.EnableRetryOnFailure(
                            maxRetryCount: 10,
                            maxRetryDelay: TimeSpan.FromSeconds(30),
                            errorNumbersToAdd: null);
                    });
            });
            services.AddCors();
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));
            services.AddTransient<ITokenService, TokenService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddAutoMapper(typeof(AutoMapperPro));
            services.Configure<FormOptions>(o =>
             {
                 o.ValueLengthLimit = int.MaxValue;
                 o.MultipartBodyLengthLimit = int.MaxValue;
                 o.MemoryBufferThreshold = int.MaxValue;
             });
            return services;
        }
    }
}
