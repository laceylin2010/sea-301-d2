(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // DONE: Middleware for grabbing one article by ID:
  articlesController.loadById = function(ctx, next) {
    //creating a function with the parameters ctx(allows us to share state(sharing info between routs)), and creates next to call the next function in routes.js//
    var articleData = function(article) { //creating a function with the paramter article. It is assigning that function to a variable of articleData.
      ctx.articles = article; //Assigning the articles who ID was found by the SQL check (findwhere) and attaching it to article Data which is the arbitruary ctx.articles.

      //ctx.articles is creating a property to context(ctx). We can use ctx even though its outside the articleData function because its in a closure. It in enclosed within the whole function loadbyID. We are then setting that equal to the article parameter to.//
      next(); //calling the next function in routes.js. only being called when article Data is being called.//
    };

    Article.findWhere('id', ctx.params.id, articleData);//This is finding the ID for each particlular article in the articleData function and passing it into articleData. built from article.js 'id' as the field, 'ctx.params.id' as value, and article data as callback.
  };

  // DONE: Middleware for loading up articles by a certain author:
  articlesController.loadByAuthor = function(ctx, next) {
    //creating a function with the method loadByAuthor
    var authorData = function(articlesByAuthor) {
      //creating a function with the parameter with articlesByAuthor to the function authorData.
      ctx.articles = articlesByAuthor;//this is assigning the articlles whose authors was found by the SQL check (findwere) and attaching it to the paramater articlesbyAuthor for the AuthorData function.
      next();//being called in the route.js
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };
  //this is finding the author for each article, and the ctx.params.authorName.replace is the value, and authorData as the callback.Replacing + with spacebars in the replace method.

  // DONE: Middleware for grabbing all articles with a certain category:
  articlesController.loadByCategory = function(ctx, next) {
    //this is creating a function that loads based on the categorys and passing parameters of ctx (sharing state) and next which calls the next function in the route.js//
    var categoryData = function(articlesInCategory) {
      //this is creating a function called cateogry Data and passing in a parameter called articlesInCategory.
      ctx.articles = articlesInCategory;
      //this is adding a property articles to ctx(sharing state/information between pages) and setting it equal to the paramter articlesInCategory. This data is coming from the findWhere method that is grabbing the data from the SQL in article.js.
      next(); // calls the next function called in the next route.js.
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
    //this grabs the data from the article.js in the findwhere function that is specific to the categorys of the articles. category is the field, ctx.params.categoryName is the value we want, and categoryData is the callback function.
  };

  // DONE: Middleware for grabbing ALL articles:
  articlesController.loadAll = function(ctx, next) {
    //this is creating a function and giving it paramters of ctx(sharing state/information between pages) and next which calles the next function in route.js once it is called.
    var articleData = function(allArticles) {
      //a function is created called article Data with the paramters of allArticles.
      ctx.articles = Article.all;//setting the shared state equal to the array.
      next();//running the next function
    };

    if (Article.all.length) { //if the length of the array exists with data
      ctx.articles = Article.all; //setting the Article.all array equal ctx.articles to share states. so the context can be shared between routes.
      next();//run the next function in route.js
    } else { //if it does not exist
      Article.fetchAll(articleData); //go to the article.js and run the fetchAll function which makes sure the data exists and creates it if it doesnt using JSON.
    }
  };


  module.articlesController = articlesController;
})(window);
