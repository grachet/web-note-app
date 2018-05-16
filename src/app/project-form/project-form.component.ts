import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Project} from '../models/Project.model';
import {ProjectService} from '../services/project.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      link: ''
    });
  }

  onSaveProject() {
    const name = this.projectForm.get('name').value;
    const userId = firebase.auth().currentUser.uid;
    const link = this.projectForm.get('link').value;
    const newProject = new Project( Date.now(), name, link, userId, [], [], []);
    this.projectsService.createNewProject(newProject);
    this.router.navigate(['/project/list']);
  }
}

