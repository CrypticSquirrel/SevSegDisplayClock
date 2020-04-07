#include <Arduino.h>

/* millis() for timing: https://forum.arduino.cc/index.php?topic=503368.0 */
const unsigned long period = 1000;
unsigned long startMillis;
unsigned long currentMillis;
int currentSeconds;
int currentMinutes;
int currentHours;

// seven segment display boilerplate
int segPins[] = {9, 8, 7, 6, 5, 4, 3}; // ( a b c d e f g )
byte segCode[10][7] = {
    /*
     a  b  c  d  e  f  g */
    {1, 1, 1, 1, 1, 1, 0}, // 0
    {0, 1, 1, 0, 0, 0, 0}, // 1
    {1, 1, 0, 1, 1, 0, 1}, // 2
    {1, 1, 1, 1, 0, 0, 1}, // 3
    {0, 1, 1, 0, 0, 1, 1}, // 4
    {1, 0, 1, 1, 0, 1, 1}, // 5
    {1, 0, 1, 1, 1, 1, 1}, // 6
    {1, 1, 1, 0, 0, 0, 0}, // 7
    {1, 1, 1, 1, 1, 1, 1}, // 8
    {1, 1, 1, 1, 0, 1, 1}, // 9
};

void setup()
{
  // 7 seg setup
  for (int i = 0; i < 7; i++)
  {
    pinMode(segPins[i], OUTPUT);
  }
}

void loop()
{
  currentMillis = millis();                  // get the current "time" (actually the number of milliseconds since the program started)
  if (currentMillis - startMillis >= period) // test whether the period has elapsed
  {
    currentSeconds = currentSeconds + 1;
    startMillis = currentMillis;
  }

  if (currentSeconds == 60)
  {
    currentSeconds = 0;
    currentMinutes = currentMinutes + 1;
  }
  if (currentMinutes == 60)
  {
    currentMinutes = 0;
    currentHours = currentHours + 1;
  }
  if (currentHours == 13)
  {
    currentHours = 1;
  }
}