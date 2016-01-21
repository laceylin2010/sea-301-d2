page('/',
  articlesController.loadAll, //calling the load All function in the articleController.js file//
  articlesController.index);//displaying(rendering) it onto the html page.

page('/about', aboutController.index);//rendering to the html page//

page('/article/:id',
  articlesController.loadById,//calling the loadbyId function in the articleController.js//
  articlesController.index);//rendering the loadById to the html page

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

page('/author/:authorName',
  articlesController.loadByAuthor, //calling the loadByAuthor function in the articleController.js//
  articlesController.index);//rendering the loadByAuthor to the html page.

page('/category/:categoryName',
  articlesController.loadByCategory, //calling the loadbyCategory function in the articleController.js//
  articlesController.index);//rendering to the html page//

page();
