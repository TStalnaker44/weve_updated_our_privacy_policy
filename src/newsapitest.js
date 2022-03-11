var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2022-03-11&' +
          'sortBy=popularity&' +
          'page=1&' +
          'apiKey=d24782bfd41e4d949d21c53f8291c6d2';

function setNewsAPIURL(){

}

function getNewsArticles(){
    var req = new Request(url);

          fetch(req)
            .then(response => {
            return response.json();
            })
              .then(function(response) {
                  //var articleList= response.json();
                  console.log(response);
                //   console.log(articleList.articles);
                //  // console.log(articleList("status"));
                //   console.log(articleList.totalResults);
                response.articles.forEach(Article=>{
                      console.log(Article.title);
                      console.log(Article.url)
                      console.log(Article.publishedAt)
                  })
                },
                function(error){
                    console.log("there was an error")
                }
              )
            

}
export{
    getNewsArticles, setNewsAPIURL
}