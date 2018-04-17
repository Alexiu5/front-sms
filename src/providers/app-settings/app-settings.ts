import { Injectable } from '@angular/core';


const CONFIG = {
  serverUrl : 'https://database-sms.herokuapp.com'
  // serverUrl : 'http://localhost:3000'
}

@Injectable()
export class AppSettingsProvider {

  constructor() {}

  public getServerUrl(){
    return CONFIG.serverUrl
  }

}
