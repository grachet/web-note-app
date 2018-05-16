import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {Subscription} from 'rxjs/Subscription';
import {Project} from '../models/Project.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from '../models/Note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit, OnDestroy {

  noteForm: FormGroup;
  project: Project;
  projectSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router, private projectsService: ProjectService) {
  }

  ngOnInit() {
    this.initForm();
    this.project = this.projectsService.newEmpty();

    this.projectSubscription = this.projectsService.actualProjectSubject.subscribe(
      (project: Project) => {
        this.project = project;
      }
    );
    this.projectsService.emitActualProject();
  }

  initForm() {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSaveNote() {
    const title = this.noteForm.get('title').value;
    const content = this.noteForm.get('content').value;

    const newNote = new Note(title, content, Date.now());
    if (this.project.note == null) {
      this.project.note = [newNote];
    } else {
      this.project.note.push(newNote);
    }
    this.projectsService.updateProject(this.project);
    this.router.navigate(['/project/note']);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

}
