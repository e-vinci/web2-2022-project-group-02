import { Tooltip } from 'bootstrap';
import html from '../../utils/html';

export function getTimeAgo(_date) {
  let secondsAgo = Math.round((Date.now() - new Date(_date).getTime()) / 1000);
  const str = secondsAgo < 0 ? 'dans ' : 'il y a ';

  if (secondsAgo === 0) return "à l'instant";

  if (secondsAgo < 0) {
    secondsAgo *= -1;
  }

  if (secondsAgo < 60) return `${str + secondsAgo} secondes`;

  const minutesAgo = Math.round(secondsAgo / 60);
  if (minutesAgo < 60) return `${str + minutesAgo} minutes`;

  const hoursAgo = Math.round(minutesAgo / 60);
  if (hoursAgo < 24) return `${str + hoursAgo} heures`;

  const daysAgo = Math.round(hoursAgo / 24);
  if (daysAgo < 7) return `${str + daysAgo} jours`;

  const weeksAgo = Math.round(daysAgo / 7);
  if (weeksAgo < 4) return `${str + weeksAgo} semaines`;

  const monthsAgo = Math.round(daysAgo / 30);
  if (monthsAgo < 12) return `${str + monthsAgo} mois`;

  const yearsAgo = Math.round(daysAgo / 365);
  return `${str + yearsAgo} ans`;
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
  const tooltip = new Tooltip(el);

  return el;
}
