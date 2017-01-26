import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import * as Moment from "moment";

@inject(HttpClient, json)
export class Insert {
    _id: string;
    firstName: string;
    lastName: string;
    address: string;
    birthDate: string;
    startDate: string;
    position: string;
    formerPositions: string;
    salary: number;
    isInserted = false;
    http: HttpClient;
    public positions: string[];

    constructor(http: HttpClient) {
        this.http = http;
        this.startDate = Moment(new Date()).format('YYYY/MM/DD');
        this.fetchPositions();
    }

    fetchPositions() {
        return this.http.fetch("/api/Employee/Positions")
            .then(response => response.json()).then(data => {
                this.positions = data;
            });
    }

    insertEmployee() {
        const newEmployee = {
            _id: "",
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            birthDate: this.birthDate,
            startDate: this.startDate,
            formerPositions: "",
            position: this.position,
            salary: this.salary
        };
        this.http.fetch("/api/Employee/", {
            method: "post",
            body: json(newEmployee)
        }).then(response => {
            this.isInserted = true;
        });

    }
}