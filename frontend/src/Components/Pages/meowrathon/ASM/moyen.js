const exercicesMoyen = [
  {
    task: 'calcule les 10 premiers nombres de la suite de fibonacci.',
    exampleCode: `
section .text
				XOR		eax, eax
				XOR		ebx, ebx
				XOR		ecx, ecx
				XOR		edx, edx
		`,
  },
  {
    task: 'Vérifiez si un nombre est pair. Soyez aussi efficace que possible.',
    exampleCode: `
section .text
		`,
  },
  {
    task: 'vérifiez si un mot est un palindrôme. Attention à vos manipulations de la pile !',
    exampleCode: `
section .text
		`,
  },
  {
    task: 'Convertissez un mot en majuscule.',
    exampleCode: `
section .data
mot			db			'AnTiCoNsTiTuTiOnElLeMeNt 123456.,/'
section .text
		`,
  },
];

export default exercicesMoyen;
