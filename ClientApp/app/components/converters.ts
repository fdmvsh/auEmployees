import * as Moment from "moment";

export class DateFormatValueConverter {
    toView(value) {
        return Moment(value).format('MM.DD.YYYY');
    }
}