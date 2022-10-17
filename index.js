const imputBusqueda = document.querySelector('#imput-Busqueda');
const infoBusqueda = document.querySelector('#info-Busqueda');
let countries = [];

const getcountries = async () => {
    countries = await (await fetch(`https://restcountries.com/v3.1/all`, {method: 'GET'})).json();
}
getcountries();


const menorde10 = (filteredCountries) => {

    // console.log(filteredCountries);
    filteredCountries.forEach(countries => {
        const elemento = document.createElement('div')
        elemento.innerHTML=`
        <div>
            <p>Nombre: ${countries.name.common}</p>
            <img src="${countries.flags.svg}">
        </div>
        `
        // console.log(elemento);
        infoBusqueda.appendChild(elemento);


    })
};


imputBusqueda.addEventListener('input', e => {
    
    // e.preventDefault();
    // infoBusqueda.innerHTML= `<div class="loader"></div>`


    const filteredCountries = countries.filter(element => element.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()));
    // console.log(filteredCountries);

    if (filteredCountries.length > 10 && filteredCountries.length < countries.length ){
        infoBusqueda.innerHTML = `
        <p> Especifica tu Busquedad </p>
        `;

    } else if (!filteredCountries.length) {
        infoBusqueda.innerHTML = `
        <p> Ingrese un nombre de país válido </p>
        `
    } else if (filteredCountries.length < 10 && filteredCountries.length !== 1){
        menorde10(filteredCountries);

    } else if (filteredCountries.length = 1){
        infoBusqueda.innerHTML =`
        <img src="${ filteredCountries[0].flags.svg}">
        <p>Nombre: ${filteredCountries[0].name.common}</p>
        <p>Capital: ${filteredCountries[0].capital[0]}</p>
        <p>Region: ${filteredCountries[0].region}</p>
        <p>Poblacion: ${filteredCountries[0].population}</p>
        `
        
    }  else{
        infoBusqueda.innerHTML = '';
    }

});


