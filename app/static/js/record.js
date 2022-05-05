// Register 'Enter' listeners on all inputs
allInputs = Array.from(document.getElementsByClassName('input'))
	.filter(e => e.type == 'number');
allInputs.forEach(e => e.addEventListener('keydown', handleEnterKey));

// Register onsubmit handler for form
document.getElementById("form").addEventListener('submit', (el) => {
	Array.from(event.target.getElementsByTagName('input')).forEach(i => i.disabled = false);
});

function handleEnterKey(event) {
	if (event.key === "Enter" || event.key === "Tab") {
		event.preventDefault();

		//Isolate the node that we're after
		const currentNode = event.target;
		//Find the current tab index.
		currentIndex = [...allInputs].findIndex(el => currentNode.isEqualNode(el));

		//focus the following element
		const targetIndex = (currentIndex + 1) % allInputs.length;
		const targetNode = allInputs[targetIndex];

		if (!targetNode.parentElement.parentElement.isEqualNode(currentNode.parentElement.parentElement)) {
			// going to new row
			if (currentNode.value != "" && allInputs[currentIndex-1].value != "") {
				onClickSetCheck(currentNode.parentElement.parentElement.children[3].children[0]);
			}
		}

		targetNode.focus();
	}
}

function setReset(row, index, values=true) {
	let lbsInput = row.children[1].children[0];
	let repsInput = row.children[2].children[0];
	let doneButton = row.children[3].children[0];

	// Enable inputs
	lbsInput.disabled = false;
	repsInput.disabled = false;

	// Remove classes
	lbsInput.classList.remove('is-success');
	lbsInput.classList.remove('is-danger');
	repsInput.classList.remove('is-success');
	repsInput.classList.remove('is-danger');

	// update id/classes to new row index
	current = lbsInput.id;
	updated = current.substring(0, current.length - 5);
	lbs = updated + index + '-lbs';
	lbsInput.id = lbs;
	lbsInput.name = lbs;
	reps = updated + index + '-reps'
	repsInput.id = reps;
	repsInput.name = reps;

	doneButton.classList.remove('is-success');

	if (values) {
		lbsInput.value = '';
		repsInput.value = '';
	}
}

function setSetid(row, id) {
	let setNumber = row.children[0];
	let lbsInput = row.children[1].children[0];
	let repsInput = row.children[2].children[0];
	let doneButton = row.children[3].children[0];

	setNumber.textContent = id + 1;
}

function setCheck(row) {
	// Disable input editing
	row.children[1].firstChild.disabled = true;
	row.children[2].firstChild.disabled = true;

	// Add is-success to inputs
	row.children[1].firstChild.classList.add('is-success')
	row.children[2].firstChild.classList.add('is-success')
}

// Called when the check at the end of a set line is clicked
function onClickSetCheck(elem) {
	if (elem.classList.contains('is-success')) {
		setReset(elem.parentElement.parentElement, elem.parentElement.parentElement.parentElement.children.length - 1, false);
	} else {
		elem.classList.add('is-success');

		setCheck(elem.parentElement.parentElement);
	}
}

function onClickAddSet(elem) {
	// Create the new row
	let tableBody = elem.parentElement.parentElement.children[0].children[1];
	let row = tableBody.children[0].cloneNode(true);

	// Add new row to table
	setReset(row, tableBody.children.length, false);
	setSetid(row, tableBody.children.length)
	row.addEventListener('keydown', handleEnterKey)
	tableBody.appendChild(row)
}

function loadTimerTimes() {

}

function onClickPausePlayTimer(elem) {
	if (elem.children[0].children[0].classList.contains('fa-play')) {
		paused = false;
		elem.children[0].children[0].classList.remove('fa-play');
		elem.children[0].children[0].classList.add('fa-pause');
	} else {
		paused = true;
		elem.children[0].children[0].classList.add('fa-play');
		elem.children[0].children[0].classList.remove('fa-pause');
	}
}
