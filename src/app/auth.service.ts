import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private boltUrl = 'https://bolt-tournament-s.herokuapp.com/'; // URL to web api

  headerDict = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient, private route: Router) {}
  
  //User login function
  userLogin(payload: any) {
    const url = this.boltUrl + 'user/login';
    console.log('Inside userLogin Method of AuthService');

    this.http.post(url, payload).subscribe((res: any) => {
      if (res.accessToken) {
        localStorage.setItem('jwt', res.accessToken);
        localStorage.setItem('user', res.userInfo);
        this.storeUserDetailsInLocalStorage(res.userInfo);

        alert('Login Successful');
        this.route.navigate(['/home']).then.call(window.location.reload());
      }
    });
  }

    storeUserDetailsInLocalStorage(obj:any)
    {
      for(var key in obj)
      {
          if(key==='phoneNumber' || key==='name' || key==='_id'){
            localStorage.setItem(key, obj[key]);
          }
      }
    }

  //User logout function
  userLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('name');
    localStorage.removeItem('_id');
    localStorage.removeItem('user');
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('jwt')) {
      return true;
    }
    return false;
  }

  //User Registration function
  userRegistration(payload: any) {
    const url = this.boltUrl + 'user/create';

    this.http.post(url, payload).subscribe((res: any) => {
      if (res.accessToken) {
        console.log(res);
        localStorage.setItem('jwt', res.accessToken);
        alert('User Registered');
      }
    });
  }

  // POST: Update existing User Information
  updateUserInfo(userId: string,payload: any) {
    console.log(`Updating User Info:`+JSON.stringify(payload))
    const url = this.boltUrl + 'user/update/'+userId;

    this.http.post(url,payload).subscribe(responseData => {
      console.log(responseData)
    })
    
    alert("User Details Updated Successfully.");
  }
}
