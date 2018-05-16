import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';

import {AgmCoreModule} from '@agm/core';
import {MDBBootstrapModule} from './typescripts/free';

import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';

import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';

import {TodoListComponent} from './todo-list/todo-list.component';

import {NoteListComponent} from './note-list/note-list.component';
import {NoteSingleComponent} from './note-single/note-single.component';

import {ColorListComponent} from './color-list/color-list.component';

import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectFormComponent} from './project-form/project-form.component';

import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {ColorService} from './services/color.service';
import {NoteService} from './services/note.service';
import {ProjectService} from './services/project.service';
import {TodoService} from './services/todo.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NoteFormComponent } from './note-form/note-form.component';
import { ParameterFormComponent } from './parameter-form/parameter-form.component';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: '', canActivate: [AuthGuardService], component: ProjectListComponent},


  {path: 'project/list', canActivate: [AuthGuardService], component: ProjectListComponent},
  {path: 'project/new', canActivate: [AuthGuardService], component: ProjectFormComponent},

  {path: 'project/parameters', canActivate: [AuthGuardService], component: ParameterFormComponent},

  {path: 'project/color', canActivate: [AuthGuardService], component: ColorListComponent},

  {path: 'project/todo', canActivate: [AuthGuardService], component: TodoListComponent},

  {path: 'project/note', canActivate: [AuthGuardService], component: NoteListComponent},
  {path: 'project/note/new', canActivate: [AuthGuardService], component: NoteFormComponent},
  {path: 'project/note/:id', canActivate: [AuthGuardService], component: NoteSingleComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SignupComponent,
    SigninComponent,
    TodoListComponent,
    NoteListComponent,
    NoteSingleComponent,
    ColorListComponent,
    ProjectListComponent,
    ProjectFormComponent,
    NoteFormComponent,
    ParameterFormComponent
  ],
  imports: [
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ColorService,
    NoteService,
    ProjectService,
    TodoService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
