import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Project} from '../models/Project.model';
import {ProjectService} from '../services/project.service';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-parameter-form',
  templateUrl: './parameter-form.component.html',
  styleUrls: ['./parameter-form.component.scss']
})
export class ParameterFormComponent implements OnInit, OnDestroy {

  modProjectForm: FormGroup;
  project: Project;
  projectSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectService,
              private router: Router) {
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
    this.modProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      link: ''
    });
  }

  onModProject() {
    const name = this.modProjectForm.get('name').value;
    const link = this.modProjectForm.get('link').value;
    this.project.name = name;
    this.project.link = link;
    this.projectsService.updateProject(this.project);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }


}
