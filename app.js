const express = require('express'); //requerir express
const mongoose = require('mongoose'); //requerir mongoose
const app = express(); //ejecutar express
const port = 3004; //crear un puerto
app.use(express.json()) //Poder utilizar formato JSON
const cors = require('cors') //Libreria para permitir conexiones a la API
const faker = require('faker');



app.use(cors());

async function main() {
    //Conectando con la base de datos 
    await mongoose.connect("mongodb://127.0.0.1:27017/finalproject");
}

//Ejecutamos la conexion a la base de datos y en caso de error
//se imprime un mensaje
main().catch((err) => {console.log(err)});

//Estructura de productos
const productsSchema = new mongoose.Schema({
    Imagen: {
        type: String,
        required: true,
        maxLength: 100,
    },

    Nombre: {
        type: String,
        required: true,
        maxLength: 100,
        match: /^[a-zA-Z\s]*$/
    },

    Precio: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
        match: /^[0-9]*$/,
        maxLength: 20,
        validate: {
          validator: function(value) {
            return Number.isFinite(value);
          },
          message: "{VALUE} no es un número"
        }
    },

    Discounted_Price: { 
        type: Number,
        required: true,
        min: 0,
        default: 0,
        match: /^[0-9]*$/,
        maxLength: 20,
    },

    Precio_Descuento: {
        type: Number,
        default: 0,
        min: 0.1,
        max: 1,
        maxLength: 20,
    },

    Tipo_Producto: {
        type: String,
        match: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/,
        maxLength: 20,
    },

    Existencias: {
        type: Number,
        maxLength: 50,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} no es un número entero",
        }
    },

}, { timestamps: true });

//productsSchema.methods.precio_Descuento = function() {
//    const descuento = this.Precio * this.Precio_Descuento;
//    return (this.Precio - descuento).toFixed(2)
//  };

//Crear la coleccion en la BD
const Products = mongoose.model("Products", productsSchema);


//Estructura de usuarios
const usersSchema  = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
        maxLength: 40,
        match: /^[a-zA-Z\s]*$/
    },

    Apellido: {
        type: String,
        required: true,
        maxLength: 40,
        match: /^[a-zA-Z\s]*$/
    },
    
    Usuario: {
        type: String,
        maxLength: 40,
        unique: true
    },

    Correo: {
        type: String,
        required: true,
        maxLength: 100,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },

    Contraseña: {
        type: String,
        maxLength: 40,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*\-!.])[a-zA-Z0-9*\-!.]{8,40}$/
    }
   
}, { timestamps: true });

//Crear la coleccion en la BD
const Users = mongoose.model("Users", usersSchema);

const rolSchema  = new mongoose.Schema({
    Id_User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clients'
    },
    rol: {
        type: String,
        match: /^[a-zA-Z\s]+$/
    }
}, {timestamps: true})

//Crear la coleccion en la BD
const Rol = mongoose.model("Rol", rolSchema);

const clientsSchema  = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
        maxLength: 40,
        match: /^[a-zA-Z\s]*$/
    },

    Apellido: {
        type: String,
        required: true,
        maxLength: 40,
        match: /^[a-zA-Z\s]*$/
    },

    Cedula: {
        type: Number,
        required: true,
        match: /^[0-9]*$/
    },

    Telefono: {
        type: String,
        required: true,
        maxLength: 20,
        match: /^[0-9+\s]+$/
    },

    Correo: {
        type: String,
        required: true,
        maxLength: 100,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },

}, {timestamps: true})

//crear la coleccion en la bd
const Clients = mongoose.model("Clients", clientsSchema);

const compraSchema  = new mongoose.Schema({
    Id_Client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clients'
    },
    Compras: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    Costo: {
        type: Number,
        default: 0,
        min: 0,
        match: /^[0-9]*$/,
        maxLength: 20,
        validate: {
          validator: function(value) {
            return Number.isFinite(value);
          },
          message: "{VALUE} no es un número"
        }
    },
    IVA: {
        type: Number,
        default: 1.16,
        match: /^[0-9]*$/,
        maxLength: 20,
        validate: {
          validator: function(value) {
            return Number.isFinite(value);
          },
          message: "{VALUE} no es un número"
        }
    }
}, {timestamps: true})

const Compra = mongoose.model("Compra", compraSchema);

/*productsSchema.methods.reduceExistencias = async function(cantidad) {
    if (this.Existencias < cantidad) {
      throw new Error(`No hay suficientes existencias de ${this.Nombre}`);
    }
    this.Existencias -= cantidad;
    await this.save();
  }*/


//Rutas para las cosas

