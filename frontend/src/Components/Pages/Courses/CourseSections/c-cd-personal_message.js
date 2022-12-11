import html from '../../../../utils/html';
import CCodeRunner from '../../../CodeRunner/CCodeRunner';

const pages = [
  () => html`
    <h1>A toi de jouer !</h1>
    <p> pour rappel, utilise la méthode printf("") pour imprimer à l'écran un message ! <\p>
	${CCodeRunner({
    code: `#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>


int main() {
	
	return 0;
}`,
  })}
    </div>
  `,
];

export default pages;
