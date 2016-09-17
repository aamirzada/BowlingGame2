using Bowling.interfaces;
using Bowling.DTO;

namespace Bowling.Service
{
    public class GameCalculatorService : IGameCalculatorService
    {
        private FrameModel _frameModel;
        
        public FrameModel GetCalculatedScore(FrameModel frameModel)
        {
            _frameModel = frameModel;
            CalcualteByFrames();
            ReSetMarks();
            return _frameModel;
        }

        private void CalcualteByFrames()
        {
            if (_frameModel.FrameNo == 1)
            {
                CalculateScoreOfCurrentFrame();
            }
            else if (_frameModel.FrameNo == 2)
            {
                CalculateScoreOfPrevFrame();
                CalculateScoreOfCurrentFrame();
            }
            else if (_frameModel.FrameNo > 2 && _frameModel.FrameNo < 10 )
            {
                CalculateScoreOfPrevPrevFrame();
                CalculateScoreOfPrevFrame();
                CalculateScoreOfCurrentFrame();
            }
            if (_frameModel.FrameNo == 10)
            {
                _frameModel.CurrentMark = Mark.Open;
                CalculateFinalFrameScore();
            }
        }

        private void CalculateFinalFrameScore()
        {
            CalculateScoreOfPrevPrevFrame();
            CalculateScoreOfPrevFrame();

            if ((_frameModel.FirstRoll + _frameModel.SecondRoll) >= 10)
            {
                _frameModel.CurrentTotalScore += _frameModel.FirstRoll + _frameModel.SecondRoll + _frameModel.ThirdRoll;
            }
            else
            {
                _frameModel.CurrentTotalScore += _frameModel.FirstRoll + _frameModel.SecondRoll;
            }

           
        }

        private void CalculateScoreOfCurrentFrame()
        {
            if (_frameModel.CurrentMark == Mark.Open)
            {
                _frameModel.CurrentTotalScore += _frameModel.FirstRoll + _frameModel.SecondRoll;
            }
        }

        private void CalculateScoreOfPrevFrame()
        {
            if (_frameModel.PrevMark == Mark.Strike)
            {
                if (_frameModel.CurrentMark != Mark.Strike)
                {
                    _frameModel.PrevTotalScore = _frameModel.CurrentTotalScore + 10 + _frameModel.FirstRoll + _frameModel.SecondRoll;
                    _frameModel.CurrentTotalScore = _frameModel.PrevTotalScore;
                    _frameModel.PrevMark = Mark.Open;
                }
            }
            else if (_frameModel.PrevMark == Mark.Spare)
            {
                _frameModel.PrevTotalScore = _frameModel.CurrentTotalScore + 10 + _frameModel.FirstRoll ;
                _frameModel.CurrentTotalScore = _frameModel.PrevTotalScore;
                _frameModel.PrevMark = Mark.Open;
            }
        }

        private void CalculateScoreOfPrevPrevFrame()
        {
            if (_frameModel.PrevPrevMark == Mark.Strike)
            {
                if (_frameModel.CurrentMark == Mark.Strike)
                {
                    _frameModel.PrevPrevTotalScore = _frameModel.CurrentTotalScore + 30;
                    _frameModel.PrevPrevMark = Mark.Open;
                }
                _frameModel.PrevPrevTotalScore = _frameModel.CurrentTotalScore + 20 + _frameModel.FirstRoll;
                _frameModel.CurrentTotalScore = _frameModel.PrevPrevTotalScore;
                _frameModel.PrevPrevMark = Mark.Open;
            }
        }

        private void ReSetMarks()
        {
            _frameModel.PrevPrevMark = _frameModel.PrevMark;
            _frameModel.PrevMark = _frameModel.CurrentMark;
            _frameModel.CurrentMark = Mark.Open;
        }
    }
}