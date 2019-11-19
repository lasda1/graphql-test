# graphql-test
 Tache Technique Wino
### DataBase :
the database is on https://www.elephantsql.com/
### Installation

Install the dependencies  and start the server.

```sh
$ npm install
$ npm start 
```

Go to http://localhost:3000/graphiql and enjoy 

### queries

* mutation{exportSales} : for getting xlsx file 
* query{getSalesTotal {count amount}} : for getting count of sales and sum
* query {sales(first:1,after:"") {
  edges {
    node {
      id,
      name,
      amount,
      user {
        id,name
      }
    },
    cursor
  },
  pageInfo{
    endCursor,
    hasNextPage
  }
} } : for get sales the first parametre is how much sales do you want and the second one is from which position of cursor 
if hasNextPage is true you can get to the next page by putting endCursor in after parametre

