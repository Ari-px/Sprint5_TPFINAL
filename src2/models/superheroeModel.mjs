import mongoose from "mongoose";

const superheroeSchema = new mongoose.Schema({
  nombreSuperheroe: {
    type: String,
    required: [true, "El nombre del superhéroe es obligatorio"],
    trim: true,
    minlength: [3, "El nombre del superhéroe debe tener al menos 3 caracteres"],
    maxlength: [60, "El nombre del superhéroe no puede superar los 60 caracteres"],
    validate: {
      validator: function (valor) {
        // Verifica que no sea solo espacios
        return valor.trim().length >= 3;
      },
      message: "El nombre del superhéroe no puede estar vacío ni tener menos de 3 caracteres válidos",
    },
  },

  nombreReal: {
    type: String,
    required: [true, "El nombre real es obligatorio"],
    trim: true,
    minlength: [3, "El nombre real debe tener al menos 3 caracteres"],
    maxlength: [60, "El nombre real no puede superar los 60 caracteres"],
    validate: {
      validator: function (valor) {
        return valor.trim().length >= 3;
      },
      message: "El nombre real no puede estar vacío ni tener menos de 3 caracteres válidos",
    },
  },

  edad: {
    type: Number,
    required: [true, "La edad es obligatoria"],
    min: [0, "La edad no puede ser negativa"],
    validate: {
      validator: function (valor) {
        // Verifica que sea número y no un string con espacios
        return typeof valor === "number" && !isNaN(valor);
      },
      message: "La edad debe ser un número válido",
    },
  },

  poderes: {
    type: [String],
    required: [true, "Debe tener al menos un poder"],
    validate: {
      validator: function (arr) {
        // Debe ser un array no vacío
        if (!Array.isArray(arr) || arr.length === 0) return false;

        // Cada elemento debe cumplir las validaciones
        return arr.every(
          (poder) =>
            typeof poder === "string" &&
            poder.trim().length >= 3 &&
            poder.trim().length <= 60
        );
      },
      message:
        "Cada poder debe ser una cadena de texto entre 3 y 60 caracteres sin espacios vacíos",
    },
  },
});

const Superheroe = mongoose.model("Superheroe", superheroeSchema);

export default Superheroe; 