import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Note} from '../models/Note.model';
import {Project} from '../models/Project.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-note-single',
  templateUrl: './note-single.component.html',
  styleUrls: ['./note-single.component.scss']
})
export class NoteSingleComponent implements OnInit {

  note: Note;

  constructor(private route: ActivatedRoute, private router: Router, private projectsService: ProjectService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.note = this.projectsService.actualProject.note[id];
  }

  onBack() {
    this.router.navigate(['/project/note']);
  }

}
