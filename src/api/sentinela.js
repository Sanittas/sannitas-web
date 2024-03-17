const sentinela = () => {
    if (sessionStorage.getItem("id") || sessionStorage.getItem("idEmpresa") == null) {
        window.location.href = "/";
      }
    };

export default sentinela;