/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { CalendarCommonRenderer } from "@web/views/calendar/calendar_common/calendar_common_renderer";
import { formatDate } from "@web/core/l10n/dates";

const { DateTime } = luxon;

patch(CalendarCommonRenderer.prototype, {
    headerTemplateProps(date) {
        const scale = this.props.model.scale;
        // when rendering months, FullCalendar uses a date w/out tz
        // so use UTC instead of local tz when converting to DateTime
        const options = scale === "month" ? { zone: "UTC" } : {};
        const { weekdayShort, weekdayLong, day } = DateTime.fromJSDate(date, options);
        // Giladoo
        let localDay = formatDate(DateTime.fromJSDate(date, options), { format: "d" })
        return {
            weekdayShort,
            weekdayLong,
            day: localDay,
            scale,
        };
    },
    getDayCellClassNames(info) {
        const date = luxon.DateTime.fromJSDate(info.date).toISODate();
//        console.log('cell:', this)
        if (this.props.model.unusualDays.includes(date)) {
            return ["o_calendar_disabled"];
        }
        return [];
    }
})