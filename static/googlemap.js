

$( document ).ready(function() {

    let countries = [];

    const modal = document.querySelector('.modal')

    // console.log(modal)

    modal.addEventListener('click', () => {
    modal.style.display = 'none'
    document.querySelector('.modal').innerHTML = ""
    
   })

    let mapOptions = {
        zoom: 3,
        minZoom: 1,
        center: new google.maps.LatLng(50.7244893,3.2668189),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        backgroundColor: 'none'
    };

    let map = new google.maps.Map(document.getElementById('map'), mapOptions);

    init();

    function init() {
        $.ajax({
            url : '/static/data.json',
            cache : true,
            dataType : 'json',
            async : true,

            success : function(data) {

                if (data) {

                    $.each(data, function(id,country) {

                        var countryCoords;
                        var ca;
                        var co;

                        if ('multi' in country) {

                            var ccArray = [];

                            for (var t in country['xml']['Polygon']) {

                                countryCoords = [];

                                co = country['xml']['Polygon'][t]['outerBoundaryIs']['LinearRing']['coordinates'].split(' ');

                                for (var i in co) {

                                    ca = co[i].split(',');

                                    countryCoords.push(new google.maps.LatLng(ca[1], ca[0]));
                                }

                                ccArray.push(countryCoords);
                            }

                            createCountry(ccArray,country);

                        } else {

                            countryCoords = [];

                            co = country['xml']['outerBoundaryIs']['LinearRing']['coordinates'].split(' ');

                            for (var j in co) {

                                ca = co[j].split(',');

                                countryCoords.push(new google.maps.LatLng(ca[1], ca[0]));
                            }

                            createCountry(countryCoords,country);
                        }
                    }.bind(this));

                    showCountries();
                }
            }.bind(this)
        });
    }
    countryCode = ""
    function showCountries() {
        
        for (var i=0; i<countries.length; i++) {
            countries[i].setMap(map);

            google.maps.event.addListener(countries[i],"mouseover",function(){
                this.setOptions({fillColor: "#f5c879", 'fillOpacity': 0.5});
            });

            google.maps.event.addListener(countries[i],"mouseout",function(){
                this.setOptions({fillColor: "#f5c879", 'fillOpacity': 0});
            });

            google.maps.event.addListener(countries[i], 'click', async function(event) {
             //   alert(this.title+' ('+this.code+')');
               
               const loadedData = await (await fetchByCountryCode(this.code)).json()
               modal.style.display = 'flex'



                const innermodal = document.querySelector('.modal')
                if (loadedData.data.lend.loans.totalCount === 0){
                    const noLoan = document.createElement('div');

                    noLoan.append("No Loans available, Please choose another country")
                    innermodal.append(noLoan)
                    console.log(noLoan)
                }
                else{loadedData.data.lend.loans.values.forEach( (element) => {
                    // probably look better as table, add p tag inside div
                    //data attributes hidden for modal
                    const loanResults = document.createElement('div');
                    loanResults.classList.add('loan-row')
                    //name of loanee
                    let name = element.name;
                    //image of loanee
                    let img = new Image();
                    img.src = element.image.url;

                    
                    //id of loanee
                    let loanerId = element.id
                    //description of loan
                    // let description = element.whySpecial
                    
                    // button to view more info
                    let btn = document.createElement("button");
                    btn.id = "moreInfo"
                    btn.innerHTML = "Learn More";
                    btn.type = "button";
                    btn.addEventListener('click', () => {
                        window.location = `/more/${loanerId}`
                    })
                 
                    btn.value = loanerId;

                    //loan amount
                    let loanAmount = element.loanAmount

                    // let borrows = [
                    //     {img: img,
                    //     Name: name,
                    //     LoanAmount: loanAmount,
                    //     button: btn}]
                    //  console.log(borrows)

            
                        
                    const nameElement = document.createElement('p')
                    nameElement.innerHTML = name

                    const loanElement =  document.createElement('p')
                    loanElement.innerHTML = loanAmount
                    
                    loanResults.append(img, nameElement, loanElement,btn)

                    innermodal.append(
                       loanResults,

                       
                    )
                }
                )
            }

                console.log(loadedData , 'theData')

            });
        }

        countryCode = this.code
    }

    function createCountry(coords, country) {
        var currentCountry = new google.maps.Polygon({
            paths: coords,
            //strokeColor: 'white',
            title: country.country,
            code: country.iso,
            strokeOpacity: 0,
            //strokeWeight: 1,
            //fillColor: country['color'], // can be used as default color
            fillOpacity: 0
        });

        countries.push(currentCountry);
    }
    // console.log("Country Code  =", countryCode)
});


