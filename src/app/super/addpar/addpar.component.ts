import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { SuperService } from '../../service/super.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2'
import * as jsPDF from 'jspdf';
import * as $ from "jquery";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-addpar',
  templateUrl: './addpar.component.html',
  styleUrls: ['./addpar.component.scss']
})
export class AddparComponent implements OnInit {
  listePar = []
    partform: FormGroup;
  addparData = {imageName: File=null};
  imageUrl: string = "/assets/img/b1.jpg";
  errorMsg = '';
  constructor( private formBuilder: FormBuilder,private _superService :SuperService,
     private _auth: AuthService,private _router: Router) { }
  
  ngOnInit() {}
downloadPdf(){
   
  var pageWidth = 9,
  lineHeight = 1.1,
  margin = 0.4,
  maxLineWidth = pageWidth - margin * 2,
  fontSize = 15,
  ptsPerInch = 72,
  oneLineHeight = fontSize * lineHeight / ptsPerInch,
  text = 

 'Raison sociale du prestataire,forme juridique, montant de son capital\n' +
   ' social, adresse de son siège social, numéro d’immatriculation au RCS et ville où se trouve le greffe qui tient le RCS où il est immatriculé \n' +
 'Représenté par [prénom et nom du représentant du prestataire, nature de sa fonction et date à laquelle il a été habilité à signer pour le compte de la société qu’il représente, prénom, nom et fonction de la personne qui l’a habilité]\n' +
 ' Ci-après désigné « le Prestataire »\n' +
 ' D’une part\n' +
' Et :\n' +
 'Raison sociale du client, forme juridique, montant de son capital social, adresse de son siège social, numéro d’immatriculation au RCS et ville où se trouve le greffe qui tient le RCS où il est immatriculé \n' +
' Représenté par [prénom et nom du représentant du client, nature de sa fonction et date à laquelle il a été habilité à signer pour le compte de la société qu’il représente, prénom, nom et fonction de la personne qui l’a habilité]\n' +
'  Ci-après désigné « le Client »\n' +
 ' D’autre part,\n' +
' Il a été arrêté et convenu ce qui suit : \n' +
' Article un - Nature de la mission\n' +
' Le Client confie au Prestataire une mission consistant à répondre aux besoins suivants :\n' +
' [Indiquer les besoins du client et les services que le prestataire s\'engage à fournir pour y répondre].\n' +
' Le cas échéant : \n' +
 ' Dans le cadre de cette mission, le Prestataire s\'engage à mettre ses collaborateurs à la disposition du Client si cela est nécessaire pour la bonne exécution de la mission. Cependant, lesdits salariés resteront sous l\'autorité et sous la responsabilité du Prestataire pendant leur intervention chez le Client.\n' +
' Article deux - Prix et modalités de paiement\n'+
 ' Au choix selon le cas :\n' +
  '   • Le Client s’engage à payer au Prestataire un prix total de f hors taxes payable selon l’échéancier suivant :\n' +

       '  f hors taxes lors de la signature du présent contrat,\n' +
         'fhors taxes en fin de mission.\n' +
    ' • Le Client s\'engage à payer un prix fixé en fonction d\'un tarif horaire de f hors taxes.\n' +
 
 ' D’autre part, il s’engage à rembourser au Prestataire les éventuels frais de déplacement ou de séjour à l’hôtel qui seraient nécessités pour l’exécution de la mission. Ces frais seront engagés après accord écrit du Client et ils devront être remboursés sur présentation des justificatifs.\n' +
 ' Article trois - Obligations du Prestataire \n' +
 ' Il est rappelé que le Prestataire est tenu à une obligation de moyens. Il doit donc exécuter sa mission conformément aux règles en vigueur dans sa profession et en se conformant à toutes les données acquises dans son domaine de compétence.\n' +
 ' Il reconnaît que le Client lui a donné une information complète sur ses besoins et sur les impératifs à respecter.\n' +
 'Il s\'engage à se conformer au règlement intérieur et aux consignes de sécurité applicables chez le Client.\n' +
 'Enfin, il s’engage à observer la confidentialité la plus totale en ce qui concerne le contenu de la mission et toutes les informations ainsi que tous les documents que le Client lui aura communiqués.\n' +
 'Article quatre - Obligations du Client\n' +
 'Afin de permettre au Prestataire de réaliser la mission dans de bonnes conditions, le Client s’engage à lui remettre tous les documents nécessaires dans les meilleurs délais.\n' +
 'Article cinq – Responsabilité\n' +
 ' La responsabilité du Prestataire ne pourra être mise en cause qu\'en cas de manquement à son obligation de moyens. En outre, le Client ne pourra pas l\'invoquer dans les cas suivants : \n' +
   '  • s\'il a omis de remettre au Prestataire un document ou une information nécessaire pour la mission\n' +

     '• en cas de force majeure ou d\'autres causes indépendantes de la volonté du Prestataire.\n' +
 ' Article six - Droit applicable et juridiction compétente \n' +
 ' Le présent contrat est assujetti au droit français. Tout litige qui résulterait de son exécution sera soumis aux tribunaux dont dépend le siège social du Prestataire.\n' +
 
 'Fait le [date] en deux exemplaires à [ville]\n' +

 
' Le Prestataire\n' +

 '[nom du signataire]\n' +

 '[signature]\n'+
'Le Client\n' +
 '[nom du signataire]\n' +
'[signature]' ,

  doc = new jsPDF({
    unit: 'in',
    lineHeight: lineHeight
  }).setProperties({  title: 'String Splitting' });
  doc.setFontSize(22);
// splitTextToSize takes your string and turns it in to an array of strings,
// each of which can be displayed within the specified maxLineWidth.
var textLines = doc
  .setFont('helvetica', 'neue')
  .setFontSize(fontSize)
  .splitTextToSize(text, maxLineWidth);

// doc.text can now add those lines easily; otherwise, it would have run text off the screen!
doc.text(textLines, margin, margin + 2 * oneLineHeight);

// You can also calculate the height of the text very simply:
var textHeight = textLines.length * fontSize * lineHeight / ptsPerInch;
doc
  .setFontStyle('bold')
  .text('Contrat de prestation de service  Entre les soussignés ', margin, margin + oneLineHeight);

  doc.save('recu.pdf')
}
  handleFileInput(file: FileList) {
    this.addparData.imageName = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.addparData.imageName );
  }
  addPar(){
    this._superService.addPar(this.addparData)
    .subscribe(
      res => {
        if (res) {
          Swal.fire({
            html: '<h3>Le partenaire a été créé avec success<h3>',
            type: 'warning',
            showConfirmButton: false,
          })
          this._router.navigate(['/super'])

        }
      },
      err => {
        this.errorMsg = err.statusText
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._auth.logoutUser();                         }
          }
        
      }
    )
  }
}



