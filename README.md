# 🌸 Mora Beauty — Gestão de Pedidos e Estoque (MVP)

>  Sistema web administrativo desenvolvido para simplificar o registro de pedidos e automatizar a atualização de estoque da **Mora Beauty**.

---

## 📋 Sobre o Projeto

Este repositório contém o **Produto Mínimo Viável (MVP)** da aplicação administrativa da **Mora Beauty**. O sistema resolve o fluxo central de vendas da operação: registrar pedidos de clientes, validar a disponibilidade de itens e atualizar o saldo de estoque em tempo real, oferecendo ao administrador uma tela clara de conferência pós-transação.

### 🎯 Objetivo e Público-Alvo
- **Quem utiliza:** Responsável pela administração da Mora Beauty.
- **Problema resolvido:** Evitar falhas manuais na baixa de produtos, prevenir vendas sem estoque disponível e agilizar a conferência de valores e status de pedidos.

---

## 🚀 Funcionalidades Implementadas no MVP

1. **Registro de Pedidos (Fluxo de Entrada):**
   - Seleção de cliente, produto e quantidade desejada.
   - Cálculo automático do subtotal com base no preço unitário.
   - Validação de estoque em tempo real antes da confirmação.

2. **Tratamento de Exceção (Alerta de Estoque Insuficiente):**
   - Caso a quantidade solicitada ultrapasse o saldo disponível, o sistema bloqueia o registro e exibe um alerta explicativo orientando a correção no formulário.

3. **Confirmação, Resultados e Estoque Atualizado (Tela 3):**
   - **Banner de Sucesso:** Confirmação visual e textual (*"Pedido registrado com sucesso!"*).
   - **Detalhes do Pedido:** Exibição do número sequencial (`#0001`), nome do cliente, produto, quantidade, preço unitário, subtotal e status (`Pendente`).
   - **Quadro Estoque Atualizado:** Apresentação imediata da quantidade disponível após a venda, comparada ao saldo anterior.
   - **Navegação de Continuidade:** Ações diretas para iniciar um **Novo Pedido** ou **Voltar ao Menu**.

---

## ♿ Acessibilidade e Alinhamento aos ODS

A interface foi projetada seguindo boas práticas de design inclusivo:
- **Redundância Semântica (Cor + Símbolo + Texto):** Nenhum alerta ou estado depende exclusivamente de cores. O sucesso combina fundo verde, ícone de visto (`✓`) e texto explícito; o status **Pendente** associa destaque amarelo-âmbar, ícone de relógio (`🕒`) e rótulo textual; erros utilizam ícone de alerta (`⚠️`) e atributos ARIA (`role="alert"`).
- **Legibilidade e Usabilidade:** Paleta com alto contraste entre texto e fundo, botões com rótulos objetivos e áreas de toque mínimas de `46px` de altura.
- **Impacto e ODS:** Ao reduzir a sobrecarga cognitiva e eliminar
