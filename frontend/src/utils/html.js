/**
 * A better alternative to document.createElement, which allows you to create
 * an element from a template literal. (Think of it as a pseudo-JSX)
 *
 * Also has the added benefit of being recognized by Prettier:
 * https://prettier.io/docs/en/options.html#embedded-language-formatting
 *
 * Get this VSCode extension for syntax highlighting:
 * https://marketplace.visualstudio.com/items?itemName=bierner.lit-html
 */
export default function html(raw, ...keys) {
  // For nested elements, we create placeholders and replace them with the nested
  // elements after the fact, to preserve event listeners.
  const elements = [];

  const newKeys = keys.map((key) => {
    if (key instanceof Node) {
      elements.push(key);
      return `<div id="__PLACEHOLDER__${elements.length - 1}__"></div>`;
    }

    if (Array.isArray(key)) {
      const fragment = document.createDocumentFragment();
      key.forEach((node) => {
        elements.push(node);
        fragment.appendChild(node);
      });
      return `<div id="__PLACEHOLDER__${elements.length - 1}__"></div>`;
    }

    if (typeof key === 'string') return escapeHTML(key);

    return key;
  });

  const templateElement = document.createElement('template');
  const str = keys.length === 0 ? raw[0] : String.raw({ raw }, ...newKeys);

  templateElement.innerHTML = str.trim();

  elements.forEach((element, index) => {
    const placeholder = templateElement.content.querySelector(`#__PLACEHOLDER__${index}__`);

    placeholder.replaceWith(element);
  });

  if (templateElement.content.children.length === 1)
    return templateElement.content.firstElementChild;

  return templateElement.content;
}

function escapeHTML(unsafe) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
