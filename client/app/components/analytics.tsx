import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const [requestCount, setRequestCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userResponse = await fetch('/api/getUser', {
        method: 'GET',
      });
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user ID');
      }
      const userData = await userResponse.json();
      setUserId(userData.userId);
      fetchAnalytics(userData.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchAnalytics = async (userId: string) => {
    try {
      const analyticsResponse = await fetch(`http://127.0.0.1:8000/analytics/${userId}`);
      if (!analyticsResponse.ok) {
        throw new Error('Failed to fetch analytics');
      }
      const data = await analyticsResponse.json();
      setRequestCount(data.request_count);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const conversations = Array.from({ length: requestCount + 1 }, (_, i) => i);

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Conversations',
        data: [requestCount, ...days.slice(1).map(() => null)],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Conversations'
        },
        ticks: {
          stepSize: 1,
          max: Math.max(requestCount, 5)  // Ensure at least 5 ticks
        }
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <p className="mb-4">View your analytics and statistics here.</p>
      <div style={{ width: '100%', height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}