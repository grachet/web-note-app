import {Todo} from './Todo.model';
import {Note} from './Note.model';

export class Project {

  constructor(public id: number, public name: string, public link: string,
              public userId: string, public color: string[], public note: Note[], public todo: Todo[]) {
  }


}
