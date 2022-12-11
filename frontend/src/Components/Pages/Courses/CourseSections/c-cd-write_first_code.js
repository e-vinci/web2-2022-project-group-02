import html from '../../../../utils/html';
import CCodeRunner from '../../../CodeRunner/CCodeRunner';

const pages = [
  () => html`
    <h1>On complique un peu ? Ecris tout le code</h1>
    <p>Aller, on va pas te laisser pommer dès le début. <br> D'abord, pense TOUJOURS aux includes
    attention ! Car pour rappel, le printf utilise ... donc sans le include il va essayer de chercher printf dans ton code or il n'y ait pas ! <br>
    Ensuite vient le main, on déclare le main suivi des parenthèses (sans paramètres pour l'instant). <\p>
	${CCodeRunner({
    code: `
}`,
  })}
    </div>
  `,
];

export default pages;
