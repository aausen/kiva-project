console.log("This is in the more-info.js file!")
let loanId = 2263314;
let theData;
 const fetchByLoanId = (loanId) => {

const  data = fetch('https://api.kivaws.org/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `{
    lend {
      loans (filters: {loanIds: ${loanId}}) {
        totalCount
        values {
          name
          id
          loanAmount
          image {
            url(presetSize: small)
          }
          activity {
            name
          }
          geocode {
            country {
              isoCode
              name
            }
          }
          lenders (limit: 0) {
            totalCount
          }
          ... on LoanPartner {
            partnerName
          }
          ... on LoanDirect {
            trusteeName
          }
        }
      }
    }
  }` }),
})
console.log("hello");
// console.log(data);
return data;

}
let loadedData = fetchByLoanId(loanId) 
loadedData.then(response => response.json())
  .then((newData)=> console.log(newData));
// console.log(loadedData)