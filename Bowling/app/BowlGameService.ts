module bowlingApp.Services {

    import interfaces = bowlingApp.Interfaces;
    import model = bowlingApp.Models;
    
    export class BowlGameService implements interfaces.IBowlGameService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
        }

        getCalculatedScore = (frameModel: model.FrameModel): ng.IHttpPromise<any> => {
            return this.$http({
                method: 'POST',
                url: '/api/ScoreCalculator/GetCalculatedScore',
                data: JSON.stringify(frameModel)
            });
        }
    }
    angular.module("bowlingApp")
     .service('bowlGameService', ["$http", bowlingApp.Services.BowlGameService]);
}