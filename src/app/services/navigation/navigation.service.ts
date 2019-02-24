import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private titleSubject = new BehaviorSubject('');

  constructor(
    private titleService: Title
  ) { }

  public getTitleSubject() {
    return this.titleSubject;
  }

  public setTitle(val: string) {
    this.titleSubject.next(val);
    this.titleService.setTitle(`${val} - Albumin diet`);
  }
}
