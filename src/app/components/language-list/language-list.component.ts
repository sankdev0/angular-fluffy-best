import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/common/language';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  languages?: Language[];

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.getLanguageList();
  }

  getLanguageList() {
    this.languageService.getLanguageList().subscribe(
      data => {
        this.languages = data;
      }
    )
  }

}
