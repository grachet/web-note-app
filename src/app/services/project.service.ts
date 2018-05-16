import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Project} from '../models/Project.model';
import {Subject} from 'rxjs';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class ProjectService {

  constructor() {
  }

  actualProject: Project;
  actualProjectSubject = new Subject<Project>();

  projects: Project[] = [];
  projectsSubject = new Subject<Project[]>();

  emitProjects() {
    this.projectsSubject.next(this.projects);
  }

  saveProjects() {
    firebase.database().ref('/projects').set(this.projects);
  }

  getProjects() {
    firebase.database().ref('/projects')
      .on('value', (data: DataSnapshot) => {
          this.projects = data.val() ? data.val() : [];
          this.emitProjects();
        }
      );
  }

  changeActualProject(project: Project) {
    this.actualProject = project;
    this.emitActualProject();
  }

  emitActualProject() {
    if (this.actualProject != null) {

      this.actualProjectSubject.next(this.actualProject);
    } else {
      this.actualProjectSubject.next(this.newEmpty());
    }
  }

  newEmpty() {
    return new Project(0, '', '', '', [], [], []);
  }

  getOneProject(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/projects').orderByChild('id').equalTo(id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }




  createNewProject(newProject: Project) {
    this.projects.push(newProject);
    this.saveProjects();
    this.emitProjects();
  }

  updateProject(modProject: Project) {
    this.changeActualProject(modProject);
    const projectIndex = this.projects.findIndex(
      (projectEl) => {
        if (projectEl.id === modProject.id) {
          return true;
        }
      }
    );
    this.projects[projectIndex] = modProject;
    this.saveProjects();
    this.emitProjects();
  }

  removeProject(project: Project) {
    const projectIndexToRemove = this.projects.findIndex(
      (projectEl) => {
        if (projectEl === project) {
          return true;
        }
      }
    );
    this.projects.splice(projectIndexToRemove, 1);
    this.saveProjects();
    this.emitProjects();
  }


}
