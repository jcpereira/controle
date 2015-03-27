// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Função q carrega os dados e desenha o grafico em pizza 

function drawChart() {

    var list = ControleDAO.list;
    item = {};

    var casa = 0, escritorio = 0, transporte = 0, alimentacao = 0;
    for (i = 0; i < list.length; i++) {
        item = list[i];
        if (item.tipo === "Despesa da Casa") {
            casa = parseFloat(casa)+parseFloat(item.valor);
        } else if (item.tipo === "Despesa do Escritório") {
            escritorio = parseFloat(escritorio)+parseFloat(item.valor);
        } else if (item.tipo === "Despesa do transporte") {
            transporte = parseFloat(transporte)+parseFloat(item.valor);
        } else if (item.tipo === "Despesa de alimentação") {
            alimentacao = parseFloat(alimentacao)+parseFloat(item.valor);
        }
        ;
    }

    // Criar tipo data table
    var data = new google.visualization.DataTable();
    //no caso do grafico  pizza possui duas colunas, com duas colunas
    data.addColumn('string', 'Bebida');
    data.addColumn('number', 'Quantidade');
    //linha da tabela
    data.addRows([
        ['Casa', casa],
        ['Escritório', escritorio],
        ['Tranporte', transporte],
        ['Alimentação', alimentacao]
    ]);

    // Options do chart, podemos alterar varios campos, segue a documentação de options para pizza, http://code.google.com/apis/chart/interactive/docs/gallery/piechart.html 
    var options = {'title': 'Resumo das despesas', //titulo
        'titleTextStyle': {fontSize: 16}, //estilo do texto, é possivel alterar fonte e cor tb
        'legend': {position: 'left', textStyle: {color: 'black', fontSize: 12}}, //legenda 
        'slices': {3: {color: 'black'}}, //personalizar a cor do slice
        'width': 500, //size
        'height': 200};

    // desenho do grafico
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
