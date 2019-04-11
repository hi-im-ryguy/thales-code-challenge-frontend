import { Component } from '@angular/core';
import { UsersFoodService } from './users-food.service';
import { Pipe, PipeTransform } from '@angular/core';

export interface UsersFood {
  hero_name: string;
  first_name: string;
  last_name: string;
  favorite_foods: Array<object>;
}

@Pipe({name: 'returnStringIfEmpty'})
export class ReturnStringIfEmpty implements PipeTransform {
  transform(value: string): string {
    return value === '' ? 'Sometimes Nothing' : value;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'thales-code-challenge';
  heroes = undefined;
  notification = '';

  isPostForm = false;
  form = {
    hero_name: '',
    first_name: '',
    last_name: '',
    favorite_food: ''
  };

  isDeleteForm = false;
  deleteForm: number;

  displayedColumns: string[] = ['hero_name', 'first_name', 'last_name', 'favorite_foods'];
  constructor(private usersFoodService: UsersFoodService) {}
  onGetUserFood() {
    this.notification = '';
    this.usersFoodService.getUsersFood().subscribe(
      (response: Response) => {
        this.heroes = response;
      },
      (error: Error) => {
        this.notification = error.message;
        console.error(error);
      }
    );
  }
  onReset() {
    this.notification = '';
    this.isPostForm = false;
    this.isDeleteForm = false;
  }
  onOpenPostForm() {
    this.isPostForm = true;
    this.isDeleteForm = false;
    this.notification = '';
  }
  onPostForm() {
    if (this.form.hero_name === '' || this.form.first_name === '' || this.form.last_name === '') {
      this.notification = 'Your hero needs a hero name, a first name, and a last name.';
      return;
    }
    this.usersFoodService.postUserFood(this.form).subscribe(
      (response: Response) => {
        this.heroes = response.json;
        this.onGetUserFood();
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }
  onOpenDeleteForm() {
    this.isDeleteForm = true;
    this.isPostForm = false;
    this.notification = '';
  }
  onDeleteForm(id: number) {
    return this.usersFoodService.deleteFood(id).subscribe(
      (response: Response) => {
        console.log(response);
        this.onGetUserFood();
      },
      (error: Error) => {
        console.error(error)
      }
    )
  }
}
