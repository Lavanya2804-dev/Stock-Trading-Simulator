import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function StockChart({
  history,
}) {

  return (

    <div className="bg-white shadow rounded-xl p-5">

      <h2 className="text-2xl font-bold mb-4">
        Price History
      </h2>


      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={history}>

          <XAxis
            dataKey="time"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#000"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StockChart;