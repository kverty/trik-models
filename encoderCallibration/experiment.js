var __interpretation_started_timestamp__;

var outputFile = "1resultsfor6.txt";
var power = 30;
var ticks = 100;
var isCovered = 1;
var isFirstIter = 0;
var realSpeed = 0;

var main = function()
{
    __interpretation_started_timestamp__ = Date.now();

    var motor = brick.motor(M4);
    var button = brick.sensor(A4);
    var encoder = brick.encoder(E4);  
    var result = 0;

    encoder.reset();
    motor.setPower(power);

    while (true)
    {
        script.wait(10);

        if (button.read() == 0)
            isCovered = 1;
        else
        {
            if (isFirstIter == 0)
            {
                isFirstIter = 1;
                encoder.reset();
            }
            realSpeed += isCovered;
            isCovered = 0;           
        }
        
        if (realSpeed >= ticks)
        {
            result = encoder.read();
            motor.setPower(0);
            break;
        }
    }

    script.writeToFile(outputFile, [power, ticks, result, result / ticks,  "\n"]);
    return;
}
