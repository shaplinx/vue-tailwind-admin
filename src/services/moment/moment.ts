import moment from "moment-timezone";
import "moment/dist/locale/id";

const config = {
  locale: "id",
  timeZone: "Asia/Jakarta",
};

moment.locale(config.locale);

export function dateTime(inp: moment.MomentInput = undefined) {
  return moment(inp).tz(config.timeZone);
}

export function date(inp: moment.MomentInput = undefined) {
  return moment(inp).local();
}


export function age(inp: moment.MomentInput) {
  let diff = moment(inp).tz(config.timeZone).diff(dateTime(), "milliseconds");
  return moment.duration(diff).humanize();
}

