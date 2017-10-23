import { Component } from "@angular/core"
@Component({
    selector: "book-app",
    template: `
               <div>
                  <nav class='navbar navbar-inverse'>
                       <div class='container-fluid'>
                         <ul class='nav navbar-nav'>
                           <li><a [routerLink]="['home']">Home</a></li>
                           <li><a [routerLink]="['book']">Books</a></li>
                      </ul>
                      </div>
                 </nav>    
              <div class='container'>
                <router-outlet></router-outlet>
              </div>
             </div>          
            `
})

export class AppComponent { }