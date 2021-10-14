console.log("This is in the js file!")

fetch('https://api.kivaws.org/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `{
    lend {
      loans (filters: {gender: female, country: ["KE", "US"]}, limit: 5) {
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
  .then(res => res.json())
  .then(res => console.log(res.data));