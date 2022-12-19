import moment from "moment-timezone";
import "moment/dist/locale/id";

const config = {
  locale: "id",
  timeZone: "Asia/Jakarta",
};

moment.locale(config.locale);

function dateTime(inp: moment.MomentInput = undefined) {
  return moment(inp).tz(config.timeZone);
}

function age(inp: moment.MomentInput) {
  let diff = moment(inp).tz(config.timeZone).diff(dateTime(), "milliseconds");
  return moment.duration(diff).humanize();
}

export { dateTime, age };
