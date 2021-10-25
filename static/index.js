

console.log("This is in the index.js file!")
 
let theData;
 const fetchByCountryCode = async (countryCode) => {

const  data =   fetch('https://api.kivaws.org/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `{
    lend {
      loans (filters: { country: ["${countryCode}"]}, limit: 5) {
        totalCount
        values {
          name
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

return data;
  
}