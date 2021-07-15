const addButton = document.getElementById('add');
addButton.addEventListener('click', () => addNote());

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
	notes.forEach(note => addNote(note))
}

function addNote( text = '' ){
	const added = document.createElement('div');
	added.classList.add('note');
	added.innerHTML = `
				<div class="main ${ text ? "" : "hidden"}">
				</div>
				<textarea class="${ text ? "hidden" : "" }" name="text" id="txt" autofocus></textarea>
				
				<div class="buttons">
					<button class="edit">
						<i class="fas fa-edit"></i>
					</button>
					<button class="delite">
						<i class="fas fa-trash"></i>
					</button>
				</div>

	`;

	const editBtn = added.querySelector('.edit');
	const deliteBtn = added.querySelector('.delite');
	const txtArea = added.querySelector('textarea');
	const mainArea = added.querySelector('.main');

	txtArea.value = text;
	mainArea.innerHTML = marked(text);


	deliteBtn.addEventListener('click', () => {
		added.remove();
		updateLocalStorage();
	});

	editBtn.addEventListener('click', () => {
		mainArea.classList.toggle('hidden');
		txtArea.classList.toggle('hidden');
	});

	txtArea.addEventListener('input', (e) => {
		const { value } = e.target;
		mainArea.innerHTML = marked(value);
		updateLocalStorage();
	})

	addDiv = document.querySelector('.container').appendChild(added);
	//console.log(addDiv.scrollHeight);
	scroller();
}

//scroll to the bottom once the note is created
function scroller(){
	var scrolling = document.getElementById('cont');
	scrolling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function updateLocalStorage() {
		const notesText = document.querySelectorAll('textarea');
		const notes = [];
		notesText.forEach(note => notes.push(note.value));
		//console.log(notes);

		//stringifi version to store array as string at LS
		localStorage.setItem('notes', JSON.stringify(notes));
	}
