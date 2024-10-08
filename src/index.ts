import {
    endOfMonth,
    now,
    parseDate,
    parseDateTime,
    parseTime,
    startOfMonth,
    startOfWeek,
    startOfYear,
    endOfWeek,
    endOfYear,
    DateFormatter,
    // query
    isSameDay,
    isSameYear,
    isSameMonth,
    isEqualDay,
    isEqualMonth,
    toCalendarDate,
    ZonedDateTime
} from "@internationalized/date";
import dayjs from "dayjs";

const testInternationalizedDate = (name: string, cb: () => void) => {
    console.group("@internationalized/date:" + name);
    cb();
    console.groupEnd();
};
const testDayjs = (name: string, cb: () => void) => {
    console.group("dayjs:" + name);
    cb();
    console.groupEnd();
};
const testDateFns = (name: string, cb: () => void) => {
    console.group("date-fns:" + name);
    cb();
    console.groupEnd();
};
// 基本的な操作
testInternationalizedDate("immutable", () => {
    const current = now("Asia/Tokyo");
    const next = current.add({ days: 1 });
    console.log({
        current: current.toString(),
        next: next.toString()
    });
});
testDayjs("immutable", () => {
    const current = dayjs();
    const next = current.add(1, "day");
    console.log({
        current: current.toISOString(),
        next: next.toISOString()
    });
});
// add/sub
const currentTimeZone = "Asia/Tokyo";
testInternationalizedDate("add/sub", () => {
    const current = now(currentTimeZone);
    const added = current.add({ days: 1 });
    console.log({
        current: current.toString(),
        added: added.toString()
    });
    const subed = current.subtract({ days: 1 });
    console.log({
        current: current.toString(),
        subed: subed.toString()
    });
});
testDayjs("add/sub", () => {
    const current = dayjs();
    const added = current.add(1, "day");
    console.log({
        current: current.toISOString(),
        added: added.toISOString()
    });
    const subed = current.subtract(1, "day");
    console.log({
        current: current.toISOString(),
        subed: subed.toISOString()
    });
});
// get value
testInternationalizedDate("get", () => {
    const current = now(currentTimeZone);
    console.log({
        year: current.year,
        month: current.month,
        day: current.day,
        hour: current.hour,
        minute: current.minute,
        second: current.second
    });
});
testDayjs("get", () => {
    const current = dayjs();
    console.log({
        year: current.year(),
        month: current.month(),
        day: current.date(),
        hour: current.hour(),
        minute: current.minute(),
        second: current.second()
    });
});
// parse
testInternationalizedDate("parse", () => {
    // date
    const parsedDate = parseDate("2021-01-01");
    // time
    const parsedTime = parseTime("12:00:00");
    // datetime
    const parsedDateTime = parseDateTime("2021-01-01T12:00:00");
    console.log({
        parsedDate: parsedDate.toString(),
        parsedTime: parsedTime.toString(),
        parsedDateTime: parsedDateTime.toString()
    });
});
testDayjs("parse", () => {
    // date
    const parsedDate = dayjs("2021-01-01");
    // time は非対応
    // https://github.com/iamkun/dayjs/issues/1552

    // datetime
    const parsedDateTime = dayjs("2021-01-01T12:00:00");
    console.log({
        parsedDate: parsedDate.toISOString(),
        parsedDateTime: parsedDateTime.toISOString()
    });
});
// endOf/startOf
testInternationalizedDate("startOf/endOf", () => {
    const current = now(currentTimeZone);
    console.log({
        startOfYear: startOfYear(current).toString(),
        endOfYear: endOfYear(current).toString(),
        startOfMonth: startOfMonth(current).toString(),
        endOfMonth: endOfMonth(current).toString(),
        startOfWeek: startOfWeek(current, "ja-JP").toString(),
        endOfWeek: endOfWeek(current, "ja-JP").toString()
    });
});

testDayjs("startOf/endOf", () => {
    const current = dayjs();
    console.log({
        startOfYear: current.startOf("year").toISOString(),
        endOfYear: current.endOf("year").toISOString(),
        startOfMonth: current.startOf("month").toISOString(),
        endOfMonth: current.endOf("month").toISOString(),
        startOfWeek: current.startOf("week").toISOString(),
        endOfWeek: current.endOf("week").toISOString()
    });
});
// format
testInternationalizedDate("format", () => {
    const current = now(currentTimeZone);
    const formatter = new DateFormatter("ja-JP", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });
    console.log({
        formatted: formatter.format(current.toDate())
    });
});
testDayjs("format", () => {
    const current = dayjs();
    console.log({
        formatted: current.format("YYYY-MM-DD")
    });
});
// query
testInternationalizedDate("query", () => {
    const current = now(currentTimeZone);
    const target1 = parseDate("2021-01-01");
    const target2 = parseDate("2021-01-02");
    console.log({
        isSameDay: isSameDay(current, target1),
        isSameYear: isSameYear(current, target1),
        isSameMonth: isSameMonth(current, target1),
        isEqualDay: isEqualDay(current, target1),
        isEqualMonth: isEqualMonth(current, target1),
        compare: current.compare(target1),
        compare2: target1.compare(target2)
    });
});
testDayjs("query", () => {
    const current = dayjs();
    const target1 = dayjs("2021-01-01");
    const target2 = dayjs("2021-01-02");
    console.log({
        isSameDay: current.isSame(target1, "day"),
        isSameYear: current.isSame(target1, "year"),
        isSameMonth: current.isSame(target1, "month"),
        isEqualDay: current.isSame(target1, "date"),
        isEqualMonth: current.isSame(target1, "month"),
        compare: current.diff(target1),
        compare2: target1.diff(target2)
    });
});
// format - YYYY-MM-DD
testInternationalizedDate("format - YYYY-MM-DD", () => {
    // format is YYYY-MM-DD
    const formatDate = (date: ZonedDateTime, format:string) => {

    };
    const current = now(currentTimeZone);
    console.log({
        formatted: toCalendarDate(current).toString()
    });
});
testDayjs("format - YYYY-MM-DD", () => {
    const current = dayjs();
    console.log({
        formatted: current.format("YYYY-MM-DD")
    });
});
