// Data to mongo 26/10/2016

for(var i = 0; i < 150; i++){
	db.getCollection('clients').insert(
		{
		    "gestorId" : "580cda483687e72cdc55715e",
		    "name" : "client_",
		    "surname" : "suernames-i",
		    "type" : "Persona juridica",
		    "email" : "jesus@gmail.com",
		    "direccion" : "Felipe Valls 31 puerta 5",
		    "localidad" : "Valencia",
		    "telefono" : 9.63368e+008,
		    "postal" : 46035,
		    "comentario" : "TODO",
		    "numero" : "1",
		    "cuota" : 300.7500000000000000
		}
	);
}