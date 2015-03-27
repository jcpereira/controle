/* JavaScript Document */

var ControleDAO = {
    DB_KEY: "teste",
    NEW: 1,
    UPDATE: 2,
    list: [],
    save: function(controle, tableController) {
        var list = ControleDAO.list,
                index = ControleDAO.getIndex(controle);

        if (index > -1) {
            list[index] = controle;
            return ControleDAO.UPDATE;
        }
        else {
            list.push(controle);
            if (tableController) {
                tableController.addItem(controle);
            }
        }

        ControleDAO.serializeAndSave();

        return ControleDAO.NEW;
    },
    retrieve: function() {
        var list = ControleDAO.list;
        if (list && list.length > 0) {
            return list;
        }
        return null;
    },
    get: function(despesa) {
        var list = ControleDAO.list,
                index = ControleDAO.getIndex({'despesa': despesa});

        if (index > -1) {
            var controle = list[index];
            return controle;
        }

        return null;
    },
    getIndex: function(controle) {
        var list = ControleDAO.list,
                item = {};

        for (var i = 0; i < list.length; i++) {
            item = list[i];
            if (item.despesa == controle.despesa) {
                return i;
            }
        }

        return -1;
    },
    delete: function(despesa) {
        var list = ControleDAO.list,
                index = ControleDAO.getIndex({'despesa': despesa});

        if (index > -1) {
            //https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice
            list.splice(index, 1);
            return true;
        }

        return false;
    },
    serializeAndSave: function() {
        var list = ControleDAO.list;
        var json = JSON.stringify(ControleDAO.list);
        window.localStorage.setItem(ControleDAO.DB_KEY, json);
    },
    unserializeAndParse: function() {
        var json = window.localStorage.getItem(ControleDAO.DB_KEY);
        if (json) {
            ControleDAO.list = JSON.parse(json);
        }
        else {
            ControleDAO.list = [];
        }
    }
};
