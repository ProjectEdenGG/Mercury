import { Component, Input } from '@angular/core';
import { Utils } from '../../../utils/utils';
import { MercuryComponent } from '../../../lifecycle/MercuryComponent';
import { ActivatedRoute, Router } from '@angular/router';
import { Answers, Application, ApplicationsService, Option, Question } from '../applications.service';
import { ApiService } from '../../../service/api.service';
import { format } from 'date-fns';

@Component({
	selector: 'application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss',
	standalone: false,
})
export class ApplicationComponent extends MercuryComponent {
	@Input() applicationId: string;
	application: Application;
	currentPage: number = 0;
	answers: Answers
	submitted: boolean;
	submitting: boolean;

	constructor(
		public router: Router,
		public route: ActivatedRoute,
		public utils: Utils,
		public apiService: ApiService,
		public applicationsService: ApplicationsService,
	) {
		super()

		this.answers = this.utils.getLocalStorageJson('application-answers')

		this.route.params.subscribe(params => {
			if (params['app'])
				this.setApplication(params['app']);
		})
	}

	override ngOnInit() {
		if (this.applicationId)
			this.setApplication(this.applicationId)
	}

	private setApplication(id: string) {
		this.application = this.applicationsService.getApplication(id)
		console.log('application selected', id, this.application)
		this.answers ??= {}
		this.answers[this.application.id] ??= {}
		this.answers[this.application.id].answers ??= {}

		this.currentPage = this.answers[this.application.id].page ?? 0;
	}

	save() {
		localStorage.setItem('application-answers', JSON.stringify(this.answers))
	}

	firstPage() {
		return this.currentPage === 0
	}

	lastPage() {
		let currentPage = this.currentPage;
		let pagesLength = this.application.pages.length - 1;
		return currentPage === pagesLength
	}

	getProgressPercentage() {
		let completedAnswers: number = 0;
		for (let index = 0; index < this.application.pages.length; index++) {
			if (index > this.currentPage)
				continue

			let page = this.application.pages[index];
			if (!page.questions)
				continue;

			completedAnswers += page.questions.filter(question => {
				if (this.getAnswer(question))
					return true;

				return index < this.currentPage && !question.required
			}).length;
		}

		let totalAnswers = this.application.pages.reduce((acc, page) => acc + (page.questions?.length ?? 0), 0)
		let progress = completedAnswers + this.currentPage
		let progressGoal = totalAnswers + this.application.pages.length

		return this.submitted ? 100 : Math.round((progress / progressGoal) * 100)
	}

	changePage(page: number) {
		this.currentPage += page;
		this.answers ??= {}
		this.answers[this.application.id] ??= {}
		this.answers[this.application.id].page = this.currentPage
		this.save()
		window.scrollTo(0, 0);
		setTimeout(() => document.querySelector<HTMLElement>('input, textarea')?.focus())
	}

	isNextDisabled() {
		if (this.application.pages[this.currentPage].questions)
			for (const question of this.application.pages[this.currentPage].questions)
				if (question.required && !this.getAnswer(question))
					return true;
		return false;
	}

	submit() {
		this.submitting = true;
		this.apiService.submitApplication(this.application.id, this.answers[this.application.id].answers).subscribe({
			next: () => {
				this.submitting = false;
				this.submitted = true;
				this.answers[this.application.id] = { answers: {} }
				this.save()
			},
			error: (error) => {
				this.submitting = false;
				console.error(error)
			}
		})
	}

	setAnswer(event: Event, question: Question, option?: Option) {
		let target: any = event.target;
		let answer = target.value;

		if (question.type === 'checkbox') {
			answer = this.answers[this.application.id].answers[question.id] ?? []
			if (target.checked)
				answer.push(option.id)
			else
				answer.remove(option.id)
		}

		this.answers ??= {}
		this.answers[this.application.id] ??= {}
		this.answers[this.application.id].answers ??= {}
		this.answers[this.application.id].answers[question.id] = answer
		this.save();
	}

	getAnswer(question: Question, option?: Option): string | boolean {
		let answer = this.answers[this.application.id].answers[question.id];
		if (option) {
			if (Array.isArray(answer))
				return answer.includes(option.id)
			return answer === option.id
		} else {
			if (Array.isArray(answer))
				return answer.join(', ')
			return answer ?? ''
		}
	}

	getAnswerFormatted(question: Question, option?: Option): string {
		let answer = this.getAnswer(question, option)
		if (typeof answer === 'string') {
			if (question.type === 'date')
				return format(answer + 'T00:00:00', 'MM/dd/yyyy');
		}

		return String(answer).replace(/\n/g, '<br>')
	}
}
