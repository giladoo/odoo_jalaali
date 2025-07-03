/** @odoo-module **/

const { DateTime } = luxon;

DateTime.prototype.plusMillis = function (millis) {
  return this.plus({ milliseconds: millis });
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
