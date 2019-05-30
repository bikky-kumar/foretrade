const lineChart = document.getElementById('predection_chart').getContext('2d')

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize=12

const val = []
const lab = []
var table = document.getElementById("modern-table");
for (var i = 1, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
  for (var j = 0, col; col = row.cells[j]; j++) {
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      if(j == 0){
        lab.push(table.rows[i].cells[j].innerHTML)
      }
      else{
        val.push(table.rows[i].cells[j].innerHTML)
      }
      
    }  
 }

const closing_price = val //[23, 34,34, 34, 34,36,23]
const day = lab //['Day 1', 'Day 2', 'Day 3','Day 4','Day 5','Day 6','Day 7']

const linechart = new Chart(lineChart, {
    type: 'line',
    data:{
        //Day exp, 1, 2, 3, 4
        labels:day,
        datasets:[{
            label: 'Closing Price',
            data:closing_price,
            borderColor:'#0080ff',
            borderWidth: 1
        }]
    },
    options:{
        responsive: true,
        maintainAspectRatio: false,
        title:{
            display:true,
            text:'Closing Value for Next 365 Work Days',
            fontSize:20
        }
    } 
})