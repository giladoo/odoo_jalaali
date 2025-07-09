/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { CalendarYearRenderer } from "@web/views/calendar/calendar_year/calendar_year_renderer";
import { session } from "@web/session";
import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";
const { DateTime } = luxon;

patch( CalendarYearRenderer.prototype, {
    getDateWithMonth(month) {
        // Giladoo
        let propDate = this.props.model.date
        if (isFaLang(session)){
            const jDate = jalaali.toJalaali(propDate.year, propDate.month, propDate.day, )
            const gDate = jalaali.jalaaliToDateObject(jDate.jy,this.months.indexOf(month) + 1, 1 )
            propDate = DateTime.fromJSDate(gDate ).toISO()
        } else {
             propDate = this.props.model.date.set({ month: this.months.indexOf(month) + 1 }).toISO()
        }
        return propDate

    },

})


