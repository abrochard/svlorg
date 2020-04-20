const fs = require('fs');
const path = require('path');
const org = require('org');
const RSS = require('rss');

const FOLDER = './posts';
const DEST = './public/content';
const INDEX = './posts/index.org';
const HTML = './public/index.html';

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

  const post = {
    title: orgDocument.title,
    page: file.replace('.org', '.html')
  };

  // console.dir(orgDocument);
  // console.dir(orgHTMLDocument);

  const header = `<head><title>${post.title}</title></head>`;
  const link = `<a href="/${file.replace('.org', '')}.html">Link</a>`;
  const title = `<div class="title-header">${orgHTMLDocument.titleHTML}${link}</div>`;
  const body = orgHTMLDocument.contentHTML.replace(/src="file:/g, 'src="https://blog.abrochard.com/'); //  clean up links
  const footer = `<div class="footer">${ts}</div>`;

  const content = [header, title, body, footer].join('\n');
  fs.writeFileSync(path.join(DEST, post.page), content);

  post.content = content;

  return post;
};

const buildStatic = function(posts) {
  const links = posts.map(p => {
    return `<li><a href="${p.page}">${p.title}</a></li>`;
  });

  const templ = `<noscript>
        <div style="margin:5px;">
          <h1>abrochard blog</h1>
          <div style="word-spacing: 10px;">
            <a href="https://abrochard.com">Homepage</a>
            <a href="https://github.com/abrochard">GitHub</a>
            <a href="https://twitter.com/abrochard">Twitter</a>
          </div>
          <p>For better viewing experience, please enable JavaScript.</p>
          <ul>
            ${links.join('')}
          </ul>
        </div>
      </noscript>`;

  fs.writeFileSync(HTML, fs.readFileSync(HTML, 'utf-8').replace( /<noscript>(.|\n)*<\/noscript>/, templ));
};

const buildLinks = function(posts) {
  const index = fs.readFileSync(HTML, 'utf-8');
  posts.forEach(p => {
    const templ = `<noscript><div id="content">${p.content}</div></noscript>`;
    const content = index.replace('<title>Blog</title>', `<title>${p.title}</title>`)
          .replace( /<noscript>(.|\n)*<\/noscript>/, templ);
    fs.writeFileSync(`./public/${p.page}`, content);
  });
};

const buildRSSFeed = function(posts) {
  const feed = new RSS({
    title: 'blog.abrochard.com',
    description: 'abrochard tech blog',
    feed_url: 'https://blog.abrochard.com/rss.xml',
    site_url: 'https://blog.abrochard.com',
    image_url: 'https://blog.abrochard.com/favicon.ico',
    managingEditor: 'Adrien Brochard',
    webMaster: 'Adrien Brochard',
    copyright: '2020 Adrien Brochard',
    language: 'en',
    categories: ['tech','blog','emacs'],
    pubDate: Date.now(),
    ttl: '60',
  });

  /* loop over data and add to feed */
  posts.forEach(p => {
    feed.item({
      title:  p.title,
      description: fs.readFileSync(`./public/content/${p.page}`, 'utf-8'),
      url: `https://blog.abrochard.com/${p.page}`, // link to the item
      // date: 'May 27, 2012', // any format that js Date can parse.
    });
  });

  // cache the xml to send to clients
  const xml = feed.xml();
  fs.writeFileSync('./public/rss.xml', xml);
};

const generate = function() {
  const fileList = fs.readFileSync(INDEX, 'utf-8').split('\n')
        .filter(f => {
          return f !== '';
        });

  const posts = fileList.map(convert);

  const list = fileList.map(f => {
    return `'${f.replace('.org', '')}'`;
  }).join(',\n');

  const content = `export default [
  ${list}
];`;

  fs.writeFileSync('./src/posts.js', content);

  buildStatic(posts);

  buildLinks(posts);

  buildRSSFeed(posts);
};

generate();
