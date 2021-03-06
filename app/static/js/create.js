var rowsDiv = document.getElementById("rows");
var rowId = rowsDiv.children.length;

function handleAdd() {
	newRow = rowsDiv.children[0].cloneNode(true);

	exerciseNameInput = newRow.children[0].children[0].children[0].children[0];
	exerciseNameInput.value = '';
	exerciseNameInput.name = 'exercises-' + rowId + '-name';

	exerciseSetInput = newRow.children[0].children[1].children[0].children[0];
	exerciseSetInput.value = '';
	exerciseSetInput.name = 'exercises-' + rowId + '-sets';

	exerciseUnitInput = newRow.children[0].children[2].children[1];
	exerciseUnitInput.value = '';
	exerciseUnitInput.placeholder = 'Reps';
	exerciseUnitInput.name = 'exercises-' + rowId + '-units';

	exerciseUnitSelect = exerciseUnitInput.parentNode.children[0].children[0].children[0];
	exerciseUnitSelect.addEventListener("input", handleChange);
	exerciseUnitSelect.name = 'exercises-' + rowId + '-type';

	rowId++;
	rowsDiv.append(newRow);
}

function handleDel(elem) {
	if (rowId > 1) {
		elem.parentNode.parentNode.remove();
		rowId--;
	}
}

function handleChange(elem) {
	if (elem.value == 'time') {
		elem.parentNode.parentNode.parentNode.children[1].placeholder = "Time (in seconds)";
		elem.parentNode.parentNode.parentNode.children[1].selected = true;
		elem.parentNode.parentNode.children[1].children[0].classList.remove('fa-calculator');
		elem.parentNode.parentNode.children[1].children[0].classList.add('fa-clock-o');
	} else if (elem.value == 'reps') {
		elem.parentNode.parentNode.children[1].children[0].classList.add('fa-calculator');
		elem.parentNode.parentNode.children[1].children[0].classList.remove('fa-clock-o');
		elem.parentNode.parentNode.parentNode.children[1].selected = true;
		elem.parentNode.parentNode.parentNode.children[1].placeholder = "Reps";
	}
}
