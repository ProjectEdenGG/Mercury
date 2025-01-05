import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';
import { ActivatedRoute, NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-showcase',
	templateUrl: './showcase.component.html',
	styleUrl: './showcase.component.scss',
	standalone: false,
})
export class ShowcaseComponent {
	showcase: any;
	build: string;
	scrollY: number = 0;

	tags: string[] = []
	selectedTag: string

	constructor(
		public utils: Utils,
		public location: Location,
		public router: Router,
		public route: ActivatedRoute,
		public apiService: ApiService,
	) {
		this.apiService.getShowcase().subscribe({
			next: result => {
				this.showcase = result;
				this.tags = [...new Set<string>(this.showcase.map((build: any) => build.tags).flat())].filter(tag => !!tag)
			},
			error: () => this.showcase = null
		})

		this.router.events.subscribe(e => {
			if (!(e instanceof NavigationEnd || e instanceof NavigationSkipped))
				return;

			if (e.url.includes(this.build))
				return;

			this.build = null;

			if (e instanceof NavigationSkipped)
				this.scrollTo(this.scrollY);
		})

		this.route.paramMap.subscribe(params => {
			this.build = params.get('build');
			this.scrollTo(0)
		});
	}

	navigateToBuild(build: string) {
		this.location.go('/showcase/' + build)
		this.scrollY = window.scrollY;
		this.build = build;
		this.scrollTo(0)
	}

	navigateToShowcase() {
		this.location.go('/showcase')
		this.build = null;
		this.scrollTo(this.scrollY);
	}

	scrollTo(scrollY: number) {
		setTimeout(() => window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' }), 5);
	}

	getBuildConfig() {
		return this.showcase?.find((build: any) => this.build === this.utils.asCssClass(build.name))
	}

	builders(build: any, length: 'short' | 'all' = 'all') {
		let builders = build.builders;

		if (length == 'short' && builders.length > 3)
			return builders.slice(0, 2).join(', ') + (builders.length > 2 ? `, and ${builders.length - 2} more` : '');

		if (builders.length > 2)
			return builders.slice(0, builders.length - 1).join(', ') + ', and ' + builders[builders.length - 1];

		if (builders.length > 1)
			return builders.join(' and ')

		return builders;
	}

	initialized: string[] = []

	fadeIn(build: any, event: any) {
		event.target?.classList?.remove('d-none')
		if (!this.initialized.includes(build.name))
			event.target?.classList?.add('fade-in')
		this.initialized.push(build.name)
	}

}
