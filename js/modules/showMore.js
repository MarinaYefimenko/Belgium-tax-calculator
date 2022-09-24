function showMore() {
    const notes = document.querySelectorAll('.note'),
        btnsMore = document.querySelectorAll('.btn-more'),
        noteContents = document.querySelectorAll('.note__content');

    function showNote() {
        notes.forEach((note) => {
            note.addEventListener('click', (e) => {
                btnsMore.forEach((btn, i) => {
                    if (e.target === btn) {
                        notes[i].classList.toggle('active');
                    }
                });
            });
        })
    }
    showNote();
}

module.exports = showMore;