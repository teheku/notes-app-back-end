const { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByIdHandler
} = require('./handler'); //import fungsi addNoteHandler

const routes = [
    //menyimpan catatan
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler, //konfigurasi 
    },
    //menampilkan catatan
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    //menampilkan detail catatan
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    //edit catatan
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    //hapus catatan
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
      },

  ];
   
  module.exports = routes;