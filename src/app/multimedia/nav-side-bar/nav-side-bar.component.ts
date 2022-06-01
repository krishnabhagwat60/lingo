import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.css']
})
export class NavSideBarComponent implements OnInit {
  audSrc: SafeUrl;
  constructor(private sanitize: DomSanitizer) { }

  ngOnInit(): void {
  }
  sanitizeUrl(url: string) {
    return this.sanitize.bypassSecurityTrustUrl(url);
  }
  
  audFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (evt: any) => {
        this.audSrc = evt.target.result;
          };
      }
    }
}
