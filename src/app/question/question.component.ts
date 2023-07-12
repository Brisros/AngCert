import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../data.models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input({ required: true })
  question!: Question;
  @Input()
  correctAnswer?: string;
  @Input()
  userAnswer?: string;
  @Input()
  userAnswerState?: string;
  @Input() canCancelQuestion: boolean = true;
  @Output() cancelQuestion: EventEmitter<Question> = new EventEmitter();

  getButtonClass(answer: string): string {
    if (!this.userAnswer) {
      if (this.currentSelection == answer) return 'tertiary';
    } else {
      if (this.userAnswer == this.correctAnswer && this.userAnswer == answer)
        return 'tertiary';
      if (answer == this.correctAnswer) return 'secondary';
    }
    if (answer === this.userAnswerState) {
      return 'tertiary';
    }

    return 'primary';
  }

  @Output()
  change = new EventEmitter<string>();

  currentSelection!: string;

  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(answer);
  }

  changeQuestion() {
    this.cancelQuestion.emit(this.question);
  }
}
