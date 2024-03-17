const sentinela = () => {
  if (sessionStorage.getItem("id") === null && sessionStorage.getItem("idEmpresa") === null) {
    window.location.href = "/login";
  }
    };

export default sentinela;