## Queerly Positive

### What is Queerly Positive?

Queerly Positive is a positive news application that aims to provide a safe and uplifting space for the LGBTQ+ community. It curates and showcases positive news stories, articles, and content related to the LGBTQ+ community, promoting inclusivity, acceptance, and celebration of diversity.

### How Queerly Positive Works

Queerly Positive is built using the Nuxt.js framework and Tailwind CSS. It uses an API to gather and curate positive news stories and content related to the LGBTQ+ community. The application provides a user-friendly interface for browsing, filtering and exploring these stories.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [npm](https://www.npmjs.com/) (version X.X.X or higher)

### Installation

1. Clone the repository:

```
git clone https://github.com/JayJayMonster/queerly-positive.git
```

2. Navigate to the project directory:

```
cd queerly-positive
```

3. Install dependencies:

```
npm install
```

### Running the Application

To run the application in development mode, use the following command:

```
npm run dev
```

This will start the development server and make the application available at `http://localhost:3000`.

For production builds and deployment, refer to the [Nuxt.js](https://nuxt.com/docs/getting-started/introduction) documentation.

## Roadmap

- [ ] Look into Leaflet
- [ ] Make mobile responsive
- [ ] Use Pinia to store and automatically refresh articles when you upload a new one
- [ ] Look into interfaces for storing
- [ ] Optimize code, use more components 
- [x] Remove 'all' filteroption
- [x] Add select multiple filters feature
- [x] Add hover animations for filters
- [x] Write send new article form
- [x] Add 'add new article' button
- [x] Update filter category names
- [x] Add categories you can filter on
- [x] Render markers on the world map
- [x] Write the Readme

## Changelog

### V1.2.0
- Added 'add new article' form\.
- Form sends post request to API and adds new marker\.
- Used component for the form\.
- Updated the Readme

### V1.1.0
- Updated filter names and added hover animations. Also changed the CSS a lot\.
- Optimized code\.

### V1.0.0
- First version\.
- Includes mapbox map, markers with data from the api, first version of filter system\.

