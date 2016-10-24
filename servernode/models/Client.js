
module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Client = new Schema({
		gestorId: { type: String, required: true },
	    name: { type: String, required: true },
	    surname: { type: String, required: false },
	    type: { type: String, required: true },
	    email: { type: String, required: true },
	    dni: { type: String, required: false },
	    direccion: { type: String, required: false },
	    localidad: { type: String, required: false },
	    telefono: { type: Number, required: false },
	    postal: { type: Number, required: false },
	    comentario: { type: String, required: false },
	    numero: { type: String, required: false },
	    cuota: { type: Number, required: false }
	});

    return mongoose.model('Client', Client);
};