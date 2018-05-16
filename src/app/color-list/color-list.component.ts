import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {Subscription} from 'rxjs/Subscription';
import {Project} from '../models/Project.model';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit, OnDestroy {

  hex: string;
  project: Project;
  projectSubscription: Subscription;

  constructor(private router: Router, private projectsService: ProjectService) {
  }

  ngOnInit() {
    this.hex = '#3F51B5';
    this.project = this.projectsService.newEmpty();

    this.projectSubscription = this.projectsService.actualProjectSubject.subscribe(
      (project: Project) => {
        this.project = project;
      }
    );
    this.projectsService.emitActualProject();
  }

  onRemove(index: number) {
    this.project.color.splice(index, 1);
    this.projectsService.updateProject(this.project);
  }

  invalide() {
    if (this.hex === '' || this.hex == null) {
      return true;
    } else {
      return false;
    }
  }

  onSaveColor() {
    console.log(this.hex);
    if (this.project.color == null) {
      this.project.color = [this.hex];
    } else {
      this.project.color.push(this.hex);
    }

    this.projectsService.updateProject(this.project);
  }


  copyColor(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

}
