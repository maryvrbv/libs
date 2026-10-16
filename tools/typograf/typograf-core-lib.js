"use strict";
const _nbsp = "\u00A0";
let _counterPunctuation = 0;
let _counterReplaceQuoteMarks = 0;
let _counterDeleteSpaces = 0;
let _counterRemoveEndDotInSingleString = 0;
let _counterAddNoBreakSpace = 0;
let _counterYO = 0;
let _counterDash = 0;
let _counterPhoneNumber = 0;
let _counterReplaceDotWithComma = 0;
let _counterRub = 0;
let _counterCurrency = 0;
let _counterLowerCase = 0;
let _counterOther = 0;
let _counterMissingFont = 0;
let _yoDict = new Map();
// Настройки по умолчанию
let settingsValuesLocal = {
    yo: true,
    quotemarks: true,
    phone: true,
    showresult: true,
    savestyles: true,
};
// Инициализация настроек плагина
async function initSettings() {
    try {
        // Получаем сохраненные настройки из клиентского хранилища Figma (если они есть) и обновляем локальные настройки, заменяя их значениями из сохраненных настроек. После этого сохраняем локальные настройки в клиентское хранилище Figma.
        let settingsValuesSaved = await figma.clientStorage.getAsync('settings');
        // Если сохранённые настройки есть
        if (settingsValuesSaved) {
            for (const key in settingsValuesLocal) {
                if (key in settingsValuesSaved && typeof settingsValuesSaved[key] === typeof settingsValuesLocal[key]) {
                    settingsValuesLocal[key] = settingsValuesSaved[key];
                }
            }
        }
        await figma.clientStorage.setAsync('settings', settingsValuesLocal);
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
;
// Словари
const dict = {
    // Месяц
    month: "январь|февраль|март|апрель|май|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь",
    // Месяц сокращённый
    monthShort: "янв|фев|мар|апр|ма[йя]|июн|июл|авг|сен|окт|ноя|дек",
    // День недели
    weekday: "понедельник|вторник|среда|четверг|пятница|суббота|воскресенье",
    // День недели сокращённый
    weekdayShort: "пн|вт|ср|чт|пт|сб|вс",
    // Неразрывный пробел ПЕРЕД
    nbspBefore: "б|бы|ж|же|ли|ль",
    // Неразрывный пробел ПОСЛЕ
    nbspAfter: "а|б|без|безо|будто|бы|в|во|ведь|вне|вот|всё|где|да|даже|для|до|если|есть|ещё|же|за|и|из|изо|из-за|из-под|или|иль|к|ко|как|ли|ли|либо|между|на|над|надо|не|ни|но|о|об|обо|около|оно|от|ото|перед|по|по-за|по-над|под|подо|после|при|про|ради|с|со|сквозь|так|также|там|тем|то|тогда|того|тоже|у|хоть|хотя|чего|через|что|чтобы|это|этот|этого|№|§|АО|ОАО|ЗАО|ООО|ПАО|стр\\.|гл\\.|рис\\.|илл\\.|ст\\.|п\\.|c\\.",
    // Неразрывный дефис ПЕРЕД
    nonBreakingHypheBefore: "по|в|во|кое",
    // Неразрывный дефис ПОСЛЕ
    nonBreakingHypheAfter: "то|либо|нибудь|де|ка|с|таки",
    lowerCase: "Вы|Вас|Вам|Вами|Ваш|Ваше|Вашего|Ваша|Вашей|Ваши|Ваших|Банк|Банки|Банка|Банков|Банку|Банкам|Банком|Банками|Банке|Банках|Приложение|Приложения|Приложений|Приложению|Приложениям|Приложением|Приложениями|Приложении|Приложениях|Приложении|Условие|Условия|Условий|Условию|Условиям|Условием|Условиями|Условии|Условиях|Сайт|Сайта|Сайту|Сайтом|Сайте|Сайты|Сайтов|Сайтам|Сайты|Сайтами|Сайтах",
    // Телефонные коды России
    phoneCodeRu: "800|342|343|347|351|383|391|495|496|498|499|812|831|843|846|861|863|900|901|902|903|904|905|906|908|909|910|911|912|913|914|915|916|917|918|919|920|921|922|923|924|925|926|927|928|929|930|931|932|933|934|936|937|938|939|941|950|951|952|953|954|955|956|958|960|961|962|963|964|965|966|967|968|969|970|971|977|978|980|981|982|983|984|985|986|987|988|989|991|992|993|994|995|996|997|999|3012|3022|3412|3424|3435|3439|3452|3456|3462|3463|3466|3467|3473|3494|3496|3499|3513|3519|3522|3532|3536|3537|3812|3822|3823|3842|3843|3846|3852|3854|3902|3919|3942|3952|3953|3955|4012|4112|4132|4152|4162|4212|4217|4232|4234|4242|4712|4722|4725|4732|4742|4752|4812|4822|4832|4842|4852|4855|4862|4872|4876|4912|4922|4932|4942|4962|4964|4966|4967|8112|8142|8152|8162|8172|8182|8184|8202|8212|8216|8313|8332|8336|8342|8352|8354|8362|8412|8422|8442|8443|8452|8453|8464|8482|8512|8552|8553|8555|8617|8622|8634|8636|8652|8662|8672|8712|8722|8732|8734|8772|8782|8793",
    // Ё слова
};
// Словарь для Ё-фикатора
function createYoDict() {
    // Разбиваем строку с Ё словами на массив строк, используя разделитель пробел
    // Перебирая каждый элемент этого массива, добавляя пару ключ-значение слово_БЕЗ_Ё : слово_С_Ё в словарь _yoDict
    // Перед добавлением проверяем, что слова нет в словаре и проверяем на тип данных
    dict.yo.split(" ").forEach((word) => {
        if (typeof word === 'string' && !_yoDict.has(word.replace(/ё/g, "е"))) {
            _yoDict.set(word.replace(/ё/g, "е"), word);
        }
    });
}
// Применение Типографа
function applyTypograph(stringToParse) {
    function punctuation() {
        // Заменяем ...? ⟶ ?‥ и ...! ⟶ !‥ и ?... ⟶ ?‥ и !... ⟶ !‥
        stringToParse = stringToParse.replace(/(\.{2,}|…)?(\!|\?)(\.{2,}|…)?/gm, function (match, p1, p2, p3) {
            if (p1 !== undefined || p3 !== undefined) {
                _counterPunctuation++;
                return p2 + "\u2025";
            }
            return match;
        });
        // Заменяем ... на знак многоточия … U+2026
        stringToParse = stringToParse.replace(/\.{3,}/gm, function () {
            _counterPunctuation++;
            return "\u2026";
        });
        // Заменяем несколько знаков ? ! . , ; : - на один
        stringToParse = stringToParse.replace(/(\?{2,}|\!{2,}|\.{2,}|\,{2,}|\;{2,}|\:{2,}|\-{2,})/gm, function (match) {
            _counterPunctuation++;
            return match[0];
        });
        // Заменяем !? ⟶ ?!
        stringToParse = stringToParse.replace(/(\!\?)/gm, function () {
            _counterPunctuation++;
            return "?!";
        });
        // Переносим точку внутри кавычки наружу "Конец." ⟶ "Конец".
        // Игнорируем " др." " т.п." " т.д" и похожие
        stringToParse = stringToParse.replace(/(\s[А-ЯЁа-яёA-Za-z]\.?\s?)?([А-ЯЁа-яёA-Za-z])(\.)([\"\»\“\”\’])(?:\.)?/gm, function (match, p1, p2, p3, p4) {
            if (p1 === undefined) {
                _counterPunctuation++;
                return p2 + p4 + p3;
            }
            return match;
        });
        // Заменяем * или х X между цифрами на знак умножения × U00D7 и ставим между ними узкие u202F неразрывные пробелы
        stringToParse = stringToParse.replace(/(?:\d\s?)(\*|х|x|X|Х)(?:\s?\d)/gm, function () {
            _counterPunctuation++;
            return "\u202F\u00D7\u202F";
        });
    }
    function deleteSpaces() {
        // Удаляем пробелы ПОСЛЕ « ( [ Удаляем пробелы ПЕРЕД . … : , ; ? ! » ) ]
        stringToParse = stringToParse.replace(/(?<=[\«\(\[])\s+|\s+(?=[\.\…\:\,\;\?\!\»\)\]])/gm, function () {
            _counterDeleteSpaces++;
            return "";
        });
        // Удаляем пробелы между числом и %
        stringToParse = stringToParse.replace(/(?<=\d)\s+(?=\%)/gm, function () {
            _counterDeleteSpaces++;
            return "";
        });
        // Удаляем пробелы между т. д., т. п., т. е., т. к., т. ч., т. н.
        stringToParse = stringToParse.replace(/(?<=\sт\.)\s+(?=[дпекчн]\.)/gm, function () {
            _counterDeleteSpaces++;
            return "";
        });
        // Если в текстовом узле только пробельные символы, ничего не меняем
        if (stringToParse.search(/[^\s]/gm) != -1) {
            // Удаляем пробелы в начале строки. Если после пробелов есть маркеры или тире, считаем это списком и не трогаем
            stringToParse = stringToParse.replace(/(^)(?:[\u0020\u00A0]+?)(?=[^\u0020\u00A0\—\–\-\‒\⁃\•\‧\‣])/gm, function (match, p1) {
                _counterDeleteSpaces++;
                return p1;
            });
            // Удаляем пробелы в конце строки
            stringToParse = stringToParse.replace(/(?:[\u0020\u00A0])+($)/gm, function (match, p1) {
                _counterDeleteSpaces++;
                return p1;
            });
            // Удаляем двойные пробелы. Исключая пробелы в начале строки за которыми идут маркеры списка
            stringToParse = stringToParse.replace(/(?:([\u0020\u00A0]){2,})(?=[^\u0020\u00A0\—\–\-\‒\⁃\•\‧\‣])/gm, function (match, p1) {
                _counterDeleteSpaces++;
                return p1;
            });
        }
    }
    function replaceQuoteMarks() {
        // Кавычки " « » „ “ ‘ ” ’
        const quoteMarks = "[\\u0022\\u00AB\\u00BB\\u201E\\u201C\\u2018\\u201D\\u2019]";
        const quoteMarksRegExpShort = new RegExp(quoteMarks, "g");
        const quoteMarksRegExp = new RegExp("(" + quoteMarks + "{2,}|(?!\\w)" + quoteMarks + ")|([^\\s]" + quoteMarks + "+(?!\\w))", "gm");
        // Заменяем все ковычки на „ “
        let stringToParseNew = stringToParse.replace(quoteMarksRegExp, function (match, p1, p2) {
            if (p1 !== undefined) {
                return p1.replace(quoteMarksRegExpShort, "„");
            }
            else {
                return p2.replace(quoteMarksRegExpShort, "“");
            }
        });
        // Внешние кавычки меняем на « »
        stringToParseNew = stringToParseNew.replace(/\„((?:[^„“]*„[^„“]+“[^„“]*)+?|[^„“]*?)\“/gm, function (match, p1) {
            return "«" + p1 + "»";
        });
        // Если строки отличаются, сраниваем каждый символ. Если символы не совпадают, увеличивается счетчик различий.
        if (stringToParse !== stringToParseNew) {
            for (let i = 0; i < Math.max(stringToParse.length, stringToParseNew.length); i++) {
                if (stringToParse[i] !== stringToParseNew[i])
                    _counterReplaceQuoteMarks++;
            }
            stringToParse = stringToParseNew;
        }
    }
    function addNoBreakSpace() {
        let regexp;
        let regexpBefore;
        let regexpAfter;
        // Неразрывный пробел между инициалами и фамилией
        // Инициалы слитно, неразрывный пробел, фамилия или Фамилия, неразрывный пробел, инициалы слитно
        regexp = new RegExp('(^|[\\s\\«\\„\\"\\(\\[])([А-ЯЁ][а-яё]+)?\\s?([А-ЯЁ]\\.)\\s?([А-ЯЁ]\\.)?\\s?([А-ЯЁ][а-яё]+)?([\\s\\.\\,\\;\\:\\?\\!\\"\\»\\“\\‘\\)\\]]|$)', "gm");
        stringToParse = stringToParse.replace(regexp, function (match, p1, p2, p3, p4, p5, p6) {
            _counterAddNoBreakSpace++;
            return p1 + (p2 ? p2 + _nbsp : "") + p3 + (p4 ? p4 : "") + (p5 ? _nbsp + p5 : "") + p6;
        });
        // Неразрывные пробелы между словом и и т.д. и т.п. и др.
        stringToParse = stringToParse.replace(/(.)\u0020+(и)\u0020+(т\.д\.|т\.п\.|др\.)/g, function (match, p1, p2, p3) {
            _counterAddNoBreakSpace++;
            return p1 + _nbsp + p2 + _nbsp + p3;
        });
        // Неразрывный пробел ПЕРЕД б, бы, ж, же, ли, ль
        regexpBefore = new RegExp("\\u0020(" + dict.nbspBefore + ")([^А-ЯЁа-яё])", "gim");
        stringToParse = stringToParse.replace(regexpBefore, function (match, p1, p2) {
            _counterAddNoBreakSpace++;
            return _nbsp + p1 + p2;
        });
        // Неразрывный пробел ПОСЛЕ
        regexpAfter = new RegExp('(^|[\\u0020\\u00A0\\«\\„\\"\\(\\[])(' + dict.nbspAfter + ")\\u0020", "gim");
        stringToParse = stringToParse.replace(regexpAfter, function (match, p1, p2) {
            _counterAddNoBreakSpace++;
            return p1 + p2 + _nbsp;
        });
        // Неразрывный пробел ПОСЛЕ №, если пробела нет №123
        stringToParse = stringToParse.replace(/№([^\s])/gm, function (match, p1) {
            _counterAddNoBreakSpace++;
            return "№" + _nbsp + p1;
        });
        // Неразрывный пробел между числом и следующим словом
        stringToParse = stringToParse.replace(/(\d)\u0020+([a-zA-zа-яёА-ЯЁ])/gi, function (match, p1, p2) {
            _counterAddNoBreakSpace++;
            return p1 + _nbsp + p2;
        });
        // Неразрывный пробел ПОСЛЕ сокращенй город, область, край, станция, поселок, село, деревня, улица, переулок, проезд, проспект, бульвар, площадь, набережная, шоссе, тупик, офис, комната, участок, владение, строение, корпус, дом, квартира, микрорайон или ПОСЛЕ дом или литер
        stringToParse = stringToParse.replace(/(^|[\u0020\u00A0])((?:(?:г|обл|кр|ст|пос|с|д|ул|пер|пр|пр-т|просп|пл|бул|б-р|наб|ш|туп|оф|кв|комн?|под|мкр|уч|вл|влад|стр|корп?|эт|пгт)\.)|(?:дом|литера?))\u0020?(\-?[А-ЯЁ\d])/gm, function (match, p1, p2, p3) {
            _counterAddNoBreakSpace++;
            return p1 + p2 + "." + _nbsp + p3;
        });
        // Неразрывный пробел ПОСЛЕ короткого слова
        stringToParse = stringToParse.replace(/(^|[\u0020\u00A0\«\„\"\(\[])([А-ЯЁа-яё]{1,3})\u0020/gim, function (match, p1, p2) {
            _counterAddNoBreakSpace++;
            return p1 + p2 + _nbsp;
        });
        // Неразрывный пробел ПЕРЕД последним коротким словом в предложении или одиночной строке
        stringToParse = stringToParse.replace(/\u0020([А-ЯЁа-яё]{1,3}[\"\»]?[\)\]]?[\.\!\?\…]\‥?)/gim, function (match, p1) {
            _counterAddNoBreakSpace++;
            return _nbsp + p1;
        });
    }
    function YO() {
        // Ищем в тексте слова
        stringToParse = stringToParse.replace(/(\d\s?)?([А-ЯЁа-яё]+)/gim, function (match, p1, p2) {
            // Найденное слово
            let wordOriginal = p2;
            // Переводим найденное слово в нижний регистр
            let wordLower = wordOriginal.toLowerCase();
            let wordModified = "";
            // Если в Ё-словаре yoDict есть такое слово
            if (_yoDict.has(wordLower)) {
                let yoDictWord = _yoDict.get(wordLower);
                // Проверяем каждую букву оригинального слова
                for (let i = 0; i < wordOriginal.length; i++) {
                    // Приводим регистр каждой буквы словарного слова к регистру буквы из оригинального
                    if (wordOriginal[i] === wordOriginal[i].toUpperCase()) {
                        // Большая буква
                        wordModified = wordModified + yoDictWord[i].toUpperCase();
                    }
                    else {
                        wordModified = wordModified + yoDictWord[i];
                    }
                }
                // Если в начале идёт ЦИФРА, а за ней слово СЕК, считаем, что это сокращение секунд и ничего не меняем
                if (p1 !== undefined && p2 == "сек")
                    return match;
                p2 = wordModified;
                _counterYO++;
            }
            if (p1 === undefined)
                p1 = "";
            return p1 + p2;
        });
    }
    function phoneNumber() {
        // Пробел или неразрывный пробел или любое тире
        let spaceDashTmpl = '[\\u0020\\u00A0\\u002D\\u2012\\u2013\\u2014]';
        let changedPhoneNumber = '';
        // Короткое тире в тел. номере
        let phoneDash = '\u002D';
        // Федеральный номер 8 800
        // Формат номера 8 800 555-55-50
        // В номерах телефонов +7 111 111-11-11 используем дефис без пробелов
        // +7 вместо 8
        // Если трёхзначный код города, формат номера +7 111 111-11-11
        // Если четырёхзначный код города, формат номера +7 1111 11-11-11
        // Ищем: 
        //    ( начало строки или [ один из символов: пробел, неразрывный пробел, разные кавычки, левая квадратная скобка, левая круглая скобка ] ) p1
        //    (
        //      (возможно ( или ( [ один из символов: пробел, тире ]) p3
        //      (?:возможно + или + [ один из символов: пробел, тире ])
        //      возможно (
        //      [ возможно один из символов: пробел, тире ]
        //      ( цифру 7 или 8) p4
        //      [ возможно один из символов: пробел, тире ]
        //      возможно )
        //      [ возможно один из символов: пробел, тире ]
        //      возможно (
        //      [ возможно один из символов: пробел, тире ]
        //      ( код города ) p5
        //      [ возможно один из символов: пробел, тире ]
        //      возможно )
        //      [ возможно один из символов: пробел, тире ]
        //      ( любая цифра ) p6
        //      [ возможно один из символов: пробел, тире ]
        //      ( любая цифра ) p7
        //      [ возможно один из символов: пробел, тире ]
        //      ( любая цифра ) p8
        //      [ возможно один из символов: пробел, тире ]
        //      ( любая цифра ) p9
        //      [ возможно один из символов: пробел, тире ]
        //      ( любая цифра ) p10
        //      [ возможно один из символов: пробел, тире ]
        //      ( любая цифра ) p11
        //      [ возможно один из символов: пробел, тире ]
        //      ( возможно любая цифра ) p12
        //    ) p2
        //    ( [ один из символов: пробел, неразрывный пробел, разные кавычки, знаки пунктуации, правая квадратная скобка, правая круглая скобка ] или конец строки ) p13
        let regexpPhone = new RegExp('(^|[\\u0020\\u00A0\\"\\«\\“\\‘\\„\\[\\(])((\\(|\\(' + spaceDashTmpl + ')?(?:\\+|\\+' + spaceDashTmpl + ')?\\(?' + spaceDashTmpl + '?(7|8)' + spaceDashTmpl + '?\\)?' + spaceDashTmpl + '?\\(?' + spaceDashTmpl + '?(' + dict.phoneCodeRu + ')' + spaceDashTmpl + '?\\)?' + spaceDashTmpl + '?(\\d)' + spaceDashTmpl + '?(\\d)' + spaceDashTmpl + '?(\\d)' + spaceDashTmpl + '?(\\d)' + spaceDashTmpl + '?(\\d)' + spaceDashTmpl + '?(\\d)' + spaceDashTmpl + '?(\\d)?)([\\u0020\\u00A0\\.\\…\\,\\;\\:\\?\\!\\"\\»\\“\\”\\‘\\]\\)]|$)', 'gm');
        stringToParse = stringToParse.replace(regexpPhone, function (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13) {
            // Если в настройках ВКЛЮЧЕНО Изменять телефон
            if (settingsValuesLocal["phone"]) {
                function checkBrackets(str) {
                    //  Эта функция принимает строку в качестве аргумента и возвращает true, если в строке одинаковое количество открывающих и закрывающих скобок, и false в противном случае
                    let count = 0;
                    for (let i = 0; i < str.length; i++) {
                        if (str[i] === '(') {
                            count++;
                        }
                        else if (str[i] === ')') {
                            count--;
                        }
                        if (count < 0) {
                            return false;
                        }
                    }
                    return count === 0;
                }
                if (!checkBrackets(p2)) {
                    // Разное количество открытых и закрытых скобок. Значит первая открытая скобка p3 не относится к телефону. Её менять не будем и присоединим к p1
                    p1 = p1 + p3;
                }
                p4 = (p5 === '800') ? '8' : '+7';
                if (p5.length == 3) {
                    // 3-х значный код города
                    changedPhoneNumber = p4 + _nbsp + p5 + _nbsp + p6 + p7 + p8 + phoneDash + p9 + p10 + phoneDash + p11 + p12;
                }
                else if (p5.length == 4) {
                    // 4-х значный код города
                    changedPhoneNumber = p4 + _nbsp + p5 + _nbsp + p6 + p7 + phoneDash + p8 + p9 + phoneDash + p10 + p11;
                }
                if (match != p1 + changedPhoneNumber + p13)
                    _counterPhoneNumber++;
            }
            else {
                // Если в настройках ВЫКЛЮЧЕНО Изменять телефон, найденный номер не меняем        
                changedPhoneNumber = p2;
            }
            // Вокруг найденного телефона добавляем спецтэг <Unchangeable> чтобы обработчик тире не изменял телефон. Потом его уберём
            return p1 + '<Unchangeable>' + changedPhoneNumber + '</Unchangeable>' + p13;
        });
        // Если в настройках ВКЛЮЧЕНО Изменять телефон
        if (settingsValuesLocal["phone"]) {
            // Короткий номер — только 900: без плюсов и других знаков
            stringToParse = stringToParse.replace(/(^|\D)(?:\+900|\#900|\@900)(\D|$)/gm, function (match, p1, p2) {
                _counterPhoneNumber++;
                return p1 + '900' + p2;
            });
        }
    }
    function dash() {
        // Там, где по смыслу необходимо тире, используем длинное «—» и отбиваем его пробелами с двух сторон.
        // Для диапазонов чисел используем короткое (среднее) тире «–» без пробелов: 2002–2009.
        // Дефис «-» применяем для присоединения частиц (что-то), присоединения префиксов (по-человечески),
        // в сложносоставных словах (интернет-банк) и в номерах телефонов +7 (333) 333-22-22.
        // Все виды тире
        const dashAll = '[\\u002D\\u2012\\u2013\\u2014]';
        let regexp;
        // Если в строке только символы тире, ничего не меняем и выходим из функции
        if (stringToParse.search(/[^\u002D\u2012\u2013\u2014]/gm) == -1) {
            return;
        }
        // В начале строки или предложения, длинное тире + неразрывный пробел
        // Сначала меняем тире
        // Затем ставим неразрывный пробел, если надо
        regexp = new RegExp('(^|[\\.\\…\\!\\?][\\u0020\\u00A0])(' + dashAll + ')(.)?', 'gm');
        stringToParse = stringToParse.replace(regexp, function (match, p1, p2, p3) {
            if (p2 != '\u2014') {
                // Длинное тире  em dash
                p2 = '\u2014';
                _counterDash++;
            }
            if (p3 == '\u0020') {
                // Если это пробел, меняем на неразрывный
                p3 = _nbsp;
                _counterAddNoBreakSpace++;
            }
            if (p3 != _nbsp) {
                // Если это не неразрывный пробел, добавляем перед ним неразрывный пробел
                p3 = _nbsp + p3;
                _counterAddNoBreakSpace++;
            }
            return p1 + p2 + p3;
        });
        // Для диапазонов месяцев и дней недели используем короткое (среднее) тире «–» без пробелов: январь–март, понедельник-суббота
        function monthWeekday(params) {
            regexp = new RegExp('((?:' + params + ')\\.?)([\\u0020\\u00A0])?(' + dashAll + ')([\\u0020\\u00A0])?((?:' + params + ')\\.?)', 'gmi');
            stringToParse = stringToParse.replace(regexp, function (match, p1, p2, p3, p4, p5) {
                if (p3 != '\u2013') {
                    p3 = '\u2013';
                    _counterDash++;
                }
                if (p2 !== undefined)
                    _counterDeleteSpaces++;
                if (p4 !== undefined)
                    _counterDeleteSpaces++;
                return '<Unchangeable>' + p1 + p3 + p5 + '</Unchangeable>';
            });
        }
        // Месяц
        monthWeekday(dict.month);
        // Месяц сокращённо
        monthWeekday(dict.monthShort);
        // День недели
        monthWeekday(dict.weekday);
        // День недели сокращённо
        monthWeekday(dict.weekdayShort);
        // Внутри текста используем неразрывный пробел + длинное тире
        // Что обрабатываем: буква - буква, буква - цифра, цифра - буква
        // Для диапазонов чисел используем короткое (среднее) тире «–» без пробелов: 2002–2009, XI–XII
        // Что обрабатываем: цифра, латинская цифра – цифра, латинская цифра
        // Ищем: 
        //    ( <Unchangeable>.*</Unchangeable> ) p1
        //    или 
        //    (?: 
        //      (( [ цифру, латинскую цифру ] ) p3 или ( [ букву ] ) p4 ) p2
        //      ( [ возможный пробел ] )? p5
        //      ( дефис ) p6
        //      ( [ возможный пробел ] )? p7
        //      (( [ цифру, латинскую цифру ] ) p9 или ( [ букву ] ) p10 ) p8
        //    )
        // Группа ( <Unchangeable>.*</Unchangeable> ) p1 нужна чтобы не изменять номер телефона
        regexp = new RegExp('(<Unchangeable>.*<\/Unchangeable>)|(?:(([\\dIVXLCDMZ])|([А-ЯЁа-яёA-Za-z]))([\\u0020\\u00A0])?(' + dashAll + ')([\\u0020\\u00A0])?(([\\dIVXLCDMZ])|([А-ЯЁа-яёA-Za-z])))', 'gm');
        stringToParse = stringToParse.replace(regexp, function (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
            // Если найдено <Unchangeable>.*</Unchangeable> ничего не меняем
            if (p1 !== undefined)
                return match;
            // Если слева И справа от дефиса цифры
            if (p3 !== undefined && p9 !== undefined) {
                // – Среднее (En) тире U+2013 без пробелов
                if (p6 != "\u2013") {
                    p6 = "\u2013";
                    _counterDash++;
                }
                if (p5 !== undefined)
                    _counterDeleteSpaces++;
                if (p7 !== undefined)
                    _counterDeleteSpaces++;
                return p3 + p6 + p9;
            }
            // Если слева ИЛИ справа от дефиса буква
            if (p4 !== undefined || p10 !== undefined) {
                // Если вокруг дефиса нет пробелов, используем Дефис-минус
                if (p5 === undefined && p7 === undefined) {
                    if (p6 != "\u002D") {
                        // - Дефис-минус U+002D
                        p6 = "\u002D";
                        _counterDash++;
                    }
                    return p2 + p6 + p8;
                }
                // Если вокруг дефиса хотя бы один пробел
                if (p5 !== undefined || p7 !== undefined) {
                    if (p6 != "\u2014") {
                        // — Длинное (Em) тире U+2014
                        p6 = "\u2014";
                        _counterDash++;
                    }
                    // Перед тире должен быть неразрывный пробел
                    if (p5 != _nbsp) {
                        p5 = _nbsp;
                        _counterAddNoBreakSpace++;
                    }
                    // После тире должен быть обычный пробел
                    p7 = "\u0020";
                    return p2 + p5 + p6 + p7 + p8;
                }
            }
        });
        function nonBreakingHyphe(regexp) {
            stringToParse = stringToParse.replace(regexp, function () {
                _counterDash++;
                // Неразрывный дефис ‑ \u2011
                return '\u2011';
            });
        }
        // Неразрывный дефис ПОСЛЕ приставок по- в- во- кое-
        // Ищем: ([не букву]) (подстрока)) (варианты тире) ([любая буква])
        regexp = new RegExp('(?<=(?:[^А-ЯЁа-яё])?(?:' + dict.nonBreakingHypheBefore + '))(' + dashAll + ')(?=[А-ЯЁа-яё])', 'gmi');
        nonBreakingHyphe(regexp);
        // Неразрывный дефис ПЕРЕД суфиксами -то -либо -нибудь и частицами -де -ка -с -таки
        // Ищем: ([любая буква]) (варианты тире) (подстрока) ([не букву])
        regexp = new RegExp('(?<=[А-ЯЁа-яё])(' + dashAll + ')(?=(?:' + dict.nonBreakingHypheAfter + ')(?:$|[^А-ЯЁа-яё]))', 'gmi');
        nonBreakingHyphe(regexp);
    }
    function lowerCase() {
        // Слова «вы», «банк», «приложение», «условия», «сайт» — со строчной (маленькой) буквы если не первое слово в предложении
        // Ищем первое слово из шаблона в предложении
        // ( ( Начало строки или ( Начало строки ( [ возможно несколько пробелов ] ) [ кавычки, тире, буллеты ] [ возможно пробел ] ) или ( [ .…!? ] [ пробел ] [ возможно кавычки, тире] [ возможно пробел ] ) ) ( Подстрока p1 ) ( [ Не букву ] ) )
        // или
        // Остальные вхождения слов из шаблона
        // ( ( [ пробел, кавычки, скобки ] ) ( Подстрока p2 ) ( [ Не букву ] ) )
        let regexp = new RegExp('(?:(?<=^|(?<=^(?:[\\u0020\\u00A0]+?)?[\\«\\„\\"\\“\\u002D\\u2012\\u2013\\u2014\\⁃\\•\\‧\\‣][\\u0020\\u00A0]?)|(?:[\\.\\…\\!\\?][\\u0020\\u00A0][\\«\\„\\"\\“\\u002D\\u2012\\u2013\\u2014]?[\\u0020\\u00A0]?))(' +
            dict.lowerCase +
            ')(?=[^А-ЯЁа-яё]))|(?:(?<=[\\s\\«\\„\\"\\“\\(\\[])(' +
            dict.lowerCase +
            ')(?=[^А-ЯЁа-яё]|$))', 'gm');
        stringToParse = stringToParse.replace(regexp, function (match, p1, p2) {
            // Если нашли шаблонное слово в начале предложения ничего с ним не делаем
            if (p1 !== undefined)
                return match;
            // Остальные вхождения переводим в нижний регистр
            _counterLowerCase++;
            return p2.toLowerCase();
        });
    }
    function currency() {
        // Правило гласит, что, если сокращение образовано отсечением части слова, точка ставится (тыс., г., стр.).
        // Если же сокращение состоит из согласных, а гласные при этом опущены, причем последняя согласная
        // является последней буквой полного слова, точка не ставится (млн, млрд, трлн).
        // После тыс должна быть точка
        stringToParse = stringToParse.replace(/(тыс)(?=[^А-ЯЁа-яё\.]|$)/gim, function (match) {
            return match + ".";
        });
        // Переводим USD в $, EUR в €, Р р. руб. RUR RUB в ₽
        stringToParse = stringToParse.replace(/(?<=\d|тыс\.|млн|млрд|трлн)\.?(\u0020|\u00A0)?(USD|EUR|р|руб|RUR|RUB)(?=[^А-ЯЁа-яёA-Za-z]|$)/gim, function (match, p1, p2) {
            if (p1 !== _nbsp) {
                p1 = _nbsp;
                _counterAddNoBreakSpace++;
            }
            switch (p2.toUpperCase()) {
                case "USD":
                    p2 = "$";
                    _counterCurrency++;
                    break;
                case "EUR":
                    p2 = "€";
                    _counterCurrency++;
                    break;
                default:
                    p2 = "₽";
                    _counterRub++;
                    break;
            }
            return p1 + p2;
        });
        // После млн млрд трлн $ € ₽ точки быть не должно, только если это не конец строки или предложения
        // Ищем шаблон с точкой и если находим его последним словом в предложении, ничего не делаем. В остальных случаях убираем точку
        // ( шаблон p1 ) точка (конец строки или перевод каретки или ( [ пробел ] [ кавычки, тире ] [ возможный пробел ] [ буква в ВЕРХНЕМ регистре ] ) p2 )
        stringToParse = stringToParse.replace(/(млн|млрд|трлн|\$|\€|\₽)\.($|\n|(?:[\u0020\u00A0][\«\„\"\“\u002D\u2012\u2013\u2014]?[\u0020\u00A0]?[А-ЯЁ]))?/gm, function (match, p1, p2) {
            // Если это конец строки или предложения, ничего не меняем
            if (p2 !== undefined)
                return match;
            // Иначе возвращаем шаблон без точки
            return p1;
        });
        // Убираем копейки в основную сумму и отделяем запятой. Убираем последний 0 из копеек
        stringToParse = stringToParse.replace(/(\d)(\u00A0₽)[\u0020\u00A0]?(\d{1,2})[\u0020\u00A0]?(?:к|коп)\.?(?=[^А-ЯЁа-яё]|$)/gm, function (match, p1, p2, p3) {
            if (p3.length == 1)
                p3 = "0" + p3;
            if (p3[1] == "0")
                p3 = p3[0];
            return p1 + "," + p3 + p2;
        });
        // Переносим знак валюты после цифр и отделяем неразрывным пробелом
        // $123 ⟶ 123 $   ₽ 50 тыс. ⟶ 50 тыс. ₽
        stringToParse = stringToParse.replace(/(?<=^|[\D]{2})(₽|\$|€|£|¥)[\u0020\u00A0]?(\d+(?:[\u0020\u00A0]\d{3})*(?:[.,]\d+)?[\u0020\u00A0]?(?:тыс\.|млн|млрд|трлн)?)/gm, function (match, p1, p2) {
            _counterCurrency++;
            _counterAddNoBreakSpace++;
            return p2 + _nbsp + p1;
        });
        // Неразрывный пробел между числом, тыс. млн млрд трлн и валютой
        stringToParse = stringToParse.replace(/(\d)([\u0020\u00A0])?(тыс\.|млн|млрд|трлн)?([\u0020\u00A0])?(₽|\$|€|£|¥)?/gm, function (match, p1, p2, p3, p4, p5) {
            if (p3 === undefined && p5 === undefined)
                return match;
            if (p2 !== _nbsp) {
                p2 = _nbsp;
                _counterAddNoBreakSpace++;
            }
            if (p3 !== undefined && p5 !== undefined) {
                if (p4 !== _nbsp) {
                    p4 = _nbsp;
                    _counterAddNoBreakSpace++;
                }
            }
            if (p4 === undefined)
                p4 = "";
            if (p3 === undefined)
                p3 = "";
            if (p5 === undefined)
                p5 = "";
            return p1 + p2 + p3 + p4 + p5;
        });
    }
    function numbers() {
        // Если за числом идёт знак %, валюты или млн, трлн и т.д. разбиваем по разрядам только четырёх и более значную целую часть. Дробную часть не разбиваем. Заменяем точку на запятую
        // p1 — целая часть
        // p2 – разделитель и дробная часть, если есть
        //  p3 — разделитель
        //  p4 — дробная часть
        stringToParse = stringToParse.replace(/(\d{4,})(([.,])(\d+))?(?=(?:(?:\u0020|\u00A0)?(?:\%|₽|\$|€|£|¥|тыс\.|млн|млрд|трлн)))/g, function (match, p1, p2, p3, p4) {
            p1 = p1.replace(/(\d)(?=(\d{3})+([\D]|$))/g, function (match, a1) {
                _counterAddNoBreakSpace++;
                return a1 + _nbsp;
            });
            if (p2 !== undefined) {
                if (p3 == ".") {
                    p3 = ",";
                    _counterReplaceDotWithComma++;
                }
            }
            else {
                p3 = p4 = "";
            }
            return p1 + p3 + p4;
        });
        // Если число формата XX,XX,XXXX или XX,XX,ХХ меняем запятую на точку
        stringToParse = stringToParse.replace(/(?<=^|\D)\d{2}\,\d{2}\,\d{2,4}(?=$|\D)/gm, function (match) {
            _counterReplaceDotWithComma++;
            return match.replace(/,/g, ".");
        });
    }
    function misc() {
        // СберБанк слитно, СберБанк, ПАО Сбербанк
        stringToParse = stringToParse.replace(/(ПАО([\u0020\u00A0]))?(Сбер([\u0020\u00A0])?банк)/gmi, function (match, p1, p2, p3, p4) {
            // Есть пробел между Сбер Банк, удалим его 
            if (p4 !== undefined)
                _counterDeleteSpaces++;
            if (p1 !== undefined) {
                // Есть ПАО
                // После ПАО должен быть неразрывный пробел
                if (p2 !== _nbsp) {
                    p1 = 'ПАО' + _nbsp;
                    _counterAddNoBreakSpace++;
                }
                if (p3 != 'Сбербанк') {
                    p3 = 'Сбербанк';
                    _counterOther++;
                }
            }
            else {
                // ПАО нет
                p1 = '';
                if (p3 != 'СберБанк') {
                    p3 = 'СберБанк';
                    _counterOther++;
                }
            }
            return p1 + p3;
        });
        function changeMisc(looking, change) {
            let regexp = new RegExp(looking, 'gmi');
            stringToParse = stringToParse.replace(regexp, function (match) {
                if (match != change)
                    _counterOther++;
                return change;
            });
        }
        changeMisc("DomClick|ДомКлик|Дом[\u0020\u00A0]Клик", "Домклик");
        changeMisc("Сберздоровье|Docdoc|ДокДок|Сбер[\u0020\u00A0]Здоровье", "СберЗдоровье");
        changeMisc("Сбермаркет|Сбер[\u0020\u00A0]Маркет", "СберМаркет");
        changeMisc("Сберлогистика|Сбер[\u0020\u00A0]Логистика", "СберЛогистика");
        changeMisc("Сберфуд|Сбер[\u0020\u00A0]Фуд", "СберФуд");
        changeMisc("Сберпрайм|Сбер[\u0020\u00A0]Прайм", "СберПрайм");
        changeMisc("Сбермобайл|Сбер[\u0020\u00A0]Мобайл", "СберМобайл");
        changeMisc("Сберзвук|Сбер[\u0020\u00A0]Звук", "СберЗвук");
        changeMisc("Сберавто|Сбер[\u0020\u00A0]Авто", "СберАвто");
        changeMisc("СберАйди|СберID|Сбер[\u0020\u00A0]ID|Сбер[\u0020\u00A0]Айди", "Сбер\u00A0ID");
        changeMisc("Sberpay|СберПэй|Sber[\u0020\u00A0]Pay|Сбер[\u0020\u00A0]Пэй", "SberPay");
        changeMisc("Master[\u0020\u00A0]Card|MasterCard", "Mastercard");
        changeMisc("VISA", "Visa");
        changeMisc("Googlepay|Google[\u0020\u00A0]pay|Гугл[\u0020\u00A0]Пэй|ГуглПэй", "Google\u00A0Pay");
        changeMisc("Applepay|Apple[\u0020\u00A0]pay|Эпл[\u0020\u00A0]Пэй|ЭплПэй", "Apple\u00A0Pay");
        changeMisc("sms|смс", "СМС");
        changeMisc("wifi|wi-fi", "Wi-Fi");
        changeMisc("мск|msk", "мск");
        // пуш-уведомление
        stringToParse = stringToParse.replace(/(?:(^|(?:^(?:[\u0020\u00A0]+?)?[\«\„\"\“\u002D\u2012\u2013\u2014\⁃\•\‧\‣][\u0020\u00A0]?)|(?:[\.\…\!\?][\u0020\u00A0][\«\„\"\“\u002D\u2012\u2013\u2014]?[\u0020\u00A0]?))|([\u0020\u00A0\«\„\"\“\(\[]))((?:push|пуш)[\u0020\u00A0\u002D\u2012\u2013\u2014]уведомлен)(ие|ия|ий|ию|иям|ием|иями|ии|иях)/gmi, function (match, p1, p2, p3, p4) {
            let push;
            if (p1 !== undefined) {
                push = 'Пуш-уведомлен';
                p2 = '';
            }
            else {
                push = 'пуш-уведомлен';
                p1 = '';
            }
            if (p3 != push)
                _counterOther++;
            return p1 + p2 + push + p4.toLowerCase();
        });
        // email
        stringToParse = stringToParse.replace(/(?:(^|(?:^(?:[\u0020\u00A0]+?)?[\«\„\"\“\u002D\u2012\u2013\u2014\⁃\•\‧\‣][\u0020\u00A0]?)|(?:[\.\…\!\?][\u0020\u00A0][\«\„\"\“\u002D\u2012\u2013\u2014]?[\u0020\u00A0]?))|([\u0020\u00A0\«\„\"\“\(\[]))(e-mail|email|имейл|емейл|имайл|емаил)/gmi, function (match, p1, p2, p3) {
            let email;
            if (p1 !== undefined) {
                email = 'Email';
                p2 = '';
            }
            else {
                email = 'email';
                p1 = '';
            }
            if (p3 != email)
                _counterOther++;
            return p1 + p2 + email;
        });
        // офлайн
        stringToParse = stringToParse.replace(/(?:(^|(?:^(?:[\u0020\u00A0]+?)?[\«\„\"\“\u002D\u2012\u2013\u2014\⁃\•\‧\‣][\u0020\u00A0]?)|(?:[\.\…\!\?][\u0020\u00A0][\«\„\"\“\u002D\u2012\u2013\u2014]?[\u0020\u00A0]?))|([\u0020\u00A0\«\„\"\“\(\[]))(оффлайн|офлайн|офф-лайн|оф-лайн)/gmi, function (match, p1, p2, p3) {
            let offline;
            if (p1 !== undefined) {
                offline = 'Офлайн';
                p2 = '';
            }
            else {
                offline = 'офлайн';
                p1 = '';
            }
            if (p3 != offline)
                _counterOther++;
            return p1 + p2 + offline;
        });
        // онлайн
        stringToParse = stringToParse.replace(/(?:(^|(?:^(?:[\u0020\u00A0]+?)?[\«\„\"\“\u002D\u2012\u2013\u2014\⁃\•\‧\‣][\u0020\u00A0]?)|(?:[\.\…\!\?][\u0020\u00A0][\«\„\"\“\u002D\u2012\u2013\u2014]?[\u0020\u00A0]?)|(?:Сбербанк[\u0020\u00A0]))|([\u0020\u00A0\«\„\"\“\(\[]))(оннлайн|онлайн|онн-лайн|он-лайн)/gmi, function (match, p1, p2, p3) {
            let online;
            if (p1 !== undefined) {
                online = 'Онлайн';
                p2 = '';
            }
            else {
                online = 'онлайн';
                p1 = '';
            }
            if (p3 != online)
                _counterOther++;
            return p1 + p2 + online;
        });
        // сим-карта
        stringToParse = stringToParse.replace(/(?:(^|(?:^(?:[\u0020\u00A0]+?)?[\«\„\"\“\u002D\u2012\u2013\u2014\⁃\•\‧\‣][\u0020\u00A0]?)|(?:[\.\…\!\?][\u0020\u00A0][\«\„\"\“\u002D\u2012\u2013\u2014]?[\u0020\u00A0]?))|([\u0020\u00A0\«\„\"\“\(\[]))((?:sim|сим)[\u0020\u00A0\u002D\u2012\u2013\u2014]карт)(а|ы|е|ам|у|ы|ой|ами|ах)?/gmi, function (match, p1, p2, p3, p4) {
            let sim;
            if (p1 !== undefined) {
                sim = 'Сим-карт';
                p2 = '';
            }
            else {
                sim = 'сим-карт';
                p1 = '';
            }
            if (p3 != sim)
                _counterOther++;
            if (p4 === undefined)
                p4 = '';
            return p1 + p2 + sim + p4.toLowerCase();
        });
        // ПИН-код, QR-код
        stringToParse = stringToParse.replace(/(?<=^|[\u0020\u00A0\«\„\"\“\(\[])((pin|пин|QR)[\u0020\u00A0\u002D\u2012\u2013\u2014]код)(ы|а|ов|у|ам|ы|ом|ами|е|ах)?/gmi, function (match, p1, p2, p3) {
            let pinqr;
            if (p2.toLowerCase() == "pin" || p2.toLowerCase() == "пин") {
                pinqr = 'ПИН-код';
            }
            else {
                pinqr = 'QR-код';
            }
            if (p1 != pinqr)
                _counterOther++;
            if (p3 === undefined)
                p3 = '';
            return pinqr + p3.toLowerCase();
        });
        // СVV-код, СVС-код, СVV2-код, СVС2-код, CVV, CVC, СVV2, СVС2
        stringToParse = stringToParse.replace(/(?<=^|[\u0020\u00A0\«\„\"\“\(\[])(cvv|cvc|cvv2|cvc2)([\u0020\u00A0\u002D\u2012\u2013\u2014]код)?(ы|а|ов|у|ам|ы|ом|ами|е|ах)?/gmi, function (match, p1, p2, p3) {
            switch (p1) {
                case "CVV":
                    break;
                case "CVC":
                    break;
                case "CVV2":
                    break;
                case "CVC2":
                    break;
                default:
                    p1 = p1.toUpperCase();
                    _counterOther++;
            }
            if (p2 !== undefined) {
                if (p2 !== "-код")
                    p2 = "-код";
            }
            else {
                p2 = '';
            }
            if (p3 === undefined)
                p3 = '';
            return p1 + p2 + p3.toLowerCase();
        });
    }
    function removeUnchangeable() {
        // Убираем <Unchangeable>
        stringToParse = stringToParse.replace(/<Unchangeable>|<\/Unchangeable>/gm, "");
    }
    punctuation();
    deleteSpaces();
    if (settingsValuesLocal["quotemarks"])
        replaceQuoteMarks();
    addNoBreakSpace();
    if (settingsValuesLocal["yo"])
        YO();
    phoneNumber();
    dash();
    lowerCase();
    currency();
    numbers();
    misc();
    removeUnchangeable();
    return stringToParse;
}
// Находим все текстовые узлы на странице или в выбранных элементах и возвращаем массив найденных узлов

settingsValuesLocal.yo = false;
settingsValuesLocal.quotemarks = true;
module.exports = { applyTypograph };
