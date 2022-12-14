import html from '../../utils/html';
import { clearPage } from '../../utils/render';

function AboutPage() {
  clearPage();
  renderAboutPage();
}

function renderAboutPage() {
  const main = document.querySelector('main');

  const aboutPage = html`
    <div class="container py-5">
      <h2>Politique de confidentialité</h2>
      <p>
        CatByte est un site web avec des informations éducatives. L'inscription n'est pas nécessaire
        pour accéder au site web.
      </p>
      <p>
        Ce site a été créé dans le cadre du projet de Web2 de l'année 2022-2023 à
        <a href="https://vinci.be" target="_blank">la Haute École Léonard de Vinci au Bruxelles</a>.
      </p>
      <p>
        Le code source est disponible sur
        <a href="https://github.com/e-vinci/web2-2022-project-group-02" target="_blank">GitHub</a>.
      </p>

      <h3>Données personnelles</h3>
      <p>Après l'inscription, nous collectons les données suivantes :</p>
      <ul>
        <li>Pseudo</li>
        <li>Adresse mail</li>
        <li>Mot de passe</li>
        <li>Niveau d'avancement dans les cours</li>
        <li>Messages postés sur le forum</li>
      </ul>
      <p>Ces données sont stockées dans une base de données sécurisée.</p>
      <p>L'entièreté des données sont supprimées lorsque l'utilisateur supprime son compte.</p>
      <p>
        Les données sont stockées sur un serveur hébergé par
        <a href="https://www.microsoft.com/fr-fr" target="_blank">Microsoft</a>, aux Pays-Bas.
      </p>
      <h3>Cookies</h3>
      <p>
        Le site web utilise des « cookies » ou stockage local pour stocker des informations sur
        votre ordinateur. Les cookies servent seulement à identifier les utilisateurs au sein du
        site web. Les cookies ne sont pas utilisés pour collecter des données personnelles. Les
        cookies sont stockés sur votre ordinateur et ne sont pas accessibles par des tiers.
      </p>
      <h3>Comment gérer les cookies ?</h3>
      <p>
        Vous pouvez gérer les cookies à tout moment dans les paramètres de votre navigateur. Pour
        plus d'informations, veuillez consulter les instructions et les manuels de votre navigateur.
      </p>
      <p>
        Veuillez noter que si vous désactivez certains cookies, vous ne pourrez peut-être pas
        utiliser toutes les fonctionnalités de ce site.
      </p>
      <h3>Marketing</h3>
      <p>
        Nous ne faisons pas de marketing. Nous ne vendons pas vos données à des tiers. Nous ne
        collectons pas de données à des fins commerciales.
      </p>
      <h3>Quels sont vos droits en matière de protection des données ?</h3>
      <p>
        Nous souhaitons vous informer que vous avez certains droits en matière de protection des
        données. En particulier, vous avez le droit de demander l'accès aux informations que nous
        détenons sur vous et de demander la correction, la mise à jour ou la suppression de ces
        informations.
      </p>
      <p>
        Si vous souhaitez exercer l'un de ces droits, veuillez nous contacter avec les informations
        de contact ci-dessous.
      </p>
      <p>
        Nous vous informons que nous pouvons vous demander de vérifier votre identité avant de
        répondre à ces demandes.
      </p>

      <h3>Modifications de la politique de confidentialité</h3>
      <p>
        Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
        Nous vous recommandons donc de consulter cette politique de temps en temps pour vous tenir
        au courant des changements que nous apportons.
      </p>
      <p>
        Si nous apportons des modifications importantes à cette politique de confidentialité, nous
        vous informerons par e-mail et/ou d'une manière visible sur notre site web.
      </p>
      <h3>Comment nous contacter</h3>
      <p>
        Si vous avez des questions sur la politique de confidentialité, les données que nous
        détenons sur vous, votre consentement ou vos droits en matière de protection des données, ou
        si vous souhaitez exercer l'un de vos droits en matière de protection des données, veuillez
        nous contacter par e-mail à
        <a href="mailto:chehrazad.ouazzani@student.vinci.be">chehrazad.ouazzani@student.vinci.be</a
        >.
      </p>
      <h3>Comment contacter l'Autorité de protection des données</h3>
      <p>
        Si vous n'êtes pas satisfait de la façon dont nous traitons vos données personnelles, vous
        avez le droit de déposer une plainte auprès de l'Autorité de protection des données.
      </p>
    </div>
  `;

  main.appendChild(aboutPage);
}

export default AboutPage;
