module bowlingApp.Controllers {

    import services = bowlingApp.Services;
    import model = bowlingApp.Models;
    import interfaces = bowlingApp.Interfaces;

    class Frames implements interfaces.IFrames {
        firstBox: number;
        secondBox: string;
        thirdBox: string;
        currentScore: string;
    }

    export class BowlGameCtrl {
        private frames: Frames[] = [];
        
        private frameModel: model.FrameModel;
        private currentFrameNo: number;
        private inValid: boolean;
        private isBounsFrame: boolean;
        private Strike: boolean;
        private ended: boolean;
        private totalScore: number;

        static $inject = ['bowlGameService', 'BowlGameScoreService', '$scope','$location'];
        constructor(private BowlGameApiService: services.BowlGameService,
            private BowlGameModelService: services.BowlGameModelService,
            $scope: ng.IScope,
            private $location: ng.ILocationService
        ) {
            this.isBounsFrame = false;

            $scope.$watch('vm.isBounsFrame', (newValue: boolean, oldValue: boolean) => {
                
            });
            this.initGame();
        }

        initGame = () => {
            this.ended = false;
            this.frameModel = new model.FrameModel();
            this.frameModel.FrameNo = 1;
            this.currentFrameNo = 1;

            this.initFrames();
        }

        initFrames = () => {
            for (var n = 0; n < 10; n++) {
                this.frames.push(new Frames());
            }
        }
        getCalculatedScoreFromService = () => {
            this.BowlGameApiService.getCalculatedScore(this.frameModel).then((result) => {

                this.frameModel = result.data;
                this.frameModel = this.BowlGameModelService.updateFrame(this.frameModel);
                this.postUpdateScore();

                this.currentFrameNo = this.frameModel.FrameNo;
                
                if (this.currentFrameNo > 10) {
                    //Finish Game;
                    this.finishGame();
                }
            })
        }
        checkBonusFrame = (): void => {
            if (this.currentFrameNo > 9) {
                this.isBounsFrame = (this.frameModel.FirstRoll + this.frameModel.SecondRoll >= 10)                
            }
        }

        setFrameModel = (): void => {
            this.BowlGameModelService.setModel(this.frameModel);
            this.frameModel = this.BowlGameModelService.setFrameModel();
        }

        submitModel = (): void => {  
            if (!this.setModelForSubmition()) {
                return;
            }
            this.getCalculatedScoreFromService();
        }

        setModelForSubmition = (): boolean => {
            this.Strike = false;
            this.inValid = false;
            if (this.currentFrameNo != 10 && (this.frameModel.FirstRoll + this.frameModel.SecondRoll > 10)) {
                this.inValid = true;
                return false;
            }
            if (this.frameModel.FirstRoll == 10) {
                this.Strike = true;
            }
            this.setFrameModel();
            this.preUpdateScore();
            return true;
        }

        preUpdateScore = (): void => {
            if (this.frameModel.CurrentMark == model.Mark.Strike) {
                this.frames[this.currentFrameNo-1].secondBox = 'X';
            }
            else if (this.frameModel.CurrentMark == model.Mark.Spare) {
                this.frames[this.currentFrameNo - 1].firstBox = null;
                this.frames[this.currentFrameNo - 1].secondBox = '/';
            }
            else {
                this.frameModel.CurrentMark = model.Mark.Open;
                this.frames[this.currentFrameNo - 1].firstBox = this.frameModel.FirstRoll;
                this.frames[this.currentFrameNo - 1].secondBox = this.frameModel.SecondRoll.toString();
            }
        }

        postUpdateScore = (): void => {
            if (this.BowlGameModelService.isPrevPrevScoreUpdatable()) {
                this.frames[this.currentFrameNo - 3].currentScore = this.frameModel.PrevPrevTotalScore.toString();
            }
            if (this.BowlGameModelService.isPrevScoreUpdateable()) {
                this.frames[this.currentFrameNo-2].currentScore = this.frameModel.PrevTotalScore.toString();
            }
            if (this.BowlGameModelService.isCurrentScoreUpdable) {
                this.frames[this.currentFrameNo - 1].currentScore = this.frameModel.CurrentTotalScore.toString();

            }
            this.frameModel.PrevPrevTotalScore = 0;
            this.frameModel.PrevTotalScore = 0;
        }

        finishGame = (): void => {
            this.$location.path('/finalScore/' + this.frameModel.CurrentTotalScore);
        }
    }

    angular.module("bowlingApp")
        .controller("BowlGameCtrl", ['bowlGameService', 'BowlGameScoreService', bowlingApp.Controllers.BowlGameCtrl]);

}

