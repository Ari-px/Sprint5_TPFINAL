//https://restcountries.com/v3.1/region/america

import PaisRepository from '../repository/PaisRepository.mjs';

export const consumirApiExternaDePaises = async () => {
    console.log("En servicios - consumirApiExternaDePaises");
    const response = await fetch("https://restcountries.com/v3.1/region/america");
    let paisesRecibidos = await response.json();
    console.log(paisesRecibidos);
    return paisesRecibidos;
};

export const registrarPaisesAPI = async (listadoPaises) => {
    console.log("En servicios - registrarPaisesAPI");
    //console.log(listadoPaises);
    return await PaisRepository.registrarPaisesAPI(listadoPaises);
}

export const obtenerPaisPorId = async (id) => {
    console.log("En servicios - obtenerPaisPorId");
    return await PaisRepository.obtenerPaisPorId(id);
}

export const obtenerTodosLosPaises = async () => {
    console.log("En servicios - obtenerTodosLosPaises");
    return await PaisRepository.obtenerTodosLosPaises();
}

export const crearNuevoPais = async (datosPais) => {
    console.log("En servicios - crearNuevoPais");
    return await PaisRepository.crearNuevoPais(datosPais);
}

export const actualizarPais = async (id, datosPais) => {
    console.log("En servicios - actualizarPais");
    return await PaisRepository.actualizarPais(id, datosPais);
}

export const eliminarPaisPorID = async (id) => {
    console.log("En servicios - crearNuevoPais");
    return await PaisRepository.eliminarPaisPorID(id);
}