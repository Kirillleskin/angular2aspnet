"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./Components/home.component");
var book_component_1 = require("./Components/book.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'book', component: book_component_1.BookComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map