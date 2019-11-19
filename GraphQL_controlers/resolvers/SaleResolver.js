const {Sales,Users}= require('../../models/sale')
const db =require ('../../data/db')
XLSX = require('xlsx')
module.exports =  {
  Query: { 
    sales: async (_, { after, first }) => {
      const resultQuery = await db('sales as sale').join('users as u','u.id','sale.id').select(
        'sale.id as id ',
        'sale.name as name',
        'sale.amount as amount',
        'u.id as userId',
        'u.name as userName'
      )
      const data =[]
      resultQuery.forEach(saleQuery=>{
        const sale={
          id:saleQuery.id,
          name :saleQuery.name,
          amount : saleQuery.amount,
          user:{
            id:saleQuery.userId,
            name :saleQuery.userName
          }
        }
        data.push(sale)
      })
      const totalCount = data.length;
      let sales = []
      let start = 0;
      if (after !== undefined) {
        const buff = new Buffer(after, 'base64');
        const id = buff.toString('ascii');
        const index = data.findIndex((sale) => sale.id === Number(id));
        start = index + 1;
      }
      sales = first === undefined ?
        data :
        data.slice(start, start + first);
      let endCursor;
      const edges = sales.map((sale) => {
        const buffer = Buffer(String(sale.id));
        endCursor = buffer.toString('base64');
        return ({
          cursor: endCursor,
          node: sale,
        });
      });
      const hasNextPage = start + first < totalCount;
      const pageInfo = endCursor !== undefined ?
        {
          endCursor,
          hasNextPage,
        } :
        {
          hasNextPage,
        };
      const result = {
        edges,
        pageInfo,
        totalCount,
      };
      return result;
    } ,
    getSalesTotal: async () =>{
      const total =await db('sales').count('id as count').sum('amount as amount')
      return total[0]
    }
  },
  Mutation: {
    exportSales : async ()=>{
      const sales =await db('sales')
      const totalAmount = await db('sales').sum('amount as amount')
      const data =[]
      sales.forEach(sale=>{
        const row ={
          Id : sale.id,
          Name : sale.name,
          Amount : sale.amount +'€'
        }
        data.push(row)
      })
      const totalRow={
        Id: '',
        Name : 'Total',
        Amount : totalAmount[0]['amount']+'€'
      }
      data.push(totalRow)
      var ws = XLSX.utils.json_to_sheet(data);

      /* add to workbook */
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "sales");

      /* generate an XLSX file */
      XLSX.writeFile(wb, "sheetjs.xlsx");
      return "sheetjs.xlsx"
    }
  }
};