/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");

describe("Mora Beauty MVP — Testes Unitários e de Integração", () => {
  let app;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    jest.resetModules();
    app = require("./script.js");
  });

  describe("Testes Unitários — Utilitários e Formatação", () => {
    test("Deve formatar valores monetários corretamente no padrão BRL", () => {
      expect(app.formatarMoeda(19.9)).toBe("R$\u00a019,90");
      expect(app.formatarMoeda(39.8)).toBe("R$\u00a039,80");
    });

    test("Deve formatar o número sequencial do pedido com 4 dígitos", () => {
      expect(app.formatarNumeroPedido(1)).toBe("#0001");
      expect(app.formatarNumeroPedido(25)).toBe("#0025");
    });
  });

  describe("Testes de Integração — Fluxo de Pedido e Atualização de Estoque", () => {
    test("Deve registrar um novo pedido com sucesso, atualizar a Tela 3 e abater o estoque", () => {
      const btnNovoPedido = document.querySelector("#screen-result .btn-primary");
      btnNovoPedido.click();

      expect(document.getElementById("screen-form").classList.contains("hidden")).toBe(false);

      document.getElementById("cliente").value = "Maria Silva";
      document.getElementById("produto").value = "gloss";
      document.getElementById("quantidade").value = "3";

      const form = document.getElementById("order-form");
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

      expect(document.getElementById("screen-result").classList.contains("hidden")).toBe(false);
      expect(document.getElementById("res-numero").textContent).toBe("#0002");
      expect(document.getElementById("res-cliente").textContent).toBe("Maria Silva");
      expect(document.getElementById("res-subtotal").textContent).toBe("R$\u00a059,70");
      expect(document.getElementById("res-stock-atual").textContent).toBe("7");
      expect(document.getElementById("res-stock-anterior").textContent).toBe("(Anterior: 10 unidades)");
    });

    test("Deve bloquear o pedido e exibir alerta acessível quando a quantidade exceder o estoque", () => {
      const btnNovoPedido = document.querySelector("#screen-result .btn-primary");
      btnNovoPedido.click();

      document.getElementById("produto").value = "gloss";
      document.getElementById("quantidade").value = "50";

      const form = document.getElementById("order-form");
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

      const alertaErro = document.getElementById("alert-error");
      expect(alertaErro.classList.contains("hidden")).toBe(false);
      expect(alertaErro.textContent).toContain("Estoque insuficiente");
      expect(app.catalogo.gloss.estoque).toBe(10);
    });
  });
});
