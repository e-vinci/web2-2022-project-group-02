const exercicesFacile = [
  {
    task: 'Additione deux nombres contenus dans al et bl. Attention aux overflow !',
    exampleCode: `
section .text
				MOV		eax, 10
				MOV		ebx, 20
		`,
  },
  {
    task: 'Vérifiez si un nombre est pair.',
    exampleCode: `
section .text


				XOR		edx, edx
				DIV		ebx
		`,
  },
  {
    task: 'écrivez un programe qui, si il reçoit 0, renvoie un seul 0 et si il reçoit 1, renvoie une infinité de 1',
    exampleCode: `
section .text
		`,
  },
  {
    task: "écrivez un programme qui affiche 'Miaou tout le monde !' ",
    exampleCode: `
section .data
phrase			db			'Miaou tout le monde !', 0
section .text
		`,
  },
];

export default exercicesFacile;
