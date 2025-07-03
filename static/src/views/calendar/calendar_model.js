/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { CalendarModel } from "@web/views/calendar/calendar_model";
import { session } from "@web/session";
import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";
const { DateTime } = luxon;

patch( CalendarModel.prototype, {
    //--------------------------------------------------------------------------

    /**
     * @protected
     */
    computeRange() {
        const { scale, date, firstDayOfWeek } = this.meta;
        let start = date;
        let end = date;
        // Giladoo
        if (isFaLang(session)){
            if (scale !== "week") {
                // startOf("week") does not depend on locale and will always give the
                // "Monday" of the week...
                start = start.startOfJalaali(scale);
                end = end.endOfJalaali(scale);
            }

            if (["week", "month"].includes(scale)) {
                const currentWeekOffset = (start.weekday - firstDayOfWeek + 7) % 7;
                start = start.minus({ days: currentWeekOffset });
                end = start.plus({ weeks: scale === "week" ? 1 : 6, days: -1 });
            }
        } else {
            if (scale !== "week") {
                // startOf("week") does not depend on locale and will always give the
                // "Monday" of the week...
                start = start.startOf(scale);
                end = end.endOf(scale);
            }

            if (["week", "month"].includes(scale)) {
                const currentWeekOffset = (start.weekday - firstDayOfWeek + 7) % 7;
                start = start.minus({ days: currentWeekOffset });
                end = start.plus({ weeks: scale === "week" ? 1 : 6, days: -1 });
            }
        }

        start = start.startOf("day");
        end = end.endOf("day");
        console.log('computeRange\n', start.toLocaleString(), end.toLocaleString())

        return { start, end };
    }

})