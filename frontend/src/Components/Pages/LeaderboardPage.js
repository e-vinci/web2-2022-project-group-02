import { clearPage, renderPageTitle } from '../../utils/render';
import html from '../../utils/html';
import API from '../../utils/api';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import Navigate from '../Router/Navigate';
import badgeGold from '../../img/badge-gold.png';
import badgeSilver from '../../img/badge-silver.png';
import badgeBronze from '../../img/badge-bronze.png';

function LeaderboardPage() {
  clearPage();
  renderPageTitle('Leaderboard');
  renderPage();
}

async function renderPage() {
  const main = document.querySelector('main');

  return main.append(html` <div class="container">${renderLeaderboard()}</div> `);
}

async function renderLeaderboard() {
  const leaderboard = await API.GET('/leaderboard');

  const ASMRanking = leaderboard.asm ?? [];
  const CRanking = leaderboard.c ?? [];

  // pad the arrays to 10 elements
  const noUser = { username: '-' };
  while (ASMRanking.length < 10) ASMRanking.push(noUser);
  while (CRanking.length < 10) CRanking.push(noUser);

  const el = html`
    <div class="row g-3">
      ${renderRanking(ASMRanking, 2, 'ASM')} ${renderRanking(CRanking, 2, 'C')}
    </div>
  `;

  return el;
}

function renderRanking(ranking, rankingCount, name) {
  const el = html`
    <div
      class="leaderboard-ranking leaderboard-${name} col-12 col-lg-${Math.floor(
        12 / rankingCount,
      )} d-flex flex-column gap-3"
    >
      <div class="card">
        <div class="card-header">
          <div>Classement ${name}</div>
        </div>
        <div class="card-body">
          <div class="d-flex flex-column gap-3">
            ${ranking.map((user, i) => renderUser(user, i + 1))}
            ${ranking.length === 0
              ? html`<div class="text-muted text-center">Aucun utilisateur</div>`
              : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  return el;
}

function renderUser(user, ranking) {
  const link = (child) => {
    if (user.id === undefined) return child;

    const linkEl = html`<a href="#" class="link-inherit">${child}</a>`;

    linkEl.onclick = (e) => {
      e.preventDefault();
      Navigate(`/profile?id=${user.id}`);
    };

    return linkEl;
  };

  let badge = null;
  if (user.score !== undefined) {
    if (ranking === 1) badge = badgeGold;
    else if (ranking === 2) badge = badgeSilver;
    else if (ranking === 3) badge = badgeBronze;
  }

  const el = html`
    <div class="d-flex flex-row align-items-center gap-3 justify-content-between">
      <div class="d-flex flex-column align-items-center">
        <div>${link(ProfilePicture(user.id, 50))}</div>
      </div>
      <div class="d-flex flex-column flex-grow-1">
        <div class="fw-bold">${link(user.username)}</div>
        ${user.score !== undefined
          ? html` <div class="text-muted"><code>${user.score}</code> points</div> `
          : ''}
      </div>
      ${badge !== null
        ? html`
            <div class="d-flex flex-column align-items-center">
              <img src="${badge}" alt="Badge" style="width:50px" />
            </div>
          `
        : ''}
    </div>
  `;

  return el;
}

export default LeaderboardPage;
