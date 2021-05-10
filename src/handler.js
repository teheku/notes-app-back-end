const { nanoid } = require('nanoid'); //import nanoid
const notes = require('./notes'); //impor array notes

//menyimpan catatan
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16); //kita hanya perlu memanggil method nanoid() dan memberikan parameter number yang merupakan ukuran dari string-nya
  const createdAt = new Date().toISOString(); //menambahkan catatan baru, maka nilai kedua properti tersebut seharusnya sama
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote); //masukan nilai-nilai tersebut ke dalam array notes menggunakan method push()

  const isSuccess = notes.filter((note) => note.id === id).length > 0; //memanfaatkan method filter() berdasarkan id catatan untuk mengetahuinya
  //isSuccess untuk menentukan respons yang diberikan server. Jika isSuccess bernilai true, maka beri respons berhasil. Jika false, maka beri respons gagal
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

//menampilkan catatan
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
  });  

//menampilkan detail catatan
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params; //id dari request.params

    const note = notes.filter((n) => n.id === id)[0];//Manfaatkan method array filter() untuk mendapatkan objeknya
    //pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal
    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;


};

//edit catatan
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params; //id yang digunakan pada route parameter
 
    const { title, tags, body } = request.payload; //data notes terbaru yang dikirimkan oleh client melalui body request
    const updatedAt = new Date().toISOString();//perbarui juga nilai dari properti updatedAt. Jadi, dapatkan nilai terbaru dengan menggunakan new Date().toISOString().

    const index = notes.findIndex((note) => note.id === id);//dapatkan dulu index array pada objek catatan sesuai id yang ditentukan. Untuk melakukannya, gunakanlah method array findIndex()
    // respon
    if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title,
          tags,
          body,
          updatedAt,
        };
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;

};

//hapus catatan
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
      }
     
     const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
};


module.exports = { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};
