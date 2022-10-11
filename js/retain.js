$(function(){

    var model = {
        init: function() {
            // check if the note is inside the local storage
            if (!localStorage.notes) {
                // create a JSON of empty array
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            // convert the empty JSON array to JavaScript array
            var data = JSON.parse(localStorage.notes);
            // add new array to the empty array
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },

        // retrieve all the array from the local storage
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                dateSubmitted: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                '<span class="note-date">' + new Date(note.dateSubmitted).toString() + '</span>' +
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});