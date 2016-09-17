namespace Bowling.DTO
{
    public enum Mark
    {
        Open,
        Strike,
        Spare        
    }
    public class FrameModel
    {
        public int FirstRoll { get; set; }
        public int SecondRoll { get; set; }
        public int ThirdRoll { get; set; }
        public int PrevPrevTotalScore { get; set; }
        public int PrevTotalScore { get; set; }
        public int CurrentTotalScore { get; set; }
        public Mark CurrentMark { get; set; }
        public Mark PrevMark { get; set; }
        public Mark PrevPrevMark { get; set; }
        public int TotalScore { get; set; }
        public int FrameNo { get; set; }

    }
}