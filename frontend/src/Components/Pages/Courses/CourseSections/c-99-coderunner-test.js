import html from '../../../../utils/html';
import CCodeRunner from '../../../CodeRunner/CCodeRunner';

const pages = [
  () => html`
    <h1>Coderunner test</h1>
	${CCodeRunner({
    code: `#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int* prime_numbers(int n, int* sz) {
	int* t = NULL;

	for (int i = 2; i < n; i++) {
		bool found = false;

		for (int j = i - 1; j > 1; j--) {
			if (i % j == 0) {
				found = true;
				break;
			}
		}

		if (!found) {
			(*sz)++;
			t = (int*)realloc(t, (*sz) * sizeof(int));

			if (t == NULL) return NULL;

			t[*sz - 1] = i;
		}
	}

	return t;
}

int main(int argc, char** argv) {
	int sz = 0;
	int* prime = prime_numbers(atoi(argv[1]), &sz);

	if (prime == NULL) {
		printf("Erreur allocation memoire");
		exit(1);
	}

	for (int i = 0; i < sz; i++) {
		printf("%d", prime[i]);
		if (i != sz - 1) printf(", ");
	}

	free(prime);

	return 0;
}`,
    tests: [
      {
        input: ['3'],
        output: '2',
      },
      {
        input: ['10'],
        output: '2, 3, 5, 7',
      },
      {
        input: ['40'],
        output: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37',
      },
    ],
  })}
    </div>
  `,
];

export default pages;
