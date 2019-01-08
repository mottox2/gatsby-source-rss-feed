# gatsby-sourice-rss-feed

[![npm version](https://badge.fury.io/js/gatsby-source-rss-feed.svg)](https://badge.fury.io/js/gatsby-source-rss-feed)

Source plugin for pulling data into Gatsby from RSS feed.

## Install

```bash
npm install --save gatsby-source-rss-feed
```

or

```bash
yarn add gatsby-source-rss-feed
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-esa`,
      options: {
        url: `RSS URL`,
        name: `Sample`
      }
    }
  ]
}
```

## How to query

QueryName: `Feed${name}`

```graphql
{
  allFeedSample {
    edges {
      node {
        title
        link
        content
      }
    }
  }

  feedSample {
    title
    link
    content
  }
}
```
