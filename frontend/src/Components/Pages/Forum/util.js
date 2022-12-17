import * as DOMPurify from 'dompurify';
import * as marked from 'marked';
import html from '../../../utils/html';

marked.use({
  breaks: true,
  gfm: true,
  silent: true,
  smartypants: true,
});

function renderText(text) {
  return html([
    DOMPurify.sanitize(marked.parse(text), {
      ALLOWED_TAGS: [
        'p',
        'a',
        'ul',
        'ol',
        'li',
        'strong',
        'em',
        'blockquote',
        'code',
        'pre',
        'br',
        'hr',
      ],
      ALLOWED_ATTR: ['href'],
    }),
  ]);
}

export default renderText;
