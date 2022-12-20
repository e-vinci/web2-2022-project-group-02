import html from '../../utils/html';

import cat from '../../img/icons/cat.svg';
import chatDots from '../../img/icons/chat-dots.svg';
import flag from '../../img/icons/flag.svg';
import lock from '../../img/icons/lock.svg';
import pin from '../../img/icons/pin.svg';
import trash from '../../img/icons/trash.svg';

const icons = {
  cat,
  'chat-dots': chatDots,
  flag,
  lock,
  pin,
  trash,
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
