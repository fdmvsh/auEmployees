import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import * as Moment from "moment";
import '../bootstrap-datepicker3.css';

@inject(HttpClient, json)
export class Edit {
    _id: string;
    firstName: string;
    lastName: string;
    address: string;
    birthDate: Date;
    startDate: Date;
    position: string;
    formerPositions: string;
    salary: number;
    statusCode: any;
    textShowAll = "Cancel";
    http: HttpClient;
    isUpdated: boolean;
    positions: string[];

    constructor(http: HttpClient) {
        this.http = http;
        this.fetchPositions();
    }

    activate(params) {
        return this.http.fetch("/api/Employee/" + params._id).then(response => response.json()).then(data => {
            this._id = data._id;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.address = data.address;
            this.birthDate = data.birthDate;
            this.startDate = data.startDate;
            this.position = data.position;
            this.formerPositions = data.formerPositions;
            this.salary = data.salary
        });
    }

    editEmployee() {
        const employee = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Address: this.address,
            BirthDate: this.birthDate,
            StartDate: this.startDate,
            Position: this.position,
            FormerPositions: this.formerPositions,
            Salary: this.salary
        };

        this.http.fetch("/api/Employee/" + this._id, {
            method: "put",
            body: json(employee)
        }).then(response => {
            this.isUpdated = true;
            this.statusCode = response.status;
            this.textShowAll = "Show all";
        });
    }

    fetchPositions() {
        return this.http.fetch("/api/Employee/Positions")
            .then(response => response.json()).then(data => {
                this.positions = data;
            });
    }
}