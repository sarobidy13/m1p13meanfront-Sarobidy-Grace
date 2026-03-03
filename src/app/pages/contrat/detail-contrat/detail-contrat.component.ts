import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from '../contrat.service';
import { LoyerService } from '../../loyer/loyer.service';




@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.component.html',
})
export class DetailContratComponent implements OnInit {
  contrat: any = {};
  loyers: any[] = [];
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private contratService: ContratService,
    private loyerService: LoyerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.contratService.getById(id).subscribe({
      next: (res) => { this.contrat = res.data; this.loading = false; this.loadLoyers(id); },
    });
  }

  loadLoyers(idContrat: string): void {
    this.loyerService.getByContrat(idContrat).subscribe({
      next: (res) => this.loyers = res.data,
    });
  }

  payer(idLoyer: string): void {
    if (confirm('Confirmer le paiement de ce loyer ?')) {
      this.loyerService.payer(idLoyer).subscribe({
        next: () => {
          this.message = 'Loyer marqué comme payé !';
          this.messageType = 'success';
          this.loadLoyers(this.contrat._id);
        },
        error: () => { this.message = 'Erreur'; this.messageType = 'danger'; },
      });
    }
  }

  getStatusColor(status: string): string {
    if (status === 'paye') return '#00d68f';
    if (status === 'en_retard') return '#ff3d71';
    return '#ffaa00';
  }

  getNomMois(mois: number): string {
    const moisNoms = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return moisNoms[mois - 1];
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR');
  }

  async exporterPDF(): Promise<void> {
    const pdfMakeModule = await import('pdfmake/build/pdfmake');
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
    const pdfMake = pdfMakeModule.default || pdfMakeModule;
    const pdfFonts = pdfFontsModule.default || pdfFontsModule;
    (pdfMake as any).vfs = (pdfFonts as any).vfs;

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        // Header
        {
          columns: [
            { text: 'CityHub', style: 'header' },
            { text: 'CONTRAT DE LOCATION', style: 'title', alignment: 'right' }
          ]
        },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2, lineColor: '#8B4513' }] },
        { text: '\n' },

        // Infos contrat
        {
          table: {
            widths: ['*', '*'],
            body: [
              [{ text: 'Informations du Contrat', style: 'sectionTitle', colSpan: 2, alignment: 'center' }, {}],
              [{ text: 'Boutique :', style: 'label' }, { text: this.contrat.idBoutique?.nom || '—', style: 'value' }],
              [{ text: 'Date de début :', style: 'label' }, { text: this.formatDate(this.contrat.dateDebut), style: 'value' }],
              [{ text: 'Date de fin :', style: 'label' }, { text: this.formatDate(this.contrat.dateFin), style: 'value' }],
              [{ text: 'Montant mensuel :', style: 'label' }, { text: `${this.contrat.montantMensuel?.toLocaleString()} Ar`, style: 'valueBold' }],
              [{ text: 'Status :', style: 'label' }, { text: this.contrat.status?.toUpperCase(), style: 'value' }],
              [{ text: 'Date de création :', style: 'label' }, { text: this.formatDate(this.contrat.createdAt), style: 'value' }],
            ]
          },
          layout: {
            fillColor: (rowIndex: number) => rowIndex === 0 ? '#8B4513' : rowIndex % 2 === 0 ? '#FFF8DC' : null,
          }
        },
        { text: '\n' },

        // Tableau loyers
        { text: 'Suivi des Loyers', style: 'sectionTitle2', margin: [0, 0, 0, 8] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Période', style: 'tableHeader' },
                { text: 'Montant', style: 'tableHeader' },
                { text: 'Échéance', style: 'tableHeader' },
                { text: 'Date Paiement', style: 'tableHeader' },
                { text: 'Status', style: 'tableHeader' },
              ],
              ...this.loyers.map(l => [
                { text: `${this.getNomMois(l.mois)} ${l.annee}`, style: 'tableCell' },
                { text: `${l.montant?.toLocaleString()} Ar`, style: 'tableCell' },
                { text: this.formatDate(l.dateEcheance), style: 'tableCell' },
                { text: l.datePaiement ? this.formatDate(l.datePaiement) : '—', style: 'tableCell' },
                { text: l.status?.toUpperCase(), style: 'tableCell', color: l.status === 'paye' ? '#00b887' : l.status === 'en_retard' ? '#ff3d71' : '#ffaa00' },
              ])
            ]
          },
          layout: {
            fillColor: (rowIndex: number) => rowIndex === 0 ? '#3b1f0f' : rowIndex % 2 === 0 ? '#FFF8DC' : null,
          }
        },
        { text: '\n' },

        // Résumé
        {
          columns: [
            { text: [{ text: 'Total payé : ', style: 'label' }, { text: `${this.loyers.filter(l => l.status === 'paye').reduce((s, l) => s + l.montant, 0).toLocaleString()} Ar`, style: 'valueGreen' }] },
            { text: [{ text: 'Total impayé : ', style: 'label' }, { text: `${this.loyers.filter(l => l.status !== 'paye').reduce((s, l) => s + l.montant, 0).toLocaleString()} Ar`, style: 'valueRed' }] }
          ]
        },
        { text: '\n\n\n' },

        // Signatures
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: '#8B4513' }] },
        { text: '\n' },
        {
          columns: [
            { text: 'Signature Gérant\n\n\n___________________', alignment: 'center', style: 'signature' },
            { text: 'Signature Admin\n\n\n___________________', alignment: 'center', style: 'signature' },
          ]
        },
        { text: `Généré le ${new Date().toLocaleDateString('fr-FR')}`, style: 'footer', alignment: 'center', margin: [0, 20, 0, 0] }
      ],

      styles: {
        header: { fontSize: 16, bold: true, color: '#8B4513' },
        title: { fontSize: 14, bold: true, color: '#3b1f0f' },
        sectionTitle: { fontSize: 12, bold: true, color: '#F5DEB3', margin: [0, 4, 0, 4] },
        sectionTitle2: { fontSize: 13, bold: true, color: '#8B4513' },
        label: { fontSize: 10, bold: true, color: '#8B4513' },
        value: { fontSize: 10, color: '#333' },
        valueGreen: { fontSize: 11, bold: true, color: '#00b887' },
        valueRed: { fontSize: 11, bold: true, color: '#ff3d71' },
        valueBold: { fontSize: 11, bold: true, color: '#3b1f0f' },
        tableHeader: { fontSize: 10, bold: true, color: '#F5DEB3', margin: [4, 4, 4, 4] },
        tableCell: { fontSize: 9, margin: [4, 3, 4, 3] },
        signature: { fontSize: 10, color: '#555' },
        footer: { fontSize: 9, color: '#aaa', italics: true },
      }
    };

    (pdfMakeModule as any).createPdf(docDefinition).download(`Contrat_${this.contrat.idBoutique?.nom}_${this.formatDate(this.contrat.dateDebut)}.pdf`);
  }

  retour(): void { this.router.navigate(['/pages/contrat']); }
}
