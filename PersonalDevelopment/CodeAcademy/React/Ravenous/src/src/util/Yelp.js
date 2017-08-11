const clientId = 'I11zT6U1lAI2qd8b5O2pvw';
const secret = 'g4hJrd1QAcAJG70SoEI2lUitrtsYwlaGi7kgq18IryBZVzpMB8Jgmr3lMn5CYYfA';
let accessToken = '';

const yelpAccessToken = `https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`;
const CORSAnywhere = 'https://cors-anywhere.herokuapp.com/';



let Yelp = {
   
    getAccessToken : function(){
        if(accessToken.length > 0 ){
            return new Promise(resolve => resolve(accessToken));
        }
        return(
            fetch(CORSAnywhere + yelpAccessToken, {method : 'POST'}).then(response => response.json()).then(jsonResponse => accessToken = jsonResponse.access_token)
        );
    }// End get accessToken
    
    ,search : function(term, location, sortBy){
        return Yelp.getAccessToken().then(() => {

            //https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=85338&sort_by=best_match
            const YelpBusinessUrl = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
            console.log('Access Token = ' + accessToken);
            console.log('URL = ' + CORSAnywhere + YelpBusinessUrl);    
            return fetch(CORSAnywhere + YelpBusinessUrl, {headers: {Authorization : `Bearer ${accessToken}`}});
        }).then(response => {
            if(!response){
               console.log('unable to return response');
               throw new Error('No Response Returned!');
               
            }

            if(response.ok){
                return response.json();
            }
            throw new Error('Request failed!');
        
        },
    networkError => console.log(networkError.message,
    err => console.log(err.message)
    )).then(jsonResponse =>{
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc : business.image_url,
                        name: business.name,
                        address : business.location.address1 + business.location.address2  + business.location.address3,
                        city : business.location.city,
                        state : business.location.state,
                        zipCode : business.location.zip_code,
                        category : business.categories.title,
                        rating : business.rating,
                        reviewCount: business.review_count
                    };
                } );
            }
        });
        
    }
    
}

export default Yelp;