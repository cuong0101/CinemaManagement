import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0
  canShowSearch = false;
  constructor() { }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearch(window.innerWidth);
  }
  ngOnInit() {
    this.checkCanShowSearch(window.innerWidth);
  }

  getHeaderClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth >768){
      styleClass = 'head-trimmed';
    }
    else{
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }
  checkCanShowSearch(innerWidth: number){
    if(innerWidth < 845) this.canShowSearch = true;
    else this.canShowSearch = false;
  }
}
