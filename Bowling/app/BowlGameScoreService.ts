module bowlingApp.Services {
    import model = bowlingApp.Models;
    import interfaces = bowlingApp.Interfaces;

    export class BowlGameModelService {
        
        public isCurrentScoreUpdable: boolean = false;
        private frameModel: model.FrameModel;

        constructor() {
        }

        setModel(_frameModel: model.FrameModel) {
            this.frameModel = _frameModel;
        }

        setFrameModel = (): bowlingApp.Models.FrameModel => {
            this.setMark();
            return this.frameModel;
        }

        updateFrame = (frameModel: bowlingApp.Models.FrameModel) => {
            frameModel.FrameNo += 1;
            frameModel.FirstRoll = 0;
            frameModel.SecondRoll = 0;
            return frameModel;
        }

        private setMark = (): void => {
            if (this.frameModel.FirstRoll == 10) {
                this.frameModel.CurrentMark = model.Mark.Strike;
                this.isCurrentScoreUpdable = false;
            }
            else if (this.frameModel.FirstRoll + this.frameModel.SecondRoll == 10) {
                this.frameModel.CurrentMark = model.Mark.Spare;
                this.isCurrentScoreUpdable = false;
            }
            else {
                this.frameModel.CurrentMark = model.Mark.Open;
                this.isCurrentScoreUpdable = true;
            }
        }

        isPrevPrevScoreUpdatable = () : boolean => {
            return this.frameModel.PrevPrevMark == model.Mark.Strike
        }

        isPrevScoreUpdateable = (): boolean => {
            return (this.frameModel.PrevMark == model.Mark.Strike
                && this.frameModel.CurrentMark != model.Mark.Strike)
                || (this.frameModel.PrevMark == model.Mark.Spare
                && this.frameModel.CurrentMark != model.Mark.Strike)
        }       

    }

    angular.module("bowlingApp")
        .service('BowlGameScoreService', [bowlingApp.Services.BowlGameModelService]);

}