/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { CalendarCommonRenderer } from "@web/views/calendar/calendar_common/calendar_common_renderer.js";
import { formatDate } from "@web/core/l10n/dates";

const { DateTime } = luxon;

patch(CalendarCommonRenderer, {
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
    }

})