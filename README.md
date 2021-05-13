
[View App](https://powerful-ravine-82937.herokuapp.com/)

#### List of classes used in this project

##### Node/Express - Server

| Class         | Method                  | Property                | Explantaion             |
| ------------- | ----------------------- | ----------------------- | ----------------------- |
| ElectionModel | getElectedPartiesCount  |                         | used by the ChartController to get the count<br> of elected parties |
|               | getElectionDates        |                         | used by the ChartController to get election<br> dates as an array |
|               | scrapeElectionDates     |                         | used to extract election dates from the parsed<br> HTML, returned by the library Cheerio |
|               | getCheerioAPI           |                         | used to get the parsedHTML data in object format,<br> returned from Cheerio |
|               | getElectoralThreshold   |                         | used to extract electoral threshold from the parsed <br> HTML, returned by the library Cheerio  |
|               | getRunningParties       |                         | used to extract running parties from the parsed HTML, returned by the library Cheerio |
|               | electedPartiesCount     |                         | used to filter the all parties,<br>based on electoralThreshold variable |
|               | filterElectionDates     |                         | used to format the date to a valid date,<br> later can be used in urlToScrape variable|
|               | castStringToNumber      |                         | used to cast the electoralThreshold variable to number,<br>it allow us to filter the elected parties |
|               |                         | url                     | Constructor argument, <br> determins which url to scrap |
|               |                         | electionYear            | Constructor argument, <br> added to urlToScrape  variable |
| ElectionControllers | getElecetdPartiesByYear  |                  | used by the election route to respone <br> to api endpoint '/elected-parties-count/:year'  | 
|  | getAllElectionDates  |                  | used by the election route to respone <br> to api endpoint '/elections-dates'  | 


##### React - Client

| Class         | Method                  | Property                | Explantaion             |
| ------------- | ----------------------- | ----------------------- | ----------------------- |
| ChartController | getElectionsYears  |                         | used by the Chart Model to get an array of all election dates
|               | getElectedPartiesCount        |                         | used by the Chart Model to get an array of count of elected parties |
| ChartModel    | getElectionsYears     |                         | making API call to receive all election dates |
|               | getElectedPartiesCount           |                         | making API call to receive the count of elected parties
| ChartView              |    |            electionsYears             | holds all the election years - get this info from ChartController |
|               |    |            electedPartiesCount             | holds all the count of electedParties - get this info from ChartController |


## Resonons i choose to use MVC design pattern in this app

- Separation of concerns, each class handles only one part of the application, this allow us to debug and scale the code more easily and effectively
- Re-usability of code, it allow us to create more generic method that can be used in different scenarios
- Easier to maintain the app, No need to read through hundred lines of code. each concern is separated by his own class.


