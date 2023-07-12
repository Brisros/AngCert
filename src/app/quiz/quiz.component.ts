import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Question } from '../data.models';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  @Input()
  questions: Question[] | null = [];
  @Input() canCancelQuestion: boolean = false;
  @Output() cancelQuestion: EventEmitter<Question> = new EventEmitter();

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl('/result');
  }

  saveState(event: string, index: number): void {
    this.userAnswers[index] = event;
    this.quizService.saveAnswersState(this.userAnswers);
  }
}
