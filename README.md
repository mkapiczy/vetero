# vetero

Vetero means weather in esperanto language and it is a responsive single page application showing a 5 day weather forecast based on OpenWeatherMap API.

The demo application is available at https://vetero.herokuapp.com/#/

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run end-to-end tests
```
yarn run test:e2e
```

### Run unit tests
```
yarn run test:unit
```

### Solution

The solution was implemented with use of the Vue.js framework.

The main toolset includes:

- Typescript
- Webpack 4
- Babel 7
- Eslint
- Sass
- FomanticUI
- Jest testing framework,
- nightwatch - e2e testing framework

The src files were divided into:
- views - containing application views. In case of this application is a single Main view.
- components - containing all the rest of non-view components,
- services - containing services for communication with external APIs and other functionalities utilized by components but not being part of their interface,


The main view of the application consists of 4 child components representing 4 separate parts of the application:
- CitySelector - a component responsible for selection of the city for the weather forecast,
- CurrentWeather - the component showing a current weather in the selected city,
- DayMenu - the component showing overview of the weather forecast for all the days, and allowing for selection of the specific day,
- Forecast - a component showing detailed weather forecast in three different manners,
    * Hourly,
    * Daily Summary - with use of google charts,
    * Details - showing more details,
        
The application was designed to be responsive.

### Tradeoffs

- Styling - not much focus was put on the styling and theming. Although the application was designed to be responsive and user friendly more styling adjustments could be made,
- CitySelector - the list of cities with available weather is currently retrieved from the json file. What is more the size of the file causes time 29.7 MB causes relatively long data loading on application startup.
- Metrics - The application supports only Celcius metric, while Kelvin, and Fahrenheit metrics are also supported by the OpenWeatherAPI,
- Usage of OpenWeatherMap default weather icons - A set of custom icons should be used.
- Wind direction indicator - right now it is a string representation "N | NE | E | SE | S | WS | W | NW" a visual representation would be better.
- The Daily Summary forecast view with charts could be made more rich including more data (e.g rain, humodity) and more chart styling.
- The Details forecast views could also be improved showing more rich content.

### Future work

