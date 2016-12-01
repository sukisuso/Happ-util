
module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var User = new Schema({
	    user: { type: String, required: true, index: { unique: true } },
	    pasword: { type: String, required: true },
	    roles:{ type: [String], required:false},
        email: { type: String, required: true },
        dni: { type: String, required: false },
        direccion: { type: String, required: false },
        localidad: { type: String, required: false },
        telefono: { type: Number, required: false },
        postal: { type: Number, required: false },
        gestora:{ type: String, required: true },
        account: { type: String, required: false }
	});

    return mongoose.model('User', User);
};