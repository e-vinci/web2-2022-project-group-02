import html from '../../utils/html';
import { CALL_PREFIX } from '../../utils/api';

import noAvatar from '../../img/no-avatar.png';

export default function ProfilePicture(id, size = 50) {
  const cssSize = typeof size === 'number' ? `${size}px` : size;

  let style = 'border-radius: 10px; background-color: #ccc; aspect-ratio: 1/1;';
  if (cssSize) style += `;width: ${cssSize}; height: ${cssSize};`;

  return html`
    <img
      src="${id ? `${CALL_PREFIX}/users/${id}/avatar` : noAvatar}"
      style="${style}"
      onerror="this.src='${noAvatar}'"
    />
  `;
}
