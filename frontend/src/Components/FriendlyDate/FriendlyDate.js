import { Tooltip as BootstrapTooltip } from 'bootstrap';
import html from '../../utils/html';

function pl(n) {
  return `${n !== 1 ? 's' : ''}`;
}

export function getTimeAgo(_date) {
  let secondsAgo = Math.round((Date.now() - new Date(_date).getTime()) / 1000);
  const str = secondsAgo < 0 ? 'dans ' : 'il y a ';

  if (secondsAgo === 0) return "à l'instant";

  if (secondsAgo < 0) {
    secondsAgo *= -1;
  }

  if (secondsAgo < 60) return `${str + secondsAgo} seconde${pl(secondsAgo)}`;

  const minutesAgo = Math.round(secondsAgo / 60);
  if (minutesAgo < 60) return `${str + minutesAgo} minute${pl(minutesAgo)}`;

  const hoursAgo = Math.round(minutesAgo / 60);
  if (hoursAgo < 24) return `${str + hoursAgo} heure${pl(hoursAgo)}`;

  const daysAgo = Math.round(hoursAgo / 24);
  if (daysAgo < 7) return `${str + daysAgo} jour${pl(daysAgo)}`;

  const weeksAgo = Math.round(daysAgo / 7);
  if (weeksAgo < 4) return `${str + weeksAgo} semaine${pl(weeksAgo)}`;

  const monthsAgo = Math.round(daysAgo / 30);
  if (monthsAgo < 12) return `${str + monthsAgo} mois`;

  const yearsAgo = Math.round(daysAgo / 365);
  return `${str + yearsAgo} an${pl(yearsAgo)}`;
}

export default function FriendlyDate(_date, dateType = 'full', timeType = 'medium') {
  const date = new Date(_date);
  const str = date.toLocaleString('fr-FR', {
    dateStyle: dateType,
    timeStyle: timeType,
  });
  const timeAgoStr = getTimeAgo(date);

  const el = html` <span title="${str}" style="cursor: help;">${timeAgoStr}</span> `;

  // eslint-disable-next-line no-unused-vars
  const tooltip = new BootstrapTooltip(el, {
    placement: 'bottom',
  });

  return el;
}
