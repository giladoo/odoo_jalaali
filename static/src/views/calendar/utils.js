/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import  * as GetFormattedDateSpan  from "@web/views/calendar/utils";
//import { session } from "@web/session";
//import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";
//const { DateTime } = luxon;

patch( GetFormattedDateSpan, {
    getFormattedDateSpan(start, end){
        const isSameDay = start.hasSame(end, "days");
        // TODO:
        if (!isSameDay && start.hasSame(end, "month")) {
            // Simplify date-range if an event occurs into the same month (eg. "August 4-5, 2019")
            // TODO: d and y needed to be justified to jalaali in static/lib/luxon/luxon_fa.js
//            return start.toFormat("LLLL d") + "-" + end.toFormat("d, y");
            // Giladoo
            // TODO: if needed to create like original one, you need to make sure the same jalaali month and year too.
            return isSameDay
                ? start.toFormat("DDD")
                : start.toFormat("DDD") + " - " + end.toFormat("DDD");
        } else {
            return isSameDay
                ? start.toFormat("DDD")
                : start.toFormat("DDD") + " - " + end.toFormat("DDD");
        }
    },
})
