const mascaraCpf = (e) => {
    let cpf = e;
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpf;
  };

  const mascaraCnpj = (e) => {
    let cnpj = e;
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.replace(/(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/(\d{3})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/(\d{3})(\d)/, "$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d{1,2})$/, "$1-$2");

    return cnpj;
  };

  const mascaraTelefone = (e) => {
    let telefone = e;
    telefone = telefone.replace(/\D/g, "");
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
    telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");

    return telefone;
  };

  export default { mascaraCpf, mascaraCnpj, mascaraTelefone };