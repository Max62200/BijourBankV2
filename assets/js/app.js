console.log('Bijour Bank !');
/**
 * init foundation
 */
$(document).ready(function() {
	$(document).foundation();
});

//add to local storage

const operationForm = document.getElementById('operationForm');
operationForm.addEventListener('submit', () => {
	let i = localStorage.length;
	let arrayStorage = {
		operator: document.getElementById('operator').value,
		titre: document.getElementById('titre').value,
		desc: document.getElementById('desc').value,
		montant: document.getElementById('montant').value,
	};
	localStorage.setItem(i, JSON.stringify(arrayStorage));
});

// initialisation des variables

let valueCredit = 0;
let valueDebit = 0;
var total = 0;
var solde = document.getElementById('solde');
solde.innerHTML = total + `€`;

//loop for display element of this array
for (let i = 0; i < localStorage.length; i++) {
	let obj = JSON.parse(localStorage.getItem(i));

	// condition for sold
	var img = '';
	if (obj.operator == 'credit') {
		var img = 'sac-dargent';
		valueCredit = valueCredit + Number(obj.montant);
	} else {
		var img = 'depenses';
		valueDebit = valueDebit + Number(obj.montant);
	}

	// calcule du solde

	total = valueCredit - valueDebit;
	var solde = document.getElementById('solde');
	solde.innerHTML = total + `€`;

	// calcule taux variation
	for (let i = 0; i < localStorage.length; i++) {
		let obj = JSON.parse(localStorage.getItem(i));

		var a = total - obj.montant;
		var b = total;

		var taux = (((b - a) / a) * 100).toFixed(2);
	}

	// code html injected

	var codeHtml = `    
		<div class="grid-container">
			<div class="operation ${obj.operator}">
				<div class="grid-x grid-padding-x align-middle">
					<div class="cell shrink">
						<div class="picto">
							<img src="./assets/images/${img}.png" alt="" />
						</div>
					</div>
					<div class="cell auto">
						<div>
							<h2>${obj.titre}</h2>
							<small>${obj.desc}</small>
						</div>
					</div>
					<div class="cell small-3 text-right">
						<div>
							<p class="count">${obj.montant}€</p>
							<small>${taux}%</small>
						</div>
					</div>
				</div>
			</div>
		</div>
    `;
	// replace html

	var replace = document.getElementById('grid-container');
	replace.insertAdjacentHTML('afterbegin', codeHtml);

	// var all = document.getElementById('#all');
	// var creditPage = document.getElementById('credit');
	// var debitPage = document.getElementById('debit');
	// var cred = obj.operator == 'credit';
	// var deb = obj.operator == 'debit';

	// all.addEventListener('click', () => {
	// 	all.codeHtml;
	// });

	// creditPage.addEventListener('click', () => {
	// 	if (cred) {
	// 		creditPage.codeHtml;
	// 	}
	// });

	// debitPage.addEventListener('click', () => {
	// 	if (deb) {
	// 		debitPage.codeHtml;
	// 	}

	// });
}

// switch pages
const debitFilter = document.querySelector('[href="#debit"]');
const debitType = document.querySelectorAll('.operation.debit');

const creditFilter = document.querySelector('[href="#credit"]');
const creditType = document.querySelectorAll('.operation.credit');

const noFilter = document.querySelector('[href="#"]');
noFilter.addEventListener('click', () => {
	const filters = [debitType, creditType];
	filters.forEach((filter) => {
		filter.forEach((htmlElement) => {
			htmlElement.style.display = 'block';
		});
	});
});

creditFilter.addEventListener('click', () => {
	creditType.forEach((htmlElement) => {
		htmlElement.style.display = 'block';
	});

	debitType.forEach((htmlElement) => {
		htmlElement.style.display = 'none';
	});
});

debitFilter.addEventListener('click', () => {
	debitType.forEach((htmlElement) => {
		htmlElement.style.display = 'block';
	});

	creditType.forEach((htmlElement) => {
		htmlElement.style.display = 'none';
	});
});

// condition good / bad color class

var state = document.querySelector('#solde + small');

if (total >= 0) {
	state.setAttribute('class', 'good');
	state.innerText = 'on est good 👍';
} else {
	state.setAttribute('class', 'bad');
	state.innerText = ' on est dans la merde 👎';
}
