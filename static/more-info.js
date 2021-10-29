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
          description
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
      let borrowerName = document.getElementById('borrower-name')
      let borrowerActivity = document.getElementById('borrower-activity')
      let borrowerAmount = document.getElementById('borrower-amount')
      let borrowerCountry = document.getElementById('borrower-country')
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
      let description = element.description

      borrowerName.append(name)
      borrowerAmount.append(loanAmount)
      borrowerImage.append(img)
      borrowerActivity.append(loanActivity)
      borrowerCountry.append(country)
      borrowerDescription.append(description)
      

    })
    console.log(borrowerInfo)});
document.getElementById('lend-here').href="https://www.kiva.org/lend-beta/`${loanId}`"
// *** need help here! I can't get the jquery to work here. When I hard code the loanId
// it's working like I want, but not sure how to do it with jquery I guess :/