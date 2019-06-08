const fs = require('fs');
const path = require('path');
const org = require('org');

const FOLDER = './posts';
const DEST = './public/content';
const INDEX = './posts/index.org';

const convert = function(file) {
  const f = path.join(FOLDER, file);

  const stats = fs.statSync(f);
  const ts = stats.mtime.toLocaleDateString();

  const orgCode = fs.readFileSync(f, 'utf-8');

  const parser = new org.Parser();

  const orgDocument = parser.parse(orgCode);
  const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
    headerOffset: 1,
    exportFromLineNumber: false,
    suppressSubScriptHandling: false,
    suppressAutoLink: true
  });

  // console.dir(orgDocument);
  // console.dir(orgHTMLDocument);

  const link = `<a href="#${file.replace('.org', '')}">Link</a>`;
  const title = `<div class="title-header">${orgHTMLDocument.titleHTML}${link}</div>`;
  const footer = `<div class="footer">${ts}</div>`;

  const content = title + '\n' + orgHTMLDocument.contentHTML + '\n' + footer;
  fs.writeFileSync(path.join(DEST, file.replace('.org', '.html')), content);
};

const generate = function() {
  const fileList = fs.readFileSync(INDEX, 'utf-8').split('\n')
        .filter(f => {
          return f !== '';
        });

  fileList.forEach(convert);

  const list = fileList.map(f => {
    return `'${f.replace('.org', '')}'`;
  }).join(',\n');

  const content = `export default [
${list}
];`;

  fs.writeFileSync('./src/posts.js', content);
};

generate();
