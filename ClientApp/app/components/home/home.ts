// The following line is a workaround for aurelia-fetch-client requiring the type UrlSearchParams
// to exist in global scope, but that type not being declared in any public @types/* package.
/// <reference path="../../../../node_modules/aurelia-fetch-client/doc/url.d.ts" />

import { HttpClient, json} from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import * as Moment from "moment";

@inject(HttpClient, json)
export class Fetchdata {
    public employees: Employee[];

    _id: string;
    firstName: string;
    lastName: string;
    address: string;
    birthDate: Date;
    startDate: Date;
    position: string;
    salary: number;

    constructor(private http: HttpClient) {
        this.fetchAllEmployees();
    }

    fetchAllEmployees() {
        return this.http.fetch("/api/Employee")
            .then(response => response.json()).then(data => {
                this.employees = data;
            });
    }

    deleteEmployee(employeeId) {
        this.http.fetch("/api/Employee/" + employeeId,
            { method: "delete" }).then(() => { this.fetchAllEmployees(); });
    }
}

interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    address: string;
    birthDate: Date;
    startDate: Date;
    position: string;
    salary: number;
}
