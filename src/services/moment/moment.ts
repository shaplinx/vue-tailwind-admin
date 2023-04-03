import m from "moment-timezone"  ;
import "moment/dist/locale/id";

const config = {
  locale: "id",
  timeZone: "Asia/Jakarta",
};

m.locale(config.locale);

export function dateTime(inp: m.MomentInput = undefined) {
  return m(inp).tz(config.timeZone);
}

export function moment(inp: m.MomentInput = undefined) {
  return m.utc(inp)
};

export function date(inp: m.MomentInput = undefined) {
  return m(inp).local();
}


export function age(inp: m.MomentInput) {
  let diff = m(inp).tz(config.timeZone).diff(dateTime(), "milliseconds");
  return m.duration(diff).humanize();
}

