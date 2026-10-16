const fs = require('fs');
const path = require('path');
const { applyTypograph } = require(path.join(__dirname, 'typograf-core-lib.js'));
const { fixTrailingAbbreviationDot, fixFalseWordDigitRangeDash } = require(path.join(__dirname, 'post-fix.js'));

const files = process.argv.slice(2);

// Tokenize: comments, <script>...</script>, <style>...</style>, <code>...</code>, tags, and text runs.
// <code> blocks are treated as opaque so inline code samples (CSS var names, class names)
// never get typographic substitutions applied to them.
const TOKEN_RE = /<!--[\s\S]*?-->|<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<code[\s\S]*?<\/code>|<[^>]+>|[^<]+/g;

// CSS custom-property / class-modifier references like "--body-text" or ".icon-card--success"
// use "--" as literal syntax, not as an em-dash stand-in. Protect them with a placeholder
// before running the typographer (which otherwise reads a leading "--" as a dash to convert),
// then restore the original text afterwards.
const CSS_TOKEN_RE = /--[a-zA-Zа-яА-Я][\w-]*/g;

function transform(tok) {
  // The typographer trims/collapses leading and trailing whitespace, which is
  // correct for a whole paragraph but wrong here: each text run is only a
  // fragment split out around inline tags (e.g. "<b>...</b> дальше текст"),
  // so a run's boundary space is often the ONLY thing separating it from the
  // adjacent tag's content. Stripping it would glue words together
  // ("...таймером»сохраняет..."). So we carve off the original leading/
  // trailing whitespace, leave it untouched, and only run the typographer on
  // the non-whitespace-bounded interior.
  const leadingMatch = tok.match(/^\s+/);
  const trailingMatch = tok.match(/\s+$/);
  const leading = leadingMatch ? leadingMatch[0] : '';
  const trailing = trailingMatch ? trailingMatch[0] : '';
  const core = tok.slice(leading.length, tok.length - trailing.length);

  const protectedTokens = [];
  const guarded = core.replace(CSS_TOKEN_RE, (m) => {
    const placeholder = `PROTECTEDTOKEN${protectedTokens.length}END`;
    protectedTokens.push(m);
    return placeholder;
  });
  let result = fixTrailingAbbreviationDot(guarded, applyTypograph(guarded));
  result = fixFalseWordDigitRangeDash(result);
  result = result.replace(/PROTECTEDTOKEN(\d+)END/g, (_, i) => protectedTokens[Number(i)]);
  return leading + result + trailing;
}

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const tokens = src.match(TOKEN_RE) || [];
  let changedCount = 0;
  const out = tokens.map(tok => {
    // opaque: tags, comments, script/style/code blocks
    if (tok[0] === '<') return tok;
    // pure whitespace text run: leave untouched (preserves indentation)
    if (!/\S/.test(tok)) return tok;
    const result = transform(tok);
    if (result !== tok) changedCount++;
    return result;
  });
  const newSrc = out.join('');
  if (newSrc !== src) {
    fs.writeFileSync(file, newSrc, 'utf8');
    console.log(file + ': updated, ' + changedCount + ' text run(s) changed');
  } else {
    console.log(file + ': no changes');
  }
}
