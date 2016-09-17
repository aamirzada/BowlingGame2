var bowlApp;
(function (bowlApp) {
    var main;
    (function (main) {
        var MainCtrl = (function () {
            function MainCtrl(BowlGameService) {
                var _this = this;
                this.BowlGameService = BowlGameService;
                this.submitModel = function () {
                    debugger;
                    _this.BowlGameService.getCalculatedScore(new bowlApp.FrameModel());
                };
            }
            MainCtrl.$inject = ['BowlGameService'];
            return MainCtrl;
        }());
        main.MainCtrl = MainCtrl;
        angular.module("bowlingApp")
            .controller("MainCtrl", [bowlApp.main.MainCtrl]);
    })(main = bowlApp.main || (bowlApp.main = {}));
})(bowlApp || (bowlApp = {}));