//Rutas de usuarios 
//Registrarse
app.post('/signup', async (req, res) => {
  const { Nombre, Apellido, Usuario, Correo, Contraseña } = req.body;
  try {
    // Ver si el usuario ya existe
    const alreadyUser = await Users.findOne({ Correo });
    if (alreadyUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    } else {
    // Crear el usuario
    const newUser = new Users({ Nombre, Apellido, Usuario, Correo, Contraseña });
    await newUser.save();
    };

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//iniciar sesión
app.post('/iniciarS', async (req, res) => {
  const { Correo, Contraseña } = req.body;
  try {
    const user = await Users.findOne({ Correo });
    if (!user) {
      return res.status(400).json({ message: 'Correo invalido' });
    };

    if (Contraseña !== user.Contraseña) {
      return res.status(400).json({ message: 'Contraseña invalida' });
    };

    if (user && Contraseña == user.Contraseña) {
      res.json(user);
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error' });
  }
});

//rutas de compras
app.post('/compras', async (req, res) => {
    const compra = new Compra(req.body);
    try {
      await compra.save();
      res.status(201).send(compra);
    } catch (error) {
      res.status(400).send(error);
    }
  });

//Invoke-WebRequest -Method POST http://localhost:3004/productos
//Crear productos falsos con faker
app.post('/productos', async (req, res) => {
    try {
        for (let i = 0; i < 10; i++) {
            const product = new Products({
                Imagen: faker.image.image(),
                Nombre: faker.commerce.productName(),
                Precio: faker.datatype.number({min: 1, max: 5000}) * 1.16,
                Precio_Descuento: faker.datatype.number({min: 1, max: 10}) / 10,
                Tipo_Producto: faker.random.arrayElement(['Digital', 'Físico']),
                Existencias: faker.datatype.number({ min: 0, max: 1000 }),
            });
            
            const descuento = product.Precio * product.Precio_Descuento;
            product.Discounted_Price = (product.Precio - descuento).toFixed(2);

        await product.save();
        res.status(201).json({message: 'Producto creado exitosamente.'});
    }} catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al crear producto.'});
    }
});

//ver clientes
app.get('/clients', async (req, res) => {
  try{
      const clientes = await Clients.find();
      res.send(clientes);
  } catch (error) {
      console.error(error)
  }
});

//clientes individuales
app.get("/clients/:_id", async (req, res) => {
  try{
      const clients = await Clients.findOne({_id: req.params._id});
      res.send(clients);  
  } catch (error) {
      console.error(error);
  }
});

//borrar cliente
app.delete("/client/:_id", async (req, res) => {
  try{
    const deleted = await Clients.deleteOne({_id: req.params._id});
    res.send(deleted);
  } catch (error) {
      console.error(error);
    }
})

//buscar clientes
app.get('/buscadorc', async (req, res) => {
  try {
    const { query, limit } = req.query;
    const clients = await Clients.find({
      Nombre: {$regex: new RegExp(query, 'i')},
    }).limit(parseInt(limit));
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//actualizar clientes
app.patch("/actc/:_id", async (req, res) => {
  try {
    const updatedC = await Clients.updateOne({_id: req.params._id}, {$set: req.body});
    res.status(200).send(updatedC);
  } catch (error) {
    console.error(error);
  }
});

//crear cliente
app.post('/makeC', async (req, res) => {
  const { Nombre, Apellido, Cedula, Telefono, Correo } = req.body;
  try {
    const newClient = new Clients({ Nombre, Apellido, Cedula, Telefono, Correo });
    await newClient.save();
  } catch (error) {
    console.error(error);
  }
});

//compras
app.get('/compras', async (req, res) => {
  try{
      const compras = await Compra.find();
      res.send(compras)
  } catch (error) {
      console.error(error)
  }
})

//compras individuales
app.get("/compras/:_id", async (req, res) => {
  try{
      const compra = await Compra.findOne({_id: req.params._id});
      res.send(compra);  
  } catch (error) {
      console.error(error);
  }
});

//actualizar compras
app.patch("/actcompras/:_id", async (req, res) => {
  try {
    const updatedCompra = await Compra.updateOne({_id: req.params._id}, {$set: req.body});
    res.status(200).send(updatedCompra);
  } catch (error) {
    console.error(error);
  }
});

//crear ccompra
app.post('/makecompra', async (req, res) => {
  const { Id_Client, Compras, Costo } = req.body;
  try {
    const newCompra = new Compra({ Id_Client, Compras, Costo  });
    await newCompra.save();
  } catch (error) {
    console.error(error);
  }
});

  //buscar compra
  app.get('/buscadorcompras', async (req, res) => {
    try {
      const { query, limit } = req.query;
      const compras = await Compra.find({
        Id_Client: {
          $in: await Clients.find({
            Nombre: { $regex: new RegExp(query, 'i') },
          }).distinct('_id'),
        },
      }).limit(parseInt(limit));
      res.json(compras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//borrar producto
app.delete("/compra/:_id", async (req, res) => {
  try{
    const deleted = await Compra.deleteOne({_id: req.params._id});
    res.send(deleted);
  } catch (error) {
      console.error(error);
    }
})

//productos
app.get('/products', async (req, res) => {
    try{
        const products = await Products.find();
        res.send(products)
    } catch (error) {
        console.error(error)
    }
})

//productos individuales
app.get("/products/:_id", async (req, res) => {
    try{
        const producto = await Products.findOne({_id: req.params._id});
        res.send(producto);  
    } catch (error) {
        console.error(error);
    }
});

//borrar producto
app.delete("/producto/:_id", async (req, res) => {
  try{
    const deleted = await Products.deleteOne({_id: req.params._id});
    res.send(deleted);
  } catch (error) {
      console.error(error);
    }
})

//crear producto
app.post('/makeP', async (req, res) => {
  const { Imagen, Nombre, Precio, Discounted_Price, Precio_Descuento, Tipo_Producto, Existencias } = req.body;
  try {
    const newProduct = new Products({ Imagen, Nombre, Precio, Discounted_Price, Precio_Descuento, Tipo_Producto, Existencias });
    newProduct.Precio_Descuento = newProduct.Precio_Descuento / 100;
    const descuento = newProduct.Precio * newProduct.Precio_Descuento;
    {descuento === 0 ? newProduct.Discounted_Price = newProduct.Precio.toFixed(2) : newProduct.Discounted_Price = (newProduct.Precio - descuento).toFixed(2)};
    await newProduct.save();
  } catch (error) {
    console.error(error);
  }
});

//ruta de compras
app.post('/products/:_id', async (req, res) => {
    try {
      const { Nombre, Apellido, Cedula, Telefono, Correo } = req.body;
      const newClient = new Clients({ Nombre, Apellido, Cedula, Telefono, Correo });
      await newClient.save();
      
      const { Id_Client, Compras, Costo, IVA } = req.body;
      const newCompra = new Compra({ Id_Client: newClient._id, Compras, Costo, IVA });
      newCompra.Costo = (newCompra.Costo * 1.16).toFixed(2);
      await newCompra.save();
      res.status(201);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ha ocurrido un error' });
    }
  });

  //actualizar un producto
  app.patch("/actp/:_id", async (req, res) => {
    const { Imagen, Nombre, Precio, Discounted_Price, Precio_Descuento, Tipo_Producto, Existencias } = req.body;
    try {
      const actProduct = ({ Imagen, Nombre, Precio, Discounted_Price, Precio_Descuento, Tipo_Producto, Existencias });

      if (actProduct.Precio_Descuento && !actProduct.Precio) {
        const product = await Products.findOne({_id: req.params._id});
        actProduct.Precio_Descuento = actProduct.Precio_Descuento / 100;
        const newPrice = product.Precio * actProduct.Precio_Descuento;
        actProduct.Discounted_Price = newPrice === 0 ? product.Precio.toFixed(2) : product.Precio - newPrice;
      };

      if (actProduct.Precio && !actProduct.Precio_Descuento) {
        const product = await Products.findOne({_id: req.params._id});
        const precio = actProduct.Precio;
        const procentaje = product.Precio_Descuento / 100;
        const newPrice = precio * procentaje;
        newPrice === 0 ? actProduct.Discounted_Price = precio.toFixed(2) : actProduct.Discounted_Price = (precio - newPrice).toFixed(2);
        //actProduct.Discounted_Price = (precio - newPrice).toFixed(2);
      };

      if (actProduct.Precio && actProduct.Precio_Descuento) {
        const precio = actProduct.Precio;
        actProduct.Precio_Descuento = actProduct.Precio_Descuento / 100;
        const newPrice =  precio * actProduct.Precio_Descuento;
        newPrice === 0 ? actProduct.Discounted_Price = precio.toFixed(2) : actProduct.Discounted_Price = (precio - newPrice).toFixed(2);
        //actProduct.Discounted_Price = (precio - newPrice).toFixed(2);
      }
      
      const updatedP = await Products.findOneAndUpdate({_id: req.params._id}, { $set: actProduct });
      res.status(200).send(updatedP);
    } catch (error) {
      console.error(error);
    }
  });

  //reducir existencias
  app.patch('/product/:_id', async (req, res) => {
    try {
      const product = await Products.updateOne(
        {_id: req.params._id}, req.body);
        res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("error del servidor")
    }});

  //buscar productos
  app.get('/buscador', async (req, res) => {
    try {
      const { query, limit } = req.query;
      const products = await Products.find({
        Nombre: {$regex: new RegExp(query, 'i')},
      }).limit(parseInt(limit));
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//escucho al puerto que cree
app.listen(port, () => {
    console.log('Mi port ' + port);
});
