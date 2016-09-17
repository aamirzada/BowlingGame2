module bowlingApp.main {

    export class MainCtrl {
       //currently this controller do nothing but can be used for cool stuff on the main page
    }
    angular.module("bowlingApp")
        .controller("mainCtrl", [bowlingApp.main.MainCtrl])
}