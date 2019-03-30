class DateUtility {
    addDays = function (date, days) {
        return new Date(date.valueOf() + days * 864e5);
    }

    isThisWeek = function (date) {
        return date < new Date().setHours(0).addDays(7);
    }
}