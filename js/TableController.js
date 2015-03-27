/* JavaScript Document */

var TableController = {

	table: null,

	setTable: function(table) {
		this.table = table;
	},

	addItem: function(item, editCallback, deleteCallback) {
		if(item) {
			var tbody = TableController.table.tBodies[0],
			    row = TableController.createNewRow(),
			    index = 0;
			
			row.cells[index++].innerHTML = item.despesa;
			row.cells[index++].innerHTML = item.valor;
                        row.cells[index++].innerHTML = item.tipo;
			TableController.createActions(row.cells[index++], item, editCallback, deleteCallback);                        
			tbody.appendChild(row);                        
		}                
	},

	addList: function(list, editCallback, deleteCallback) {
		if(list && list.length > 0) {
			for (var i = 0, leng = list.length; i < leng; i++) {
				TableController.addItem(list[i], editCallback, deleteCallback);
			}
		}
	},

	clearList: function() {
		TableController.table.tBodies[0].innerHTML = "";
	},
	
	createNewRow: function() {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		return row;
	},

	createActions: function(cell, item, editCallback, deleteCallback) {
		var editElement = document.createElement("span"),
		    deleteElement = document.createElement("span");

		editElement.innerHTML = "Edit ";
		editElement.setAttribute("data-despesa", item.despesa);
		editElement.className = "btn btn-success";

		deleteElement.innerHTML = "Delete";
		deleteElement.setAttribute("data-despesa", item.despesa);
		deleteElement.className = "btn btn-danger";

		if(editCallback) {
			editElement.onclick = function(){
				var despesa = editElement.getAttribute('data-despesa');
				editCallback(despesa);
			};
		}

		if(deleteCallback) {
			deleteElement.onclick = function(){
				var despesa = deleteElement.getAttribute('data-despesa');
				deleteCallback(despesa, deleteElement);
			};
		}

		cell.appendChild(editElement);
		cell.appendChild(deleteElement);
	}
};
