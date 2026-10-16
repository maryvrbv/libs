// Safety net for the upstream regex bug: a lone "$" inside an optional
// capturing group doesn't register as "participated" in V8, so the
// "keep the period at end of sentence" branch of the млн/млрд/трлн/$/€/₽
// rule silently fails whenever that abbreviation+dot is the very last
// thing in the string (exactly our case: each HTML text node is its own
// isolated string, frequently ending right after a sentence-final dot).
function fixTrailingAbbreviationDot(original, transformed) {
  const m = original.match(/(млн|млрд|трлн|\$|€|₽)\.$/);
  if (m && !transformed.endsWith(m[0])) {
    // only re-add if the transformed string currently ends with the
    // abbreviation minus the dot (i.e. this exact bug, not some other change)
    if (transformed.endsWith(m[1])) {
      transformed += '.';
    }
  }
  return transformed;
}

// Safety net for a second upstream regex bug: the "number range" dash rule
// (e.g. 2002–2009, XI–XII) matches whenever the character adjacent
// to the dash is in the class [\dIVXLCDMZ] OR a general letter -- but that
// class includes plain Latin letters that double as Roman numerals (I, V,
// X, L, C, D, M). So a multi-letter acronym that happens to END in one of
// those letters (e.g. "BNPL", ending in "L") gets misread as the start/end
// of a Roman-numeral range whenever it sits next to a digit across a dash,
// and "BNPL — 34%" collapses to "BNPL–34%" instead of the normal
// "BNPL — 34%" internal-dash formatting used everywhere else.
// Fix: whenever a 2+ letter word that is not itself a pure Roman numeral
// ends up glued to a digit by a bare en dash, restore that standard form.
function fixFalseWordDigitRangeDash(transformed) {
  const re = /([A-Za-zА-яЁё]{2,})–(\d)/g;
  return transformed.replace(re, function (match, word, digit) {
    if (/[^IVXLCDMivxlcdm]/.test(word)) {
      return word + ' — ' + digit;
    }
    return match;
  });
}

module.exports = { fixTrailingAbbreviationDot, fixFalseWordDigitRangeDash };
