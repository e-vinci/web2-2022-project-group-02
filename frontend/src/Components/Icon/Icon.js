import html from '../../utils/html';

import cat from '../../img/icons/cat.svg';

const icons = {
  cat,
};

export default function Icon(name, size = null, color = null) {
  const icon = icons[name];
  if (!icon) throw new Error(`Icon ${name} does not exist`);

  const cssSize = typeof size === 'number' ? `${size}px` : size;

  let style = '';
  if (cssSize) style += `width: ${cssSize}; height: ${cssSize};`;
  if (color) style += `fill: ${color};`;

  return html`
    <svg class="icon" viewBox="${icons[name].viewBox}" style="${style}">
      <use xlink:href="#${icons[name].id}" />
    </svg>
  `;
}
