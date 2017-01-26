import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import * as Moment from "moment";

@inject(HttpClient, json)
export class Insert {
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

    constructor(http: HttpClient) {
        this.http = http;
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
}