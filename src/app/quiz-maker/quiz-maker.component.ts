import { Component } from '@angular/core';
import { Category, Difficulty, Question } from '../data.models';
import { Observable, map, tap } from 'rxjs';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent {
  categories$: Observable<Category[]>;
  questions$!: Observable<Question[]>;

  uniqueCategories: Category[] = [];
  activeCategories: Category[] = [];
  allSubCategories: Category[] = [];
  hasSubCategory: boolean = false;
  currentCategory: string = '';
  defaultCategory: Category = { id: 0, name: 'Easy' };
  difficultOptions: Category[] = [
    { ...this.defaultCategory },
    { ...this.defaultCategory, name: 'Medium' },
    { ...this.defaultCategory, name: 'Hard' },
  ];
  catId = '';
  difficulty = '';

  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories().pipe(
      tap((allCategories) => {
        console.log('HE: ', allCategories);
        const categories = allCategories.map((category) => ({
          ...category,
          name: this.extractCategory(category.name),
          subCategory: this.mapSubCategory(category.name),
        }));
        console.log('TU: ', categories);
        this.allSubCategories = categories
          .filter((item) => item.subCategory !== undefined)
          .map((item) => ({
            ...item,
            name: item.subCategory,
            subCategory: item.name,
          }));
        console.log('All Categories:', this.allSubCategories);
        // map sub categories
        // let subCategories = categories
        //   .filter((item) => item.hasSub)
        //   .map((item) => ({
        //     ...item,
        //     name: this.extractSubCategory(item.name),
        //   }));
        // console.log('CATs: ', subCategories);
        // this.subCategories = subCategories;
        //return unique categories
        const map = new Map(categories.map((cat) => [cat.name, cat]));
        this.uniqueCategories = [...map.values()];
      })
    );
  }

  extractCategory(category: string): string {
    return category.includes(':')
      ? category.substring(0, category.indexOf(':'))
      : category;
  }

  mapSubCategory(category: string): any {
    return category.includes(':')
      ? category.substring(category.indexOf(':') + 1, category.length).trim()
      : undefined;
  }

  createQuiz(): void {
    if (this.catId.length !== 0 && this.difficulty.length !== 0)
      this.questions$ = this.quizService.createQuiz(
        this.catId,
        this.difficulty as Difficulty
      );
  }

  handleCatSelectedOption(event: any): void {
    console.log('Received: ', event);
    this.catId = event.id;
    this.currentCategory = event.name;
    this.hasSubCategory = event.subCategory;
    this.getSubCategories();
  }
  handleSubCatSelectedOption(event: any): void {
    console.log('Received: ', event);
    this.catId = event.id;
    // this.currentCategory = event.name;
    // this.hasSubCategory = event.subCategory;
  }

  handleSelectedDifficulty(event: any): void {
    console.log('Received: ', event);
    this.difficulty = event.name;
  }

  getSubCategories(): void {
    console.log('Getting sub categories');
    this.activeCategories = this.allSubCategories.filter(
      (item) => item.subCategory === this.currentCategory
    );
    console.log('sub categories ', this.activeCategories);
  }
}
