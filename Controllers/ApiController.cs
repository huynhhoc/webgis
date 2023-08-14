using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace webgis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly Dictionary<string, double[]> _lastCoordinates = new Dictionary<string, double[]>();

        [HttpPost("updateCoordinates")]
        public IActionResult UpdateCoordinates([FromBody] CoordinateRequest request)
        {
            double[] newCoordinates = Utilities.GenerateCoordinates(request.BaseLatitude, request.BaseLongitude);
            _lastCoordinates[request.VehicleId] = newCoordinates;
            return Ok(newCoordinates);
        }

        [HttpGet("getLatestCoordinates/{vehicleId}")]
        public IActionResult GetLatestCoordinates(string vehicleId)
        {
            if (_lastCoordinates.TryGetValue(vehicleId, out double[] coordinates))
            {
                return Ok(coordinates);
            }
            else
            {
                return NotFound();
            }
        }
    }

    public class CoordinateRequest
    {
        public string VehicleId { get; set; }
        public double BaseLatitude { get; set; }
        public double BaseLongitude { get; set; }
    }
}
