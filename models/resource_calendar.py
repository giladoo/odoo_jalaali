from odoo import models, api
import logging


class JalaaliResourceCalendar(models.Model):
    _inherit = "resource.calendar"

    def _get_unusual_days(self, start_dt, end_dt, company_id=False):
        logging.info(f"\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>[ODOO_JALAALI calendar]\n\n{start_dt} \n {end_dt} \n {company_id}")
        return super()._get_unusual_days(start_dt, end_dt, company_id)



class JalaaliHrEmployee(models.Model):
    _inherit = "hr.employee"

    def _get_unusual_days(self, start_dt, end_dt,):
        logging.info(f"\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>[ODOO_JALAALI employee]\n\n{start_dt} \n {end_dt} \n ")
        return super()._get_unusual_days(start_dt, end_dt, )