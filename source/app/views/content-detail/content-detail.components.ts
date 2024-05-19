import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

import { SelectService } from '../../core/services/select.service';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './content-detail.component.html',
    styleUrl: './content-detail.component.css',
})
export class ContentDetailComponent {
    postDetails: any = {};
    providerId!: string;
    itemId!: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private selectService: SelectService
    ) {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.providerId = params['provider_id'];
            this.itemId = params['item_id'];
        });
    }

    ngOnInit() {
        this.fetchPostDetails();
    }

    fetchPostDetails() {
        this.selectService
            .getPostDetails(this.providerId, this.itemId)
            .subscribe((data) => {
                this.postDetails = data?.responses[0]?.message?.order?.items[0];
                console.log('postDetails: ', this.postDetails);
            });
    }
}
