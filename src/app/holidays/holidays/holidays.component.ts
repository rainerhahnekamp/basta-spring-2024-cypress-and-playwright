import { Component, inject } from '@angular/core';
import { HolidayCardComponent } from '../holiday-card/holiday-card.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { HolidaysRepository } from '../+state';
import { createHoliday } from '@app/holidays/model';
import { ImagesLoadedService } from '@app/shared';

const hiddenVienna = createHoliday({
  id: -1,
  title: 'Hidden Vienna',
  teaser: 'Secret Holiday Unlocked',
  imageUrl: 'https://api.eternal-holidays.net/holiday/vienna.jpg',
  description:
    'Congratulations, your patience paid off. You have discovered our Easter egg.',
});
@Component({
  selector: 'app-holidays',
  template: `
    <div class="container">
      <app-holiday-card
        *ngFor="let holiday of holidays()"
        [holiday]="holiday"
        data-testid="holiday-card"
      />
    </div>
  `,
  styleUrls: ['./holidays.component.scss'],
  standalone: true,
  imports: [HolidayCardComponent, NgForOf, AsyncPipe],
})
export class HolidaysComponent {
  #imagesLoadedService = inject(ImagesLoadedService);

  holidays = inject(HolidaysRepository).holidays$;
}
