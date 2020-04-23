/* ----------------------------- Global Variables  ----------------------------- */
int a = 2;
int b = 3;
int c = 4;
int d = 5;
int e = 14;
int f = 15;
int g = 21;

int d4 = 16;
int d3 = 10;
int d2 = 8;
int d1 = 7;

const unsigned long period = 1000;
unsigned long startMillis;
unsigned long currentMillis;
int currentSeconds = 0;
int currentMinutes = 0;
int currentHours = 0;

int segPins[] = {a, b, c, d, e, f, g}; 
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

/* ----------------------------- Helper Functions  ----------------------------- */
void calculateTime() {
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

void displayDigit(int digit)
{
  for (int i = 0; i < 8; i++)
  {
    digitalWrite(segPins[i], segCode[digit][i]);
  }
}

void reset() {
  for (int i = 0; i < 8; i++)
  {
    digitalWrite(segPins[i], LOW);
  }

  digitalWrite(d1, HIGH);
  digitalWrite(d2, HIGH);
  digitalWrite(d3, HIGH);
  digitalWrite(d4, HIGH);
  
}

/* ----------------------------- Arduino Setup/Loop ----------------------------- */

void setup()
{
  Serial.begin(9600);
  //set all the pins of the LED display as output
  pinMode(d1, OUTPUT);
  pinMode(d2, OUTPUT);
  pinMode(d3, OUTPUT);
  pinMode(d4, OUTPUT);
  // 7 seg setup
  for (int i = 0; i < 8; i++)
  {
    pinMode(segPins[i], OUTPUT);
  }
  
}
void loop()
{
  calculateTime();

  //x0:00
  reset();
  digitalWrite(d1, LOW);
  if(currentMinutes > 9 && currentMinutes != 0) {
    int firstDigitMinutes = (currentMinutes / 10) % 10;
    displayDigit(firstDigitMinutes);
  }else {
    displayDigit(0);
  }
  delay(5);

  //0x:00
  reset();
  digitalWrite(d2, LOW);
  if(currentMinutes < 10) {
    displayDigit(currentMinutes);
  } else {
    int secondDigitMinutes = currentMinutes % 10;
    displayDigit(secondDigitMinutes);
  }
  delay(5);

  //00:x0
  reset();
  digitalWrite(d3, LOW);
  if(currentSeconds > 9 && currentSeconds != 0) {
    int secondDigitSeconds = (currentSeconds / 10) % 10;
    displayDigit(secondDigitSeconds);
  }else {
    displayDigit(0);
  }
  delay(5);

  //00:0x
  reset();
  digitalWrite(d4, LOW);
  if(currentSeconds < 10) {
    displayDigit(currentSeconds);
  } else {
    int firstDigitSeconds = currentSeconds % 10;
    displayDigit(firstDigitSeconds);
  }
  delay(5);
}
