import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResponsiveUtil {
	public currentBreakpoint$: BehaviorSubject<string> = new BehaviorSubject('unknown');

	private breakpointsMap = new Map([
		['xs', '(max-width: 575.98px)'],
		['sm', '(min-width: 576px) and (max-width: 767.98px)'],
		['md', '(min-width: 768px) and (max-width: 991.98px)'],
		['lg', '(min-width: 992px) and (max-width: 1199.98px)'],
		['xl', '(min-width: 1200px) and (max-width: 1399.98px)'],
		['xxl', '(min-width: 1400px)']
	]);

	constructor(
		public breakpointObserver: BreakpointObserver
	) {
		const breakpointQueries = Array.from(this.breakpointsMap.values());
		this.breakpointObserver.observe(breakpointQueries).subscribe((state: any) => {
			const activeBreakpoint = Array.from(this.breakpointsMap.entries()).find(([_, query]) => state.breakpoints[query]);
			this.currentBreakpoint$.next(activeBreakpoint ? activeBreakpoint[0] : 'unknown');
		});
	}

	gte(breakpoint: string): boolean {
		return this.indexOf(this.currentBreakpoint$.value) >= this.indexOf(breakpoint)
	}

	lte(breakpoint: string): boolean {
		return this.indexOf(this.currentBreakpoint$.value) <= this.indexOf(breakpoint)
	}

	eq(breakpoint: string): boolean {
		return this.indexOf(this.currentBreakpoint$.value) == this.indexOf(breakpoint)
	}

	private indexOf(breakpoint: string): number {
		const breakpoints = Array.from(this.breakpointsMap.keys());
		return breakpoints.indexOf(breakpoint)
	}

}
