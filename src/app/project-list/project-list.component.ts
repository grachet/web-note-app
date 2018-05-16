import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/project.model';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit, OnDestroy {

  projects: Project[];
  UserAllProjects: Project[];
  projectsSubscription: Subscription;
  uid: string;

  constructor(private projectsService: ProjectService, private router: Router) {
  }

  ngOnInit() {
    this.uid = firebase.auth().currentUser.uid;
    this.projectsSubscription = this.projectsService.projectsSubject.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.UserAllProjects = this.projects.filter(project => project.userId === this.uid);
        if (this.UserAllProjects.length === 0 && this.projects.length !== 0) {
          this.router.navigate(['/project/new']);
        }
      }
    );
    this.projectsService.getProjects();
    this.projectsService.emitProjects();


  }


  onDeleteProject(project: Project) {
    this.projectsService.removeProject(project);
    this.projectsService.changeActualProject(this.projectsService.newEmpty());
  }

  onViewProject(id: number) {
    this.projectsService.changeActualProject(this.projects.find(project => project.id === id));

    this.router.navigate(['/project/color']);
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}
