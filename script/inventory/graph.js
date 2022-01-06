import Chart from "chart.js/auto";

const ctx = document.getElementById("myChart");

const now = new Date();
const hours = now.getHours();

const labels = [];

const data = [];

for (let i = 9; i <= hours; i++) {
  labels.push(i);

  data.push(Math.floor(Math.random() * 15000));
}

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "amount earned in DKK",
        data: data,
        fill: false,
        borderColor: "#F9AB3D",
        tension: 0.1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    aspectRatio: 600 / 250,
  },
});

export function prepareChartData(dataForChart) {
  console.log(dataForChart);
  dataForChart.forEach((object) => {
    updateChart(object);
  });
}

function updateChart(object) {
  if (myChart.data.datasets[0].data[Number(object.time) - 9] != null) {
    myChart.data.datasets[0].data[Number(object.time) - 9] = object.price;
    myChart.update();
  } else {
    addData(object);
  }
}

function addData(object) {
  const { time, price } = object;

  myChart.data.labels.push(time);

  myChart.data.datasets.forEach((dataset) => {
    dataset.data.push(price);
  });
  myChart.update();
}

myChart.canvas.parentNode.style.height = "20vw";
