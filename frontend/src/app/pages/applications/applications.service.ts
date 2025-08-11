import { Injectable } from '@angular/core';

export type Application = {
	id: string,
	name: string,
	requiredRank?: string,
	width?: string,
	color?: string,
	description?: string,
	pages: Page[]
}

export type Page = {
	title: string,
	description?: string,
	questions?: Question[]
	review?: boolean
}

export type Question = {
	id: string,
	type: 'short-text' | 'long-text' | 'date' | 'checkbox' | 'radio' | 'select'
	rows?: number,
	width?: number,
	label: string,
	options?: Option[]
	description?: string,
	regex?: string,
	regexErrorMessage?: string,
}

export type Option = {
	id: string,
	label: string,
	value: string,
}

export type Answers = {
	[key: string]: {
		page?: number,
		answers?: {
			[key: string]: string | string[]
		}
	}
}

@Injectable({providedIn: 'root'})
export class ApplicationsService {
	private applications: Application[] = [];

	public getApplications(): Application[] {
		return this.applications;
	}

	setApplications(applications: Application[]) {
		this.applications = applications;
	}

	getApplication(id: any): Application {
		return this.applications.find(app => app.id === id)
	}

}
