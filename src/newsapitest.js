var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2022-03-11&' +
          'sortBy=popularity&' +
          'apiKey=d24782bfd41e4d949d21c53f8291c6d2';

function setNewsAPIURL(){

}

function getNewsArticles(){
    var req = new Request(url);

          fetch(req)
              .then(function(response) {
                  console.log(response.json());
              })

}
export{
    getNewsArticles, setNewsAPIURL
}