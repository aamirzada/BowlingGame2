var bowlingApp;
(function (bowlingApp) {
    var Controllers;
    (function (Controllers) {
        var FinalScoreCtrl = (function () {
            function FinalScoreCtrl($routeParams, $location) {
                var _this = this;
                this.$location = $location;
                this.reStart = function () {
                    _this.$location.path('/bowling');
                };
                debugger;
                this.totalScore = this.getScore($routeParams.totalScore);
            }
            FinalScoreCtrl.prototype.getScore = function (input) {
                return (input || "No Score Available");
            };
            FinalScoreCtrl.$inject = ['$routeParams', '$location'];
            return FinalScoreCtrl;
        }());
        Controllers.FinalScoreCtrl = FinalScoreCtrl;
        angular.module("bowlingApp")
            .controller("FinalScoreController", [bowlingApp.Controllers.FinalScoreCtrl]);
    })(Controllers = bowlingApp.Controllers || (bowlingApp.Controllers = {}));
})(bowlingApp || (bowlingApp = {}));
