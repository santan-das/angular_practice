import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentService } from './department.service';
import {HttpClientModule}    from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule,MatInputModule,MatButtonModule,MatSelectModule,MatIconModule,MatDialogModule  } from '@angular/material';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ShowpopupComponent } from './showpopup/showpopup.component';
import {NgxPrintModule} from 'ngx-print';
// import {MatInputModule} from '@angular/material/input';
// import {MatButtonModule} from '@angular/material/button';
 



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DialogBodyComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ShowpopupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxPrintModule
    
    
  ],
  providers: [DepartmentService],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent,ShowpopupComponent]
})
export class AppModule { }
