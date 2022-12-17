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
        CatByte est un site web avec des informations éducatives. Inscription n'est pas nécessaire
        pour accéder au site web.
      </p>
      <p>
        Ce site a été créé dans le cadre du projet de Web2 de l'année 2022-2023 au
        <a href="https://vinci.be" target="_blank">Haute École Léonard de Vinci au Bruxelles</a>.
      </p>
      <p>
        Le code source est disponible sur
        <a href="https://github.com/e-vinci/web2-2022-project-group-02" target="_blank">GitHub</a>.
      </p>

      <h3>Données personnelles</h3>
      <p>Pour l'inscription, nous collectons les données suivantes:</p>
      <ul>
        <li>Pseudo</li>
        <li>Adresse email</li>
        <li>Mot de passe</li>
      </ul>
      <p>
        Ces données sont stockées dans une base de données sécurisée. Les données sont utilisées
        pour l'authentification et l'identification des utilisateurs.
      </p>
      <p>Les données sont supprimées lorsque l'utilisateur supprime son compte.</p>
      <p>
        Les données sont stockées sur un serveur hébergé par
        <a href="https://www.microsoft.com/fr-fr" target="_blank">Microsoft</a>, au Pays-Bas.
      </p>
      <h3>Cookies</h3>
      <p>
        Le site web utilise des « cookies » pour stocker des informations sur votre ordinateur. Les
        cookies ne contiennent aucune information personnelle et ne peuvent pas être utilisés pour
        vous identifier personnellement. Les cookies sont utilisés pour l'authentification et
        l'identification des utilisateurs.
      </p>
      <h3>Marketing</h3>
      <p>
        Nous ne faisons pas de marketing. Nous ne vendons pas vos données à des tiers. Nous ne
        collectons pas de données à des fins commerciales.
      </p>
      <h3>Quels sont vos droits en matière de protection des données?</h3>
      <p>
        Nous souhaitons vous informer que vous avez certaines droits en matière de protection des
        données. En particulier, vous avez le droit de demander l'accès aux informations que nous
        détenons sur vous et de demander la correction, la mise à jour ou la suppression de ces
        informations.
      </p>
      <p>
        Si vous souhaitez exercer l'un de ces droits, veuillez nous contacter avec le informations
        de contact ci-dessous.
      </p>
      <p>
        Nous vous informons que nous pouvons vous demander de vérifier votre identité avant de
        répondre à ces demandes.
      </p>
      <h3>Comment gérer les cookies?</h3>
      <p>
        Vous pouvez gérer les cookies à tout moment dans les paramètres de votre navigateur. Pour
        plus d'informations, veuillez consulter les instructions et les manuels de votre navigateur.
      </p>
      <p>
        Veuillez noter que si vous désactivez certains cookies, vous ne pourrez peut-être pas
        utiliser toutes les fonctionnalités de ce site.
      </p>
      <h3>Modifications de la politique de confidentialité</h3>
      <p>
        Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
        Nous vous recommandons donc de consulter cette politique de temps en temps pour vous tenir
        au courant des changements que nous apportons.
      </p>
      <p>
        Si nous apportons des modifications importantes à cette politique de confidentialité, nous
        vous informerons par e-mail et / ou d'une manière visible sur notre site Web.
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
      <h3>Comment contacter l'autorité de contrôle</h3>
      <p>
        Si vous n'êtes pas satisfait de la façon dont nous traitons vos données personnelles, vous
        avez le droit de déposer une plainte auprès de l'autorité de contrôle compétente. Vous
        trouverez les coordonnées de l'autorité de contrôle compétente sur le site Web de l'autorité
        de contrôle.
      </p>
    </div>
  `;

  main.appendChild(aboutPage);
}

export default AboutPage;
