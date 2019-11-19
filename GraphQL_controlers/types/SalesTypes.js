const sale = `
type Edge {
    cursor: String!
    node: Sale!
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }
  type TodosResultCursor {
    edges: [Edge]!
    pageInfo: PageInfo!
    totalCount: Int!
  }
type Query{
  sales(
    after: String
    first: Int,
  ): TodosResultCursor
  getSalesTotal :totalAmount
}
type Sale{
    id:ID,
    name:String,
    amount:Float,
    user: User
}
type User{
  id:ID,
  name:String
}
type totalAmount{
    count:Int,
    amount:Float
}
type Mutation{
    exportSales : String
}

`;

module.exports = sale;