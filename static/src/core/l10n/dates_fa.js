/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import * as Dates from "@web/core/l10n/dates";
import { localization } from "@web/core/l10n/localization";
import { _t } from "@web/core/l10n/translation";
import { memoize } from "@web/core/utils/functions";
import { ensureArray } from "@web/core/utils/arrays";
const { DateTime, Settings } = luxon;
import { session } from "@web/session";

function isValidDate(date) {
    return date && date.isValid && Dates.isInRange(date, [Dates.MIN_VALID_DATE, Dates.MAX_VALID_DATE]);

}
/**
* Gilaneh
 * @private
 * It returns True if user language is Persian on web or website
 * @param {Object} session
 * @returns {Boolean}
*/
export const isFaLang = (_session) => {
    let isFa = false
    if (_session.is_frontend){
     isFa = session.lang_url_code == 'fa' ? true : false
    }else{
        isFa = _session.bundle_params.lang && _session.bundle_params.lang == 'fa_IR' ? true : false
    }
    return isFa
}

patch(Dates, {
    isFaLang(_session){
    let isFa = false
    if (_session.is_frontend){
     isFa = session.lang_url_code == 'fa' ? true : false
    }else{
        isFa = _session.bundle_params.lang && _session.bundle_params.lang == 'fa_IR' ? true : false
    }
    return isFa
},

    /**
    * Gilaneh
    * @override
    */
    formatDate(value, options = {}) {
        if (!value) {
            return "";
        }
        const format = options.format || localization.dateFormat;
        // Gilaneh
//        console.log('formatDate', value.year, session.bundle_params.lang)

        if(isFaLang(session) && value.year > 1600){
            return value.setZone("default").reconfigure({ outputCalendar: "persian" }).setLocale("fa").toFormat(format);
        }
        return value.toFormat(format);
    },
    /**
    * Gilaneh
    * @override
    */
    formatDateTime(value, options={} ) {
        if (!value) {
            return "";
        }
        const format = options.format || localization.dateTimeFormat;
//        console.log('formatDateTime', value.year, session.bundle_params.lang, session.lang_url_code, session)

            // Gilaneh
        if(isFaLang(session) && value.year > 1600){
            return value.setZone("default").reconfigure({ outputCalendar: "persian" }).setLocale("fa").toFormat(format);
        }
        return value.setZone("default").toFormat(format);

    },
    /**
    * Gilaneh
    * @override
    */
    parseDate(value, options = {}) {
        const parsed = Dates.parseDateTime(value, { ...options, format: options.format || localization.dateFormat });
        return parsed && parsed.startOf("day");
    },
    /**
    * Gilaneh
    * @override
    */
    parseDateTime(value, options = {}) {
        if (!value) {
            return false;
        }
        let result = super.parseDateTime(...arguments)
            // Gilaneh
//        console.log('parseDateTime G1', result ? result.toISODate() : "No result", session )
//        console.log('parseDateTime G1', result  )

        if(isFaLang(session) && result.year < 1600){
            const gDate = jalaali.toGregorian(result.year, result.month, result.day)
            result = DateTime.fromString(`${gDate.gy}-${gDate.gm}-${gDate.gd} ${result.hour}:${result.minute}`, 'yyyy-M-d H:m')
        }
//        console.log('parseDateTime G2', result ? result.toISODate() : "No result" )
        return result.setZone("default");
    },
/**
 * Get the week year and week number of a given date, in the user's locale settings.
 *
 * @param {Date | luxon.DateTime} date
 * @returns {{ year: number, week: number }}
 *  the year the week is part of, and
 *  the ISO week number (1-53) of the Monday nearest to the locale's first day of the week
 */
    getLocalYearAndWeek(date) {
//        console.log('getLocalYearAndWeek', )
        if (!date.isLuxonDateTime) {
            date = DateTime.fromJSDate(date);
        }
        const { weekStart } = localization;
        let res;
        if(isFaLang(session) && date.year > 1600){
            let jDate = jalaali.toJalaali(date.year, date.month, date.day)
            let number = jalaali.jalaaliWeekNumber(jDate.jy, jDate.jm, jDate.jd)
            // TODO: if 29th of esfand is a friday, it can be 53.
            number = number < 53 ? number : 1
            res = { year: jDate.jy, week: number };
        } else {
            // go to start of week
            date = date.minus({ days: (date.weekday + 7 - weekStart) % 7 });
            // go to nearest Monday, up to 3 days back- or forwards
            date =
                weekStart > 1 && weekStart < 5 // if firstDay after Mon & before Fri
                    ? date.minus({ days: (date.weekday + 6) % 7 }) // then go back 1-3 days
                    : date.plus({ days: (8 - date.weekday) % 7 }); // else go forwards 0-3 days
            date = date.plus({ days: 6 }); // go to last weekday of ISO week
            const jan4 = DateTime.local(date.year, 1, 4);
            // count from previous year if week falls before Jan 4
            const diffDays =
                date < jan4 ? date.diff(jan4.minus({ years: 1 }), "day").days : date.diff(jan4, "day").days;
            res = { year: date.year, week: Math.trunc(diffDays / 7) + 1 };
        }
        return res
    },
    /**
     * Get the week number of a given date, in the user's locale settings.
     *
     * @param {Date | luxon.DateTime} date
     * @returns {number}
     *  the ISO week number (1-53) of the Monday nearest to the locale's first day of the week
     */
    getLocalWeekNumber(date) {
        return Dates.getLocalYearAndWeek(date).week;
    },

})






