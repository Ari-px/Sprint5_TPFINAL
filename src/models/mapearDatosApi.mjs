export const mapearPais = (pais) =>{
    console.log("En models - mapearPais");
    console.log("Datos previos al mapeo:", pais);

    let name = pais.name;
    console.log(name);

    let nombreComun = "";
    let nombreOficial = "";
    if('nativeName' in name && 'spa' in name.nativeName){
        //nombre comun
        nombreComun = name.nativeName.spa.common ? name.nativeName.spa.common : name.common;
        //nombre oficial
        nombreOficial = name.nativeName.spa.official ? name.nativeName.spa.official : name.official;
    } else {
        nombreComun = name.common;
        nombreOficial = name.official;
    }
    

    return {
        nombreComun,
        nombreOficial,
        capital: pais.capital[0],
        fronteras: pais.borders,
        area: pais.area,
        poblacion: pais.population,
        timezones: pais.timezones,
        creador: 'ESPECHE ARIANA DE JESÚS'
    };
}

export const mapearPaises = (paises) => {
    return paises.map(pais => mapearPais(pais));
}