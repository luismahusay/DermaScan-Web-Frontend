import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/admin_dashboard.css';

const data = [
  { name: 'Free', value: 320, color: '#1A237E' }, // Deep blue
  { name: 'Monthly', value: 180, color: '#0097A7' }, // Teal
  { name: 'Yearly', value: 80, color: '#8BC34A' }, // Light green
];

const total = data.reduce((sum, entry) => sum + entry.value, 0);
const percent = ((data[1].value + data[2].value) / total * 100).toFixed(1); // Monthly+Yearly

const renderCustomizedLabel = ({ cx, cy }) => {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="donut-center-label">
      {percent}%
    </text>
  );
};

const SubscriptionPlanCard = () => {
  return (
    <div className="subscription-plan-card aligned-card">
      <div className="subscription-plan-title">Subscription Plan</div>
      <div className="donut-chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
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
        </ResponsiveContainer>
      </div>
      <div className="donut-legend">
        {data.map((entry) => (
          <div className="donut-legend-item" key={entry.name}>
            <span className="donut-legend-color" style={{ background: entry.color }}></span>
            <span className="donut-legend-label">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;
