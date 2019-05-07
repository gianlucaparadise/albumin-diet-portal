import { Injectable } from '@angular/core';
import UrlFactory, { UrlConfig } from 'urlfactory-js';
import urlConfig from '../../../config/urls/urls.config.json';
import { environment } from 'src/environments/environment.js';

const urlFactory = new UrlFactory(urlConfig as any, environment.backendEnvironment);

@Injectable({
  providedIn: 'root'
})
export class UrlFactoryService {

  constructor() { }

  getUrl(urlKey: string, ...params: any[]) {
    return urlFactory.getUrl(urlKey, ...params);
  }
}
