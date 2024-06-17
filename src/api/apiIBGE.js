import axios from "axios";

const apiIBGE = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10&busca=cuidado&busca=domicilio&busca=saude",
});

export default apiIBGE;
