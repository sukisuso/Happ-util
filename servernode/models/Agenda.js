module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Agenda = new Schema({
		gestorId: { type: String, required: true },
		vacaciones: { type: String, required: true },
	    title: { type: String, required: true },
	    start: { type: Date, required: true },
	    end: { type: Date, required: true },
	});

    return mongoose.model('Agenda', Agenda);
};