var charrts = {barrs: function (a) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var g = {
    type: 'bar',
    data: {
      labels: ['HC', 'PR', '2P', '3K', 'ST', 'FL', 'FH', '4K', 'SF'],
      datasets: [{
        label: 'hand degeneracy',
        data: [12, 19, 3, 5, 20, 3, 1, 2, 3],
        backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)',
         'rgba(255, 159, 64, 0.2)',
         'rgba(255, 159, 64, 0.2)',
         'rgba(255, 159, 64, 0.2)'],
        borderColor: [
         'rgba(255, 99, 132, 1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)',
         'rgba(255, 159, 64, 1)',
         'rgba(255, 159, 64, 1)',
         'rgba(255, 159, 64, 1)'],
        borderWidth: 1}]},
    options: {responsive: false}}
    g.data.datasets[0].data = a;
  return new Chart(ctx, g);
}}

