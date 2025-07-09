/** @odoo-module **/
//import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";
import { session } from "@web/session";
const { DateTime } = luxon;
import { farvardin } from "../farvardin/farvardin";
//console.log(farvardin.solarToGregorian(1399 , 1 , 25 , "string"))
//console.log('farvardin:\n', farvardin)
const isFaLang = (_session) => {
    let isFa = false
    if (_session.is_frontend){
     isFa = session.lang_url_code == 'fa' ? true : false
    }else{
        isFa = _session.bundle_params.lang && _session.bundle_params.lang == 'fa_IR' ? true : false
    }
    return isFa
}

if (isFaLang(session)){
    const originalToFormat = DateTime.prototype.toFormat;
    DateTime.prototype.toFormat = function (fmt, opts) {
        //  const isJalaali = this.outputCalendar === "persian" && fmt.includes("yyyy");
        //  const isJalaali = fmt == "yyyy";
        if (["yyyy", "y1"].includes(fmt)) {
            // TODO: 'y' format
            // Extract the localized year from toLocaleParts
            const parts = this.setLocale('fa').toLocaleParts();
            //    console.log('toFormat:\n', parts )
            const yearPart = parts.find(p => p.type === 'year' || p.type === 'relatedYear');

            if (yearPart?.value) {
                // Replace 'yyyy' with the Persian year (already in Eastern digits)
                //      const patchedFmt = fmt.replace(/yyyy/, `'${yearPart.value}'`);
                let patchedFmt;
                if (fmt == 'yyyy'){
                    patchedFmt = fmt.replace(/yyyy/, `'${yearPart.value}'`);
                } else if (fmt == 'y') {
                    // TODO: 'y' format
                    patchedFmt = fmt.replace(/yyyy/, `'${yearPart.value}'`);
                }

                // Use original formatter for the rest of the format string
                return originalToFormat.call(this, patchedFmt, opts);
            }
        } else {
        //    console.log('toFormat:', this.toString(),)

        }

        // Fall back to default behavior
        return originalToFormat.call(this, fmt, opts);
    };

    const originalHasSame = DateTime.prototype.hasSame;
    DateTime.prototype.hasSame = function (otherDateTime, unit, opts) {
//        console.log(otherDateTime, unit, opts)
        return originalHasSame.call(this, otherDateTime, unit, opts);

    }

    const originalStartOf = DateTime.prototype.startOf;
    DateTime.prototype.startOf = function (unit, { useLocaleWeeks = false } = {}) {
        // TODO: luxon:6892
      if (!this.isValid) return this;

      const o = {},
        normalizedUnit = luxon.Duration.normalizeUnit(unit);
      switch (normalizedUnit) {
        case "years":
          o.month = 1;
        // falls through
        case "quarters":
        case "months":
          o.day = 1;
        // falls through
        case "weeks":
        case "days":
          o.hour = 0;
        // falls through
        case "hours":
          o.minute = 0;
        // falls through
        case "minutes":
          o.second = 0;
        // falls through
        case "seconds":
          o.millisecond = 0;
          break;
        // no default, invalid units throw in normalizeUnit()
      }
      let jDate = farvardin.gregorianToSolar(this.year, this.month, this.day, 'object')
      jDate.month = o.month ? o.month : jDate.month
      jDate.day = o.day ? o.day : jDate.day
//      console.log('ooooo:\n', o, farvardin.solarToGregorian(farvardin.gregorianToSolar(this.year, this.month, this.day)))
//      console.log('>>>>>>:\n',unit, o,  this.toString(), jDate,)



        return originalStartOf.call(this, unit, { useLocaleWeeks = false } = {});

    }

}

DateTime.prototype.jalToGre = function (jy, jm, jd, h, m, s, ms) {
    // TODO: Timezone, h, m, s, ms must be involved in date creation
    const gre = farvardin.solarToGregorian(jy , jm , jd , "object")
    return DateTime.fromObject(gre);
};

DateTime.prototype.startOfJalaali = function (cal) {
    let res = this;
    if ( cal == 'day'){
        return this.startOf('day')
    } else if ( cal == 'week'){
        return this.startOf('week')
    } else if ( cal == 'month'){
        const { jy, jm, jd } = jalaali.toJalaali(this.year, this.month, this.day);
        const jalaliStart = jalaali.jalaaliToDateObject(jy, jm, 1);
        res = DateTime.fromObject({
                                  year: jalaliStart.getFullYear(),
                                  month: jalaliStart.getMonth() + 1,
                                  day: jalaliStart.getDate(),
                                })
    } else if ( cal == 'year'){
        const { jy, jm, jd } = jalaali.toJalaali(this.year, this.month, this.day);
        const jalaliStart = jalaali.jalaaliToDateObject(jy, 1, 1);
        res = DateTime.fromObject({
                                  year: jalaliStart.getFullYear(),
                                  month: jalaliStart.getMonth() + 1,
                                  day: jalaliStart.getDate(),
                                })
    }
  return res.startOf('day');
};

DateTime.prototype.endOfJalaali = function (cal) {
    let res = this;
    if ( cal == 'day'){
        return this.endOf('day')
    } else if ( cal == 'week'){
        return this.endOf('week')
    } else if ( cal == 'month'){
        const { jy, jm, jd } = jalaali.toJalaali(this.year, this.month, this.day);
        const jalaliStart = jalaali.jalaaliToDateObject(jy, jm, 1);
        res = DateTime.fromObject({
                                  year: jalaliStart.getFullYear(),
                                  month: jalaliStart.getMonth() + 2,
                                  day: jalaliStart.getDate(),
                                }).minus({ days: 1})
    } else if ( cal == 'year'){
        const { jy, jm, jd } = jalaali.toJalaali(this.year, this.month, this.day);
        const jalaliStart = jalaali.jalaaliToDateObject(jy + 1, 1, 1);
        res = DateTime.fromObject({
                                  year: jalaliStart.getFullYear(),
                                  month: jalaliStart.getMonth() + 1,
                                  day: jalaliStart.getDate(),
                                }).minus({ days: 1})
    }
  return res.endOf('day');
};

