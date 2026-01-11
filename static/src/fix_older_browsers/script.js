/** @odoo-module **/

const chromeVersion = (() => {
    const match = navigator.userAgent.match(/Chrome\/(\d+)/);
    console.log('aaaa', parseInt(match[1], 10))
    return match ? parseInt(match[1], 10) : null;
})();

if (chromeVersion && chromeVersion < 110) {
    console.log('bbb', chromeVersion)
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".o_arrow_button").forEach(el => {
            console.log('cccc', el)
//            el.classList.remove("o_statusbar_border_active");
//            el.classList.add("o_statusbar_legacy");
        });
    });
}