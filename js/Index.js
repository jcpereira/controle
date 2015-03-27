/* JavaScript */

var Index = {
    init: function() {
        Index.setForm();
        Index.listControles();
    },
    setForm: function() {
        var form = document.getElementById('fb-controle');
        if (form) {
            form.onsubmit = function() {
                Index.saveControle(form);
                Relatorio.drawChart();
                return false;

            };
        }
    },
    saveControle: function(form) {
        var controle = {};
        controle.despesa = form.despesa.value;
        controle.valor = form.valor.value;
        controle.tipo = form.tipo.value;

        if (ControleDAO.save(controle) == ControleDAO.NEW) {
            TableController.addItem(controle, Index.edit, Index.delete);
        }
        else {
            ControleDAO.serializeAndSave();
            TableController.clearList();
            Index.listControles();
        }

        form.despesa.value = form.valor.value = "";
    },
    setTable: function() {
        var table = document.getElementById('tb-controle');
        TableController.setTable(table);
    },
    listControles: function() {
        Index.setTable();
        var controleList = ControleDAO.retrieve();
        if (controleList && controleList.length) {
            TableController.addList(controleList, Index.edit, Index.delete);
        }
    },
    edit: function(despesa) {
        if (confirm("Você vai editar " + despesa)) {
            var controle = ControleDAO.get(despesa);
            if (controle) {
                var form = document.getElementById('fb-controle');
                form.despesa.value = controle.despesa;
                form.valor.value = controle.valor;
                form.tipo.value = controle.tipo;
            }
        }
    },
    delete: function(despesa, element) {
        if (confirm("Você vai deletar " + despesa)) {
            var controle = ControleDAO.get(despesa);
            if (controle) {
                if (ControleDAO.delete(despesa)) {
                    var row = element.parentNode.parentNode;
                    row.parentNode.removeChild(row);
                    ControleDAO.serializeAndSave();                    
                    Relatorio.drawChart();
                }
            }            
        }
    }
};

//initialization
ControleDAO.unserializeAndParse();
Index.init();