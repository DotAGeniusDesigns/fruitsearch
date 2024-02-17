const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const suggestionsContainer = document.querySelector('.search-container .suggestions');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = fruit.filter(fruitItem => fruitItem.toLowerCase().includes(str.toLowerCase()));

	return results;
}

function searchHandler(e) {
	const searchText = e.target.value;
	suggestions.innerHTML = '';

	if (searchText.length >= 2) {
		const results = search(searchText);
		showSuggestions(results, searchText);
	} else {
		suggestionsContainer.classList.remove('has-suggestions');
	}
}

function showSuggestions(results, inputVal) {
	suggestions.innerHTML = '';

	if (results.length > 0) {
		results.sort().slice(0, 5).forEach(result => {
			const li = document.createElement('li');
			const matchStart = result.toLowerCase().indexOf(inputVal.toLowerCase());
			const matchEnd = matchStart + inputVal.length;
			const before = result.substring(0, matchStart);
			const match = result.substring(matchStart, matchEnd);
			const after = result.substring(matchEnd);
			
			li.innerHTML = `${before}<strong>${match}</strong>${after}`;
			suggestions.appendChild(li);
		});
		suggestionsContainer.classList.add('has-suggestions');
	} else {
		const noli = document.createElement('li');
		noli.textContent = 'No results found';
		suggestions.appendChild(noli);
		suggestionsContainer.classList.remove('has-suggestions');
	}
}

function useSuggestion(e) {
	if (e.target.tagName.toLowerCase() === 'li') {
		input.value = e.target.textContent;
		suggestions.innerHTML = '';
		suggestionsContainer.classList.remove('has-suggestions');
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);