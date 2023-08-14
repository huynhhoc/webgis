namespace webgis.Controllers
{
    public class Utilities
    {
        public static double[] GenerateCoordinates(double baseLatitude, double baseLongitude)
        {
            // Simulate small changes in latitude and longitude
            double changeAmount = 0.001;
            double newLatitude = baseLatitude + (new Random().NextDouble() * changeAmount);
            double newLongitude = baseLongitude + (new Random().NextDouble() * changeAmount);
            return new double[] { newLatitude, newLongitude };
        }
    }
}

