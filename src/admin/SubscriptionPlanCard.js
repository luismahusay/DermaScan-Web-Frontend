import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/admin_dashboard.css';

const data = [
  { name: 'Free', value: 320, color: '#1A237E' },
  { name: 'Monthly', value: 180, color: '#0097A7' },
  { name: 'Yearly', value: 80, color: '#8BC34A' },
];

const total = data.reduce((sum, entry) => sum + entry.value, 0);
const percent = ((data[1].value + data[2].value) / total * 100).toFixed(1);

const renderCustomizedLabel = ({ cx, cy }) => {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="fs-5 fw-bold" fill="#000">
      {percent}%
    </text>
  );
};

const SubscriptionPlanCard = () => {
  return (
    <div
      className="subscription-plan-card p-4 border border-primary rounded-3 shadow-sm bg-white h-100"
      style={{
        borderRadius: '10px',
        borderColor: 'blue',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <div className="row align-items-center ">
        {/* Donut Chart - Left */}
        <div className="col-md-6 col-12 mb-3 mb-md-0 d-flex justify-content-center">
          <div style={{ width: 220, height: 220 }}>
            <PieChart width={220} height={220}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                labelLine={false}
                label={renderCustomizedLabel}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [`${value}`, `${props.payload.name}`]}
                contentStyle={{ borderRadius: 4, fontSize: 14 }}
              />
            </PieChart>
          </div>
        </div>

        {/* Legend - Right */}
        <div className="col-md-6 col-12 mt-4 d-flex flex-column align-items-start justify-content-center">
          <div className="subscription-plan-title fw-bold text-center d-flex justify-content-start mb-3">
          Subscription Plan
          </div>
          <div className="d-flex flex-column align-items-start gap-2">
            {data.map((entry) => (
              <div key={entry.name} className="d-flex align-items-center">
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: entry.color,
                    borderRadius: 2, // square
                    marginRight: 8,
                  }}
                ></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;
