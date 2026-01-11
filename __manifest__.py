
{
    'name': 'Odoo Jalaali',
    'version': '18.0.1.0.6',
    'countries': ['ir'],
    'category': 'Localization',
    'description': 'Jalaali datetime fields and datetime picker.',
    'author': 'Arash Homayounfar',
    'website': 'https://giladoo.com/odoo_jalaali',
    'depends': ['web', 'mail', 'hr'],
    'external_dependencies': {
        'python': ['jdatetimext', 'khayyam'],
    },
    'data': [],
    'demo': [],
    'installable': True,
    'application': False,
    'assets': {
        'web._assets_core': [
            ('after', 'web/static/lib/luxon/luxon.js', 'odoo_jalaali/static/lib/farvardin/farvardin.js'),
            ('after', 'web/static/lib/luxon/luxon.js', 'odoo_jalaali/static/lib/jalaali/jalaali-js.js'),
            ('after', 'web/static/src/core/**/*', 'odoo_jalaali/static/src/core/l10n/dates_fa.js'),
            ('after', 'web/static/lib/luxon/luxon.js', 'odoo_jalaali/static/lib/luxon/luxon_fa.js'),
            'odoo_jalaali/static/src/core/datetime/datetime_picker_fa.js',
            'odoo_jalaali/static/src/views/calendar/utils.js',
            'odoo_jalaali/static/src/search/utils/dates.js',
            'odoo_jalaali/static/src/views/calendar/calendar_model.js',
            'odoo_jalaali/static/src/views/calendar/calendar_common_renderer.js',
            'odoo_jalaali/static/src/views/calendar/calendar_year_renderer.js',
            'odoo_jalaali/static/src/views/calendar/calendar_controller.js',
            'odoo_jalaali/static/src/css/**/*',
        ],
        'web.assets_backend_lazy': [
            ('after', 'mail/static/src/views/web/activity/**', 'odoo_jalaali/static/src/mail/activity_cell.js'),
        ],
        'web.assets_backend': [
            'odoo_jalaali/static/src/views/remaining_days/remaining_days_field.js',
            'odoo_jalaali/static/src/fix_older_browsers/script.js',
            'odoo_jalaali/static/src/fix_older_browsers/style.scss',
            # 'odoo_jalaali/static/src/search/**/*',
            'odoo_jalaali/static/src/css/**/*',
            ],
        'web.report_assets_common': [
            'odoo_jalaali/static/src/css/**/*',
            ],
        'web.assets_frontend': [
            ('after', 'web/static/lib/luxon/luxon.js', 'odoo_jalaali/static/lib/jalaali/jalaali-js.js'),
            ('after', 'web/static/src/core/**/*', 'odoo_jalaali/static/src/core/l10n/dates_fa.js'),
            'odoo_jalaali/static/src/core/datetime/datetime_picker_fa.js',


            # 'odoo_jalaali/static/src/core/l10n/dates_fa.js',
            # the following "after" action should be before normal ones
            # should be after the "after action
            # 'odoo_jalaali/static/src/**/*',
        ],
        "web.fullcalendar_lib": [
            ('replace', '/web/static/lib/fullcalendar/core/index.global.js', 'odoo_jalaali/static/lib/fullcalendar/core/index.global.js'),
            ('replace', '/web/static/lib/fullcalendar/core/locales-all.global.js', 'odoo_jalaali/static/lib/fullcalendar/core/locales-all.global.js'),
            ('replace', '/web/static/lib/fullcalendar/interaction/index.global.js', 'odoo_jalaali/static/lib/fullcalendar/interaction/index.global.js'),
            ('replace', '/web/static/lib/fullcalendar/daygrid/index.global.js', 'odoo_jalaali/static/lib/fullcalendar/daygrid/index.global.js'),
            ('replace', '/web/static/lib/fullcalendar/luxon3/index.global.js', 'odoo_jalaali/static/lib/fullcalendar/luxon3/index.global.js'),
            ('replace', '/web/static/lib/fullcalendar/timegrid/index.global.js', 'odoo_jalaali/static/lib/fullcalendar/timegrid/index.global.js'),
            ('replace', '/web/static/lib/fullcalendar/list/index.global.js', 'odoo_jalaali/static/lib/fullcalendar/list/index.global.js'),
        ],
    },
    'license': 'LGPL-3',
}

