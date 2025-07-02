/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { CalendarYearRenderer } from "@web/views/calendar/calendar_year/calendar_year_renderer";
import { session } from "@web/session";
import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";
const { DateTime } = luxon;

patch( CalendarYearRenderer.prototype, {
    getDateWithMonth(month) {
        // Giladoo
        // there is a difference between last days of month and first days of month.
        let propDate = this.props.model.date
//        let monthOffset = isFaLang(session) ? 4 : 1
        if (isFaLang(session)){
//                console.log('propDate 1:', this.props.model.date.toLocaleString())
                const jDate = jalaali.toJalaali(propDate.year, propDate.month, propDate.day, )
//                console.log('propDate 2:', jDate)
                const gDate = jalaali.jalaaliToDateObject(jDate.jy,this.months.indexOf(month) + 1, 1 )

                propDate = DateTime.fromJSDate(gDate ).toISO()
                console.log('propDate 3:', this.months.indexOf(month),  propDate )

        } else {
             propDate = this.props.model.date.set({ month: this.months.indexOf(month) + 1 }).toISO()

        }

        return propDate

    },

})


