import html from '../../../../utils/html';
import ASMVisualiser from '../../../Visualiser/ASMVisualiser';

const pages = [
  () => html`
    <h1 class="text-center">Visualisation demo</h1>
    ${ASMVisualiser(`section .text
  mov cx, 3

  cmp cx, 0
  jz endofloop
  push cx

loop:
  mov ax, [cx]
  add ax, 1
  mov [cx], ax
  dec cx
  cmp cx, 0
  jnz loop

  pop cx

endofloop:
  mov ax, 0
`)}
  `,
];

export default pages;
