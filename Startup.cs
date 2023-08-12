namespace webgis
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Other configurations

            app.UseStaticFiles(); // Add this line to serve static files

            // Other configurations
        }

    }

}
