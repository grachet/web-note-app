import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {Subscription} from 'rxjs/Subscription';
import {Project} from '../models/Project.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../models/Todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todoForm: FormGroup;
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
    this.todoForm = this.formBuilder.group({
      name: ['', Validators.required],
      realised: [false, Validators.required]
    });
  }

  onRemove(index: number) {
    this.project.todo.splice(index, 1);
    this.projectsService.updateProject(this.project);
  }

  onSaveTodo() {
    const name = this.todoForm.get('name').value;
    const realised = this.todoForm.get('realised').value;

    const newtodo = new Todo(name, realised);
    if (this.project.todo == null) {
      this.project.todo = [newtodo];
    } else {
      this.project.todo.push(newtodo);
    }
    this.organizeTodo();
    this.projectsService.updateProject(this.project);
  }

  organizeTodo() {

    const trueTodo = this.project.todo.filter(todo => todo.realised === true);
    const falseTodo = this.project.todo.filter(todo => todo.realised === false);
    this.project.todo = falseTodo;
    for (var i = 0; i < trueTodo.length; i++) {
      this.project.todo.push(trueTodo[i]);
    }

  }


  modRealised(index: number) {
    this.project.todo[index].realised = !this.project.todo[index].realised;
    this.organizeTodo();
    this.projectsService.updateProject(this.project);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

}
