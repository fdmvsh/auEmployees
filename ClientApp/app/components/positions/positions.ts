import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";

@inject(HttpClient, json)
export class Insert {
    http: HttpClient;
    positions: string[];

    constructor(http: HttpClient) {
        this.http = http;
        this.fetchPositions();
    }

    fetchPositions() {
        return this.http.fetch("/api/Employee/Positions")
            .then(response => response.json()).then(data => {
                this.positions = data;
            });
    }
}