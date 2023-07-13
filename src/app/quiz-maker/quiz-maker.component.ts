import { Component } from '@angular/core';
import { Category, Difficulty, GenericItem, Question } from '../data.models';
import { Observable, map, tap, withLatestFrom, BehaviorSubject } from 'rxjs';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent {
  enableAutoComplete: boolean = false;
  categories$: Observable<Category[]>;
  questions$!: Observable<Question[]>;
  currentQuestions$ = new BehaviorSubject<Question[]>([]);

  uniqueCategories: Category[] = [];
  uniqueCategoriesGeneric: GenericItem<Category>[] = [];
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
  canCancelQuestion: boolean = true;

  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories().pipe(
      tap((allCategories) => {
        const categories = allCategories.map((category) => ({
          ...category,
          name: this.extractCategory(category.name),
          subCategory: this.mapSubCategory(category.name),
        }));
        this.allSubCategories = categories
          .filter((item) => item.subCategory !== undefined)
          .map((item) => ({
            ...item,
            name: item.subCategory,
            subCategory: item.name,
          }));
        const map = new Map(categories.map((cat) => [cat.name, cat]));
        this.uniqueCategories = [...map.values()];
        this.uniqueCategoriesGeneric = this.mapGenericItem([...map.values()]);
      })
    );
  }

  mapGenericItem(categories: Category[]): GenericItem<Category>[] {
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
    })) as unknown as GenericItem<Category>[];
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

  createQuiz(records: number = 5): void {
    this.canCancelQuestion = true;
    this.quizService.resetAnswersState();
    if (this.catId.length !== 0 && this.difficulty.length !== 0)
      this.questions$ = this.getQuizQuestions(records);
  }

  getQuizQuestions(records: number): Observable<Question[]> {
    return this.quizService
      .createQuiz(this.catId, this.difficulty as Difficulty, records)
      .pipe(
        tap((questions) => {
          if (records !== 1) {
            this.currentQuestions$.next(questions);
          }
        })
      );
  }

  handleCatSelectedOption(event: any): void {
    this.catId = event.id;
    this.currentCategory = event.name;
    this.hasSubCategory = event.subCategory;
    this.getSubCategories();
  }

  handleSubCatSelectedOption(event: any): void {
    this.catId = event.id;
  }

  handleSelectedDifficulty(event: any): void {
    this.difficulty = event.name;
  }

  getSubCategories(): void {
    this.activeCategories = this.allSubCategories.filter(
      (item) => item.subCategory === this.currentCategory
    );
  }

  toggleAutoComplete(): void {
    this.enableAutoComplete = !this.enableAutoComplete;
  }

  cancelQuestion(question: Question): void {
    this.canCancelQuestion = false;
    const oneQuizQuestion$ = this.getQuizQuestions(1);
    this.questions$ = oneQuizQuestion$.pipe(
      withLatestFrom(this.currentQuestions$),
      map(([newQuestion, currentQuestions]) => {
        const newQuestions = currentQuestions.map((current) => {
          return current.question === question.question
            ? newQuestion[0]
            : current;
        });
        return newQuestions;
      })
    );
  }
}
