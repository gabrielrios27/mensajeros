import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './auth-layout.component.html',
    styleUrls: ['auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
