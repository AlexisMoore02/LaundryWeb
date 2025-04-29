import moment from "moment";

export const defaultDateFrom = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
export const defaultDateTo = moment().add(7, "days").set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
