import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";


function AnalyticsCharts({
  analytics,
}) {

  if (!analytics) return null;


  // PIE CHART DATA
  const pieData =
    analytics.holdings.map(
      (holding) => ({
        name: holding.symbol,
        value: holding.current,
      })
    );


  // LINE CHART DATA
  const lineData =
    analytics.holdings.map(
      (holding) => ({
        name: holding.symbol,
        value: holding.current,
      })
    );


  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      {/* LINE CHART */}

      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Portfolio Performance
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={lineData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* PIE CHART */}

      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Holdings Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >

              {pieData.map(
                (entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsCharts;