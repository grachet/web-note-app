import {Component} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(public router: Router) {



    var config = {
      apiKey: 'AIzaSyAmwezb-M_PeyWFaatUmmsvdVT1pbkpGjA',
      authDomain: 'web-note-app.firebaseapp.com',
      databaseURL: 'https://web-note-app.firebaseio.com',
      projectId: 'web-note-app',
      storageBucket: 'web-note-app.appspot.com',
      messagingSenderId: '681238991186'
    };
    firebase.initializeApp(config);

  }


}
