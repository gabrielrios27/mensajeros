import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-auth',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header-auth.component.html',
    styleUrls: ['header-auth.component.scss'],
})
export class HeaderAuthComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
