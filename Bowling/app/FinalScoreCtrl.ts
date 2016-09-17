module bowlingApp.Controllers {
    interface IRouteParams extends ng.route.IRouteParamsService {
        totalScore: string;
    }
    export class FinalScoreCtrl {
        private totalScore: string;

        static $inject = ['$routeParams', '$location'];
        constructor($routeParams: IRouteParams, private $location: ng.ILocationService
        ) {
            debugger;
            this.totalScore = this.getScore($routeParams.totalScore);
        }

        getScore(input: string): string {
            return (input || "No Score Available");
        }

        reStart = (): void => {
            this.$location.path('/bowling');
        }
    }

    angular.module("bowlingApp")
        .controller("FinalScoreController", [bowlingApp.Controllers.FinalScoreCtrl]);
}