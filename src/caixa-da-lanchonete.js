class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            'cafe': { descricao: 'Café', valor: 3.00 },
            'chantily': { descricao: 'Chantily (extra do cafe)', valor: 1.50 },
            'suco': { descricao: 'Suco Natural', valor: 6.20 },
            'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
            'queijo': { descricao: 'Queijo (extra do sanduiche)', valor: 2.00 },
            'salgado': { descricao: 'Salgado', valor: 7.25 },
            'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };
    }
  
    calcularValorDaCompra(formaPagamento, itens) {
      // Validações
        if (!['debito', 'credito', 'dinheiro'].includes(formaPagamento)) {
            return "Forma de pagamento inválida!";
        }
  
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
  
        let total = 0;
        const quantidadesItens = {};
  
        for (const itemStr of itens) {
            const [codigoItem, quantidade] = itemStr.split(',');
            if (!(codigoItem in this.cardapio)) {
                return "Item inválido!";
            }

            const quantidadeParseada = parseInt(quantidade);

            if (quantidadeParseada <= 0) {
                return "Quantidade inválida!";
            }

            if (!(codigoItem in quantidadesItens)) {
                quantidadesItens[codigoItem] = 0;
            }
            quantidadesItens[codigoItem] += quantidadeParseada;

            const infoItem = this.cardapio[codigoItem];
            total += infoItem.valor * quantidadeParseada;
        }
  
        // Aplicar desconto para pagamento em dinheiro
        if (formaPagamento === 'dinheiro') {
            total *= 0.95;
        }

        // Verificar a validade dos itens
        for (const codigoItem in quantidadesItens) {
            
        if (this.cardapio[codigoItem].descricao.includes('extra')) {

            if (
                quantidadesItens[this.cardapio[codigoItem].descricao.replace('(extra do', '').replace(')','').split(' ')[2]] === 0 ||
                !quantidadesItens[this.cardapio[codigoItem].descricao.replace('(extra do', '').replace(')','').split(' ')[2]]
            ) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }
    }
        // Aplicar acréscimo para pagamento a crédito
        if (formaPagamento === 'credito') {
            total *= 1.03;
        }

        // Formatar o valor
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }
  
  export default CaixaDaLanchonete;