/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { CalendarYearRenderer } from "@web/views/calendar/calendar_year/calendar_year_renderer";
import { session } from "@web/session";
import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";

patch( CalendarYearRenderer.prototype, {
    getDateWithMonth(month) {
        // Giladoo
        let monthOffset = isFaLang(session) ? 3 : 1
        return this.props.model.date.set({ month: this.months.indexOf(month) + monthOffset }).toISO();
    },

})


