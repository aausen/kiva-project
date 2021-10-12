// import gql from "graphql-tag";
fetch('https://api.kivaws.org/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: "{lend {loan (id: 1568001){id name}}}" }),
})
  .then(res => res.json())
  .then(res => console.log(res.data));

// // Function to query the Kiva Graphql API and return results

// const LOAN_QUERY = gql`
//     query LOAN_QUERY{
//         lend{
//             loans (filters: {gender: female, country: ["KE"]}, limit:100){
//                 totalCount
//                 values {
//                     name
//                     loanAmount
//                     image {
//                         url(presetSize:small)
//                     }
//                     activity{
//                         name
//                     }
//                     geocode{
//                         country{
//                             isoCode
//                             name
//                         }
//                     }
//                     lenders (limit: 10) {
//                         totalCount
//                     }
//                     ... on LoanPartner {
//                         partnerName
//                     }
//                     ... on LoanDirect {
//                         trusteeName
//                     }
//                 }
//             }
//         }
//     }`

// export default LOAN_QUERY;