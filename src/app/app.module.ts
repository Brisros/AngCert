import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {QuizMakerComponent} from './quiz-maker/quiz-maker.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownAutoComponent } from './dropdown-auto/dropdown-auto.component';
import { CharsBoldPipe } from './chars-bold.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
    DropdownComponent,
    DropdownAutoComponent,
    CharsBoldPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
