using Bowling.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bowling.interfaces
{
    public interface IGameCalculatorService
    {
        FrameModel GetCalculatedScore(FrameModel frameModel);
    }
}