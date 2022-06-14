import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-auth',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './footer-auth.component.html',
    styleUrls: ['footer-auth.component.scss'],
})
export class FooterAuthComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
