const modalDiv = document.querySelector('#modal');
function toggle() {
    modalDiv.classList.toggle('modal-hidden');
}

//document.querySelector('.modal-background').addEventListener('click', toggle);
// document.querySelector('#showBtn').addEventListener('click', toggle);
document.querySelector('#okBtn').addEventListener('click', toggle);
// document.querySelector('#cancelBtn').addEventListener('click', toggle);
