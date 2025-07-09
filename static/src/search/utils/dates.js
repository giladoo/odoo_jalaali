
import * as SUDates  from "@web/search/utils/dates";
import { patch } from "@web/core/utils/patch";
import { Domain } from "@web/core/domain";
import { session } from "@web/session";
import { formatDate, formatDateTime, isFaLang } from "@web/core/l10n/dates";
const { DateTime } = luxon;

if (isFaLang(session)){
    // start.startOfJalaali(scale);

    SUDates.QUARTERS["1"].description = 'بهار'
    SUDates.QUARTERS["2"].description = 'تابستان'
    SUDates.QUARTERS["3"].description = 'پاییز'
    SUDates.QUARTERS["4"].description = 'زمستان'

//    patch(SUDates, {
//        constructDateDomain(
//            referenceMoment,
//            searchItem,
//            selectedOptionIds,
//            comparisonOptionId
//        )
//        {
//            console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
//            let plusParam;
//            let selectedOptions;
//            if (comparisonOptionId) {
//                [plusParam, selectedOptions] = SUDates.getComparisonParams(
//                    referenceMoment,
//                    searchItem,
//                    selectedOptionIds,
//                    comparisonOptionId
//                );
//            } else {
//                selectedOptions = SUDates.getSelectedOptions(referenceMoment, searchItem, selectedOptionIds);
//            }
//            if ("withDomain" in selectedOptions) {
//                return {
//                    description: selectedOptions.withDomain[0].description,
//                    domain: Domain.and([selectedOptions.withDomain[0].domain, searchItem.domain]),
//                };
//            }
//            const yearOptions = selectedOptions.year;
//            const otherOptions = [...(selectedOptions.quarter || []), ...(selectedOptions.month || [])];
//            SUDates.sortPeriodOptions(yearOptions);
//            SUDates.sortPeriodOptions(otherOptions);
//            const ranges = [];
//            const { fieldName, fieldType } = searchItem;
//            for (const yearOption of yearOptions) {
//                const constructRangeParams = {
//                    referenceMoment,
//                    fieldName,
//                    fieldType,
//                    plusParam,
//                };
//                if (otherOptions.length) {
//                    for (const option of otherOptions) {
//                        const setParam = Object.assign(
//                            {},
//                            yearOption.setParam,
//                            option ? option.setParam : {}
//                        );
//                        const { granularity } = option;
//                        const range = SUDates.constructDateRange(
//                            Object.assign({ granularity, setParam }, constructRangeParams)
//                        );
//                        ranges.push(range);
//                    }
//                } else {
//                    const { granularity, setParam } = yearOption;
//                    const range = SUDates.constructDateRange(
//                        Object.assign({ granularity, setParam }, constructRangeParams)
//                    );
//                    ranges.push(range);
//                }
//            }
//            let domain = Domain.combine(
//                ranges.map((range) => range.domain),
//                "OR"
//            );
//            domain = Domain.and([domain, searchItem.domain]);
//            const description = ranges.map((range) => range.description).join("/");
//            return { domain, description };
//        },
//        getPeriodOptions(referenceMoment, optionsParams) {
//        let periodOptionsRes = [
//            ...getMonthPeriodOptions(referenceMoment, optionsParams),
//            ...getQuarterPeriodOptions(optionsParams),
//            ...getYearPeriodOptions(referenceMoment, optionsParams),
//            ...getCustomPeriodOptions(optionsParams),
//        ];
////        console.log('periodOptionsRes\n', periodOptionsRes)
//        return periodOptionsRes
//    }
//
//    })

}