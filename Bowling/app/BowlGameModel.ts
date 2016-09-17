module bowlingApp.Models {

    export enum Mark {
        Open = 0,
        Strike,
        Spare
    }

    export class FrameModel {
        FirstRoll: number = 0;
        SecondRoll: number = 0;
        ThirdRoll: number = 0;
        PrevPrevTotalScore: number = 0;
        PrevTotalScore: number = 0;
        CurrentTotalScore: number = 0;
        CurrentMark: Mark = Mark.Open;
        PrevMark: Mark = Mark.Open;
        PrevPrevMark: Mark = Mark.Open;
        TotalScore: Mark = Mark.Open;
        FrameNo: number;
    }
}
