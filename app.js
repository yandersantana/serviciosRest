var http     = require('http'),
	express  = require('express'),
	parser   = require('body-parser');


const pg = require('pg');
pg.defaults.ssl=true;
var conString = "postgres:postgres:postgres@localhost:5432/GoldTales";

var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8080);




app.get('/cargarCuentos', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM Stories', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});



app.get('/cargarCuentosPorId/:id', (req, res, next) => {
    var id = req.params.id;
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM Stories where user_id= '+id,function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});



app.get('/cargarImagenesPorCuento/:id', (req, res, next) => {
    var id = req.params.id;
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM imagens where stories_id= '+id,function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});


app.get('/cargarImagenes', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM imagens', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});


app.get('/cargarAudios', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM audios', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});


app.get('/cargarPreguntas', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM questions', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});


app.get('/cargarPreguntasPorCuento/:id', (req, res, next) => {
    var id = req.params.id;
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM questions where stories_id= '+id,function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            //console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});


app.get('/usuarios', (req, res, next) => {
    var id = req.params.id;
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM users', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            //console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});


app.post('/crearCuento', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  stories  (title,  description ,  credits ,  user_id) VALUES ('" + req.body.titulo + "', '" + req.body.descripcion + "', '" + req.body.credito + "', 1);", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);

        });

    });

});


app.post('/insertarImagen', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  imagens  (src,  stories_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
        });

    });


});


app.post('/insertarAudio', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  audios  (src ,  stories_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});




app.delete('/eliminarImagenesCuento/:id', (req, res) => {
    var client = new pg.Client(conString);
     var id = req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM imagens WHERE stories_id=' + id + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});


app.delete('/eliminarAudiosCuento/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM audios WHERE stories_id=' +id + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});





app.put('/actualizarCuento/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE stories SET title='"+req.body.titulo+"', credits='"+req.body.credito+"', description='"+req.body.descripcion+"' WHERE id='" + id + "';",function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});



app.put('/actualizarImagen/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE imagens SET src='"+req.body.src+"'where id='"+id+"';", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);


        });

    });


});



app.put('/actualizarPregunta/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE questions SET question='"+req.body.question+"', answer='"+req.body.answer+"'where stories_id='"+id+"';", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);


        });

    });


});













http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});
