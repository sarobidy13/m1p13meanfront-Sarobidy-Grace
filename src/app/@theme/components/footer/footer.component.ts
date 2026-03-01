import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="footer-container">
      <div class="footer-left">
        <nb-icon icon="code-outline" class="footer-icon"></nb-icon>
        <span class="developed-by">Développé par</span>
      </div>
      <div class="footer-names">
        <span class="name">
          <nb-icon icon="person-outline"></nb-icon>
          RAKOTOARIMALALA Fitahiana Sarobidy
        </span>
        <span class="separator">|</span>
        <span class="name">
          <nb-icon icon="person-outline"></nb-icon>
          ANDRIANISOA Grace Hariniana
        </span>
      </div>
      <div class="footer-right">
        <span class="year">© {{ currentYear }}</span>
      </div>
    </div>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
