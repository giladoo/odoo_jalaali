from odoo.addons.web.controllers.export import ExportXlsxWriter
from odoo.tools import date_utils, get_lang, Query, SQL, sql
from odoo.tools.misc import xlsxwriter
import io
from odoo.http import content_disposition, request
from odoo.exceptions import AccessError, MissingError, ValidationError, UserError
from odoo import models, api, _, http


_original_init = ExportXlsxWriter.__init__

def _custom_fa_init(self, field_names, row_count):
    FONT_NAME = "B Nazanin"
    FONT_CHARSET = 178
    FONT_FAMILY = 0
    FA_FORMATS = {'font_name': FONT_NAME, 'font_charset': FONT_CHARSET, 'font_family': FONT_FAMILY}
    self.field_names = field_names
    self.output = io.BytesIO()
    self.workbook = xlsxwriter.Workbook(self.output, {'in_memory': True})
    self.base_style = self.workbook.add_format(
        {'text_wrap': True, **FA_FORMATS})
    self.header_style = self.workbook.add_format({'bold': True, 'align': 'center', 'bg_color': '#e9ecef', **FA_FORMATS})
    self.header_bold_style = self.workbook.add_format(
        {'text_wrap': True, 'bold': True, 'bg_color': '#e9ecef', **FA_FORMATS})
    self.date_style = self.workbook.add_format({'text_wrap': True, 'num_format': 'yyyy-mm-dd', **FA_FORMATS})
    self.datetime_style = self.workbook.add_format(
        {'text_wrap': True, 'num_format': 'yyyy-mm-dd hh:mm:ss', **FA_FORMATS})
    self.worksheet = self.workbook.add_worksheet()
    self.worksheet.right_to_left()
    self.workbook.add_format()
    self.value = False
    self.float_format = '#,##0.00'
    decimal_places = [res['decimal_places'] for res in
                      request.env['res.currency'].search_read([], ['decimal_places'])]
    self.monetary_format = f'#,##0.{max(decimal_places or [2]) * "0"}'

    if row_count > self.worksheet.xls_rowmax:
        raise UserError(
            _('There are too many rows (%s rows, limit: %s) to export as Excel 2007-2013 (.xlsx) format. Consider splitting the export.') % (
            row_count, self.worksheet.xls_rowmax))


def _custom_init(self, field_names, row_count):
    # TODO:Arash;
    # locale = get_lang(self.env).code
    locale = http.request.env.user.lang
    if locale == 'fa_IR':
        return _custom_fa_init(self, field_names, row_count)
    else:
        return _original_init(self, field_names, row_count)

ExportXlsxWriter.__init__ = _custom_init