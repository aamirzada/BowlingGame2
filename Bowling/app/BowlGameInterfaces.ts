module bowlingApp.Interfaces {
    import model = bowlingApp.Models;

    export interface IFrameService {
        calculateScore(frameModel: model.FrameModel): string;
    }

    export interface IBowlGameService {
        getCalculatedScore(frameModel: model.FrameModel): ng.IHttpPromise<any>;
    }

    export interface IGameManager {
        getCalculatedScore(): void;
    }

    export interface IFrames {
        firstBox: number;
        secondBox: string;
        thirdBox: string;
        currentScore: string;
    }
}
