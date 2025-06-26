/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { CalendarController } from "@web/views/calendar/calendar_controller";
import { session } from "@web/session";
import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";
const { DateTime } = luxon;

patch( CalendarController.prototype, {

    get date() {
//        console.log('date')
        return this.model.meta.date || DateTime.now();
    },

    get today() {
            // Giladoo
//        return DateTime.now().toFormat("d");
        return formatDate(this.date, { format: "d" });

    },

    get currentYear() {
        // Giladoo
//        return this.date.toFormat("y");
        return formatDate(this.date, { format: "y" });
    },

    get dayHeader() {
        // Giladoo
//        return `${this.date.toFormat("d")} ${this.date.toFormat("MMMM")} ${this.date.year}`;
        return `${formatDate(this.date, { format: "d" })} ${formatDate(this.date, { format: "MMMM" })} ${formatDate(this.date, { format: "y" })}`;
    },

    get weekHeader() {
        const { rangeStart, rangeEnd } = this.model;
        // Giladoo
//        console.log('weekHeader')
//        if (rangeStart.year != rangeEnd.year) {
//            return `${rangeStart.toFormat("MMMM")} ${rangeStart.year} - ${rangeEnd.toFormat(
//                "MMMM"
//            )} ${rangeEnd.year}`;
//        } else if (rangeStart.month != rangeEnd.month) {
//            return `${rangeStart.toFormat("MMMM")} - ${rangeEnd.toFormat("MMMM")} ${
//                rangeStart.year
//            }`;
//        }
//        return `${rangeStart.toFormat("MMMM")} ${rangeStart.year}`;
        if (formatDate(rangeStart, { format: "y" }) != formatDate(rangeEnd, { format: "y" })) {
            return `${formatDate(rangeStart, { format: "MMMM" })} ${formatDate(rangeStart, { format: "y" })} - ${rangeEnd.toFormat(
                "MMMM"
            )} ${formatDate(rangeEnd, { format: "y" })}`;
        } else if (formatDate(rangeStart, { format: "MMMM" }) != formatDate(rangeEnd, { format: "MMMM" })) {
            return `${formatDate(rangeStart, { format: "MMMM" })} - ${formatDate(rangeEnd, { format: "MMMM" })} ${
                formatDate(rangeStart, { format: "y" })
            }`;
        }
        return `${formatDate(rangeStart, { format: "MMMM" })} ${formatDate(rangeStart, { format: "y" })}`;
    },

    get currentMonth() {
        // Giladoo
//        return `${this.date.toFormat("MMMM")} ${this.date.year}`;
        return `${formatDate(this.date, { format: "MMMM" })} ${formatDate(this.date, { format: "y" })}`;
    },
    async setDate(move) {
        let date = null;
        // Giladoo
        switch (move) {
            case "next":
                if (isFaLang(session) && this.model.scale == 'month' ){
                // TODO:Giladoo; 1395/04 jumps to 1395/02. next month direction is ok, previous has this problem.
                    date = jalaali.monthInterval(this.model.date, 1, luxon.DateTime).start
                } else {
                    date = this.model.date.plus({ [`${this.model.scale}s`]: 1 });
                }
                break;
            case "previous":
                if (isFaLang(session) && this.model.scale == 'month' ){
                // TODO:Giladoo; 1395/04 jumps to 1395/02. next month direction is ok, previous has this problem.
                    date = jalaali.monthInterval(this.model.date, -1, luxon.DateTime).start
                } else {
                    date = this.model.date.minus({ [`${this.model.scale}s`]: 1 });
                }
                break;
            case "today":
                date = luxon.DateTime.local().startOf("day");
                if (date.ts === this.date.startOf("day").ts) {
                    this.model.bus.trigger("SCROLL_TO_CURRENT_HOUR", false);
                }
                break;
        }
//        console.log('setDate', move, this.model.date.toISODate(), date.toISODate(), this.model.scale, isFaLang(session) && this.model.scale == 'month')

        await this.model.load({ date });
    }

})