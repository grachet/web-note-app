import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {Subscription} from 'rxjs/Subscription';
import {Project} from '../models/Project.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  projectnull = false;
  project: Project;
  projectSubscription: Subscription;

  constructor(private router: Router, private projectsService: ProjectService) {
  }

  ngOnInit() {
    this.project = this.projectsService.newEmpty();

    this.projectSubscription = this.projectsService.actualProjectSubject.subscribe(
      (project: Project) => {
        if (project.name === '') {
          this.router.navigate(['/project/list']);

          this.projectnull = true;
        } else {
          this.projectnull = false;
          this.project = project;
        }
      }
    );
    this.projectsService.emitActualProject();
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

}
