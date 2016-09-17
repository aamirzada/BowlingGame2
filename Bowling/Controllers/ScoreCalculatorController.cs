using Bowling.DTO;
using Bowling.interfaces;
using Bowling.Service;
using System.Web.Http;

namespace Bowling.Controllers
{
    public class ScoreCalculatorController : ApiController
    {
        //Inversion Container
        private readonly IGameCalculatorService _gameCalculatorService;
        public ScoreCalculatorController(IGameCalculatorService gameCalculatorService)
        {
            _gameCalculatorService = gameCalculatorService;
        }

        // GetCalculatedScore api/<controller>
        [HttpPost]
        public IHttpActionResult GetCalculatedScore(FrameModel frameModel)
        {
            var model = _gameCalculatorService.GetCalculatedScore(frameModel);
            return Ok(model);
        }
    }
}