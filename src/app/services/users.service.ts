import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
    constructor(private _http: Http) {

    }
    data: string;

    getUsers() {
        var headers = new Headers();
        headers.append('Authorization', 'JWT ' + this.getData());
        return this._http.get('/api/v1/users')
            .map(res => res.json());
    }

    saveUser(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/user', JSON.stringify(user), { headers: headers })
            .map(res => res.json());
    }

    updateUser(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/user/' + user._id, JSON.stringify(user), { headers: headers })
            .map(res => res.json());
    }

    deleteUser(id) {
        return this._http.delete('/api/v1/user/' + id)
            .map(res => res.json());
    }

    login(credentials) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/user/login', JSON.stringify(credentials), { headers: headers })
            .map(res => res.json());
    }

    saveData(loginElement) {
        this.data = loginElement;
        console.log(this.data);
    }

    getData(): string {
        return this.data;
    }
}