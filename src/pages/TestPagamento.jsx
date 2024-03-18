import React from "react";

import { loadMercadoPago } from "@mercadopago/sdk-js";


await loadMercadoPago();
const mp = new window.MercadoPago("TEST-2276921b-bae1-47b1-b05e-82c9e6b3b019_KEY");


function TestPagamento() {

    
  (async function getIdentificationTypes() {
    try {
      const identificationTypes = await mp.getIdentificationTypes();
      const identificationTypeElement = document.getElementById(
        "form-checkout__identificationType"
      );

      createSelectOptions(identificationTypeElement, identificationTypes);
    } catch (e) {
      return console.error("Error getting identificationTypes: ", e);
    }
  })();

  function createSelectOptions(
    elem,
    options,
    labelsAndKeys = { label: "name", value: "id" }
  ) {
    const { label, value } = labelsAndKeys;

    elem.options.length = 0;

    const tempOptions = document.createDocumentFragment();

    options.forEach((option) => {
      const optValue = option[value];
      const optLabel = option[label];

      const opt = document.createElement("option");
      opt.value = optValue;
      opt.textContent = optLabel;

      tempOptions.appendChild(opt);
    });

    elem.appendChild(tempOptions);
  }

  return (
    <form id="form-checkout" action="/process_payment" method="post">
      <div>
        <div>
          <label for="payerFirstName">Nome</label>
          <input
            id="form-checkout__payerFirstName"
            name="payerFirstName"
            type="text"
          />
        </div>
        <div>
          <label for="payerLastName">Sobrenome</label>
          <input
            id="form-checkout__payerLastName"
            name="payerLastName"
            type="text"
          />
        </div>
        <div>
          <label for="email">E-mail</label>
          <input id="form-checkout__email" name="email" type="text" />
        </div>
        <div>
          <label for="identificationType">Tipo de documento</label>
          <select
            id="form-checkout__identificationType"
            name="identificationType"
            type="text"
          ></select>
        </div>
        <div>
          <label for="identificationNumber">Número do documento</label>
          <input
            id="form-checkout__identificationNumber"
            name="identificationNumber"
            type="text"
          />
        </div>
      </div>

      <div>
        <div>
          <input
            type="hidden"
            name="transactionAmount"
            id="transactionAmount"
            value="100"
          />
          <input
            type="hidden"
            name="description"
            id="description"
            value="Nome do Produto"
          />
          <br />
          <button type="submit">Pagar</button>
        </div>
      </div>
    </form>
  );
}

export default TestPagamento;
