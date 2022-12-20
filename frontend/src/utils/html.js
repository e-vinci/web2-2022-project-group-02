/* eslint-disable no-console */
import * as DOMPurify from 'dompurify';
import { Tooltip as BootstrapTooltip } from 'bootstrap';

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

  const templateElement = document.createElement('template');

  const newKeys = keys.map((key) => {
    const id = Math.random().toString(36).slice(2);

    if (key instanceof Node) {
      elements.push([id, key]);
      return `<div id="__PLACEHOLDER__${id}__"></div>`;
    }

    if (key instanceof Promise) {
      const placeholder = document.createElement('div');
      placeholder.id = `__PLACEHOLDER__${id}__`;
      placeholder.className = 'd-flex align-items-center justify-content-center';
      placeholder.innerHTML = '<div class="spinner-border" role="status"></div>';
      elements.push([id, placeholder]);

      key
        .then((value) => {
          placeholder.replaceWith(value);
        })
        .catch((err) => {
          console.error(err);

          const errorEl = html`
            <div class="promised-error" title="Une erreur est survenue: ${err.message}"></div>
          `;

          // eslint-disable-next-line no-new
          new BootstrapTooltip(errorEl);

          placeholder.replaceWith(errorEl);
        });

      return `<div id="__PLACEHOLDER__${id}__"></div>`;
    }

    if (Array.isArray(key)) {
      const fragment = document.createDocumentFragment();

      key.forEach((node) => {
        if (!(node instanceof Node)) {
          console.error('html: Invalid node', node);
          return;
        }

        fragment.appendChild(node);
      });

      elements.push([id, fragment]);
      return `<div id="__PLACEHOLDER__${id}__"></div>`;
    }

    if (typeof key === 'string') return DOMPurify.sanitize(key);

    return key;
  });

  const str = keys.length === 0 ? raw[0] : String.raw({ raw }, ...newKeys);

  templateElement.innerHTML = str.trim();

  elements.forEach(([id, element]) => {
    if (!element) return;

    const placeholder = templateElement.content.querySelector(`#__PLACEHOLDER__${id}__`);

    if (placeholder) placeholder.replaceWith(element);
  });

  if (templateElement.content.children.length === 1)
    return templateElement.content.firstElementChild;

  return templateElement.content;
}
