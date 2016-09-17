module bowlingApp {
    var app = angular.module("bowlingApp", ["ngRoute", 'ngSanitize'])

    app.config(routeConfig);

    routeConfig.$inject = ["$routeProvider","$locationProvider"];
    function routeConfig($routeProvider: ng.route.IRouteProvider,
                         $locationProvider: ng.ILocationProvider): void {
        $routeProvider
            .when("/main", {
                templateUrl: "/app/views/main.html",
            })
            .when("/bowling", {
                templateUrl: "/app/views/bowling.html",    
                controller: bowlingApp.Controllers.BowlGameCtrl,
                controllerAs: "vm",
               
            })
            .when("/finalScore/:totalScore", {
                templateUrl: "/app/views/finalScore.html",
                controller: bowlingApp.Controllers.FinalScoreCtrl,
                controllerAs: "vm",

            })
            .otherwise("/main");
    }
}