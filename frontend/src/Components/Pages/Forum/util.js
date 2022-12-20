import * as DOMPurify from 'dompurify';
import * as marked from 'marked';
import html from '../../../utils/html';

marked.use({
  breaks: true,
  gfm: true,
  silent: true,
  smartypants: true,
});

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  // set all elements owning target to target=_blank
  if ('target' in node) node.setAttribute('target', '_blank');
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
