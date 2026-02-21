import datetime
from jdatetimext import jdatejs, jdatetimejs
from odoo.tools import pycompat
from odoo.exceptions import UserError
from odoo.tools.translate import _
from odoo.addons.web.controllers.export import ExportXlsxWriter
from odoo.http import content_disposition, request
from icecream import ic


def write_cell(self, row, column, cell_value):
    is_fa = request.env.context.get('lang', '') == 'fa_IR'
    self.header_style.set_bg_color('#d0d0d0')
    if is_fa:
        font_name = 'B Nazanin'
        font_charset = 178
        self.worksheet.right_to_left()
    else:
        font_name = 'Calibri'
        font_charset = 0

    self.header_style.set_font(font_name)
    self.header_style.set_font_family(0)
    self.header_style.set_font_charset(font_charset)
    self.date_style.set_font(font_name)
    self.date_style.set_font_family(0)
    self.date_style.set_font_charset(font_charset)
    self.datetime_style.set_font(font_name)
    self.datetime_style.set_font_family(0)
    self.datetime_style.set_font_charset(font_charset)
    self.base_style.set_font(font_name)
    self.base_style.set_font_family(0)
    self.base_style.set_font_charset(font_charset)
    self.float_style.set_font(font_name)
    self.float_style.set_font_family(0)
    self.float_style.set_font_charset(font_charset)
    self.monetary_style.set_font(font_name)
    self.monetary_style.set_font_family(0)
    self.monetary_style.set_font_charset(font_charset)
    self.header_bold_style.set_font(font_name)
    self.header_bold_style.set_font_family(0)
    self.header_bold_style.set_font_charset(font_charset)
    self.header_bold_style_float.set_font(font_name)
    self.header_bold_style_float.set_font_family(0)
    self.header_bold_style_float.set_font_charset(font_charset)
    self.header_bold_style_monetary.set_font(font_name)
    self.header_bold_style_monetary.set_font_family(0)
    self.header_bold_style_monetary.set_font_charset(font_charset)

    cell_style = self.base_style

    if isinstance(cell_value, bytes):
        try:
            # because xlsx uses raw export, we can get a bytes object
            # here. xlsxwriter does not support bytes values in Python 3 ->
            # assume this is base64 and decode to a string, if this
            # fails note that you can't export
            cell_value = cell_value.decode()
        except UnicodeDecodeError:
            raise UserError(request.env._(
                "Binary fields can not be exported to Excel unless their content is base64-encoded. That does not seem to be the case for %s.",
                self.field_names)[column]) from None
    elif isinstance(cell_value, (list, tuple, dict)):
        cell_value = str(cell_value)

    if isinstance(cell_value, str):
        if len(cell_value) > self.worksheet.xls_strmax:
            cell_value = request.env._(
                "The content of this cell is too long for an XLSX file (more than %s characters). Please use the CSV format for this export.",
                self.worksheet.xls_strmax)
        else:
            cell_value = cell_value.replace("\r", " ")
    elif isinstance(cell_value, datetime.datetime):
        cell_style = self.datetime_style
        cell_value = f"\u200F{jdatejs(cell_value, '%Y/%m/%d')}  {cell_value.strftime('%H:%M:%S')}" if is_fa else cell_value

    elif isinstance(cell_value, datetime.date):
        cell_style = self.date_style
        cell_value = f"\u200F{jdatejs(cell_value, '%Y/%m/%d')}" if is_fa else cell_value

    elif isinstance(cell_value, float):
        field = self.fields[column]
        cell_style = self.monetary_style if field['type'] == 'monetary' else self.float_style
    self.write(row, column, cell_value, cell_style)


ExportXlsxWriter.write_cell = write_cell
