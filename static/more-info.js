console.log("This is in the more-info.js file!")
let loanId = 2265887;
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
            url(presetSize: original)
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
let loadedData = fetchByLoanId(loanId) 
loadedData.then(response => response.json())
  .then((borrowerInfo)=> {
    borrowerInfo.data.lend.loans.values.forEach((element) =>{
      let borrowerResults = document.getElementById('borrower-info')
      let borrowerImage = document.getElementById('borrower-img')
      let borrowerDescription = document.getElementById('borrower-desc')
    

      //name of borrower
      let name = element.name

      //image of borrower
      let img = new Image()
      img.src = element.image.url

     // activity for loan
     let loanActivity = element.activity.name

      //loan amount
      let loanAmount = element.loanAmount
      
      //country 
      let country = element.geocode.country.name

       //desciption of loan
      let description = element.whySpecial

      borrowerImage.append(img)
      borrowerResults.append(name, loanAmount, loanActivity, country)
      borrowerDescription.append(description)
      

    })
    console.log(borrowerInfo)});
// console.log(loadedData)