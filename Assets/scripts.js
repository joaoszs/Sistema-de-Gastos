document.addEventListener('DOMContentLoaded', function() {
    class Despesa {
        constructor(descricao, valor, categoria) {
            this.descricao = descricao;
            this.valor = valor;
            this.categoria = categoria;
        }
    }

    class SistemaGastos {
        constructor() {
            this.despesas = [];
            this.formularioDespesa = document.getElementById('formulario-despesa');
            this.listaDespesas = document.getElementById('lista-despesas');
            this.campoBusca = document.getElementById('campo-busca');
            this.botaoBuscar = document.getElementById('button');
            if(this.botaoBuscar) {
                this.botaoBuscar.addEventListener('click', this.buscarDespesa.bind(this));
            }
        }

        adicionarDespesa(descricao, valor, categoria) {
            const novaDespesa = new Despesa(descricao, valor, categoria);
            this.despesas.push(novaDespesa);
            this.renderizarDespesas();
        }

        renderizarDespesas(despesasParaMostrar = this.despesas) {
            this.listaDespesas.innerHTML = '';
            despesasParaMostrar.forEach((despesa, indice) => {
                const itemLista = document.createElement('div');
                itemLista.innerHTML = `
                    <p>Descrição: ${despesa.descricao}</p>
                    <p>Valor: ${despesa.valor}</p>
                    <p>Categoria: ${despesa.categoria}</p>
                    <button class="editar" data-indice="${indice}">Editar</button>
                    <button class="apagar" data-indice="${indice}">Apagar</button>
                `;
                this.listaDespesas.appendChild(itemLista);
            });
        }

        buscarDespesa() {
            const termoBusca = this.campoBusca.value.trim().toLowerCase();
            const despesasFiltradas = this.despesas.filter(despesa =>
                Object.values(despesa).some(valor => String(valor).toLowerCase().includes(termoBusca))
            );
            this.renderizarDespesas(despesasFiltradas);
        }

        handleSubmit(evento) {
            evento.preventDefault();
            const descricao = this.formularioDespesa.querySelector('#descricao-despesa').value;
            const valor = this.formularioDespesa.querySelector('#valor-despesa').value;
            const categoria = this.formularioDespesa.querySelector('#categoria-despesa').value;
            this.adicionarDespesa(descricao, valor, categoria);
            this.formularioDespesa.reset();
        }

        apagarDespesa(indice) {
            this.despesas.splice(indice, 1);
            this.renderizarDespesas();
        }

        editarDespesa(indice) {
            const descricaoNova = prompt('Digite a nova descrição:');
            const valorNovo = prompt('Digite o novo valor: (Somente Numeros)');
            const categoriaNova = prompt('Digite a nova categoria: (Alimentação,Transporte,Moradia, Lazer.)');
            if (descricaoNova !== null && valorNovo !== null && categoriaNova !== null) {
                this.despesas[indice] = new Despesa(descricaoNova, valorNovo, categoriaNova);
                this.renderizarDespesas();
            }
        }

        iniciar() {
            this.formularioDespesa.addEventListener('submit', this.handleSubmit.bind(this));
            this.renderizarDespesas();
            this.listaDespesas.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('editar')) {
                    const indice = parseInt(target.dataset.indice);
                    this.editarDespesa(indice);
                } else if (target.classList.contains('apagar')) {
                    const indice = parseInt(target.dataset.indice);
                    this.apagarDespesa(indice);
                }
            });
        }
    }

    const sistemaGastos = new SistemaGastos();
    sistemaGastos.iniciar();
    
});