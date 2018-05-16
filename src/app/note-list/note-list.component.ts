import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {Subscription} from 'rxjs/Subscription';
import {Project} from '../models/Project.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from '../models/Note.model';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {

  project: Project;
  projectSubscription: Subscription;

  constructor(private router: Router, private projectsService: ProjectService) {
  }

  onViewProject(index: number) {
    this.router.navigate(['/project', 'note', index]);
  }

  ngOnInit() {
    this.project = this.projectsService.newEmpty();

    this.projectSubscription = this.projectsService.actualProjectSubject.subscribe(
      (project: Project) => {
        this.project = project;
        if (project.note == null) {
          console.log('note nulle');
          this.router.navigate(['/project/note/new']);
        } else if (project.note.length === 0) {
          console.log('note 0');
          this.router.navigate(['/project/note/new']);
        }
      }
    );
    this.projectsService.emitActualProject();
  }

  onRemove(index: number) {
    this.project.note.splice(index, 1);
    this.projectsService.updateProject(this.project);
  }

  isNote() {
    if (this.project != null) {
      if (this.project.note != null) {
        if (this.project.note.length > 0) {
          return true;
        }
      }

    } else return false;
    return false;
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

}
