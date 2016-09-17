using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;
using Bowling.Service;
using Bowling.interfaces;
using Autofac.Integration.Mvc;
using Bowling.DTO;

namespace Bowling
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            RegisterAutoFac();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);            
        }

        private void RegisterAutoFac()
        {
            var builder = new ContainerBuilder();
            
            var config = GlobalConfiguration.Configuration;
            builder.RegisterApiControllers(typeof(Global).Assembly);
            builder.RegisterWebApiFilterProvider(config);

            var dataAccess = Assembly.GetExecutingAssembly();

            builder.RegisterType(typeof(GameCalculatorService))
                            .As(typeof(IGameCalculatorService)).InstancePerRequest();

            var Container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(Container);

        }
    }
}