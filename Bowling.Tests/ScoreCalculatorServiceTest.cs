using Bowling.DTO;
using Bowling.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Bowling.Tests
{
    public class ScoreCalculatorServiceTest
    {
        //Did not covered All the tests especially for the last frame and the
        //the complete Game test.

        //As it is a small project with just only 1 Class that needed to be tested So I did not use 
        //any mocking framework


        [Fact]
        public void FirstFrameScoreCalculationTest()
        {
            var frm = new FrameModel() { FirstRoll=5,SecondRoll=5,CurrentMark=Mark.Open,FrameNo=1};
            var service = new  GameCalculatorService();

            var sut = service.GetCalculatedScore(frm);

            Assert.Equal(sut.CurrentTotalScore, 10);
             
                
        }

        [Fact]
        public void FirstFrameIsAstrike()
        {
            var frm = new FrameModel() { FirstRoll = 10, SecondRoll = 0, CurrentMark = Mark.Strike, FrameNo = 1 };
            var service = new GameCalculatorService();

            var sut = service.GetCalculatedScore(frm);

            Assert.Equal(sut.CurrentTotalScore, 0);
            Assert.Equal(sut.PrevMark, Mark.Strike);
            Assert.Equal(sut.PrevPrevMark, Mark.Open);
        }

        [Fact]
        public void LastFrameWasStrikeCurrentIsOpen()
        {
            var frm = new FrameModel() { FirstRoll = 5, SecondRoll = 2, CurrentMark = Mark.Open, FrameNo = 2,CurrentTotalScore=0,PrevMark=Mark.Strike };
            var service = new GameCalculatorService();

            var sut = service.GetCalculatedScore(frm);

            Assert.Equal(sut.CurrentTotalScore, 24);
            Assert.Equal(sut.PrevTotalScore, 17);
            Assert.Equal(sut.PrevMark, Mark.Open);
            Assert.Equal(sut.PrevPrevMark, Mark.Open);
            Assert.Equal(sut.CurrentMark, Mark.Open);
        }

        [Fact]
        public void FirstFrameIsStrikeSecondIsSpareThirdIsOpen()
        {
            var frm = new FrameModel() { FirstRoll = 5, SecondRoll = 0, CurrentMark = Mark.Open,
                                        FrameNo = 3, CurrentTotalScore = 20, PrevMark = Mark.Spare,
                                        PrevPrevMark = Mark.Open };

            var service = new GameCalculatorService();

            var sut = service.GetCalculatedScore(frm);

            Assert.Equal(sut.CurrentTotalScore, 40);
            Assert.Equal(sut.PrevPrevTotalScore, 0);
            Assert.Equal(sut.PrevTotalScore, 35);
            Assert.Equal(sut.PrevMark, Mark.Open);
            Assert.Equal(sut.PrevPrevMark, Mark.Open);
            Assert.Equal(sut.CurrentMark, Mark.Open);
        }

        [Fact]
        public void ShouldReturnThirtyForThreeConsectiveStrikes()
        {
            var frm = new FrameModel() { FirstRoll = 10, SecondRoll = 0, CurrentMark = Mark.Strike, FrameNo = 3, CurrentTotalScore = 0, PrevMark = Mark.Strike,PrevPrevMark = Mark.Strike };
            var service = new GameCalculatorService();

            var sut = service.GetCalculatedScore(frm);

            Assert.Equal(sut.CurrentTotalScore, 30);
            Assert.Equal(sut.PrevPrevTotalScore, 30);
            Assert.Equal(sut.PrevTotalScore, 0);
            Assert.Equal(sut.PrevMark, Mark.Strike);
            Assert.Equal(sut.PrevPrevMark, Mark.Strike);
            Assert.Equal(sut.CurrentMark, Mark.Open);
        }

        [Fact]
        public void ThreeConsectiveStrikesInTheMiddle()
        {
            var frm = new FrameModel() { FirstRoll = 10, SecondRoll = 0, CurrentMark = Mark.Strike, FrameNo = 7, CurrentTotalScore = 45, PrevMark = Mark.Strike, PrevPrevMark = Mark.Strike };
            var service = new GameCalculatorService();

            var sut = service.GetCalculatedScore(frm);

            Assert.Equal(sut.CurrentTotalScore, 75);
            Assert.Equal(sut.PrevPrevTotalScore, 75);
            Assert.Equal(sut.PrevTotalScore, 0);
            Assert.Equal(sut.PrevMark, Mark.Strike);
            Assert.Equal(sut.PrevPrevMark, Mark.Strike);
            Assert.Equal(sut.CurrentMark, Mark.Open);
        }


    }
}
