import { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  // Simulate receiving IPC events every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const fakeEvent = {
        id: Date.now(),
        channel: Math.random() > 0.5 ? 'ping' : 'pong',
        direction: Math.random() > 0.5 ? 'sent' : 'received',
        data: JSON.stringify({ example: 'Hello from IPC!' })
      };
      setEvents(prev => [fakeEvent, ...prev]);
    }, 2000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-2">Devtron IPC Inspector</h1>
      <p className="text-gray-400">Simulating fake IPC events...</p>

      <table className="mt-4 w-full text-left table-auto border-collapse border border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-700 px-2 py-1">Channel</th>
            <th className="border border-gray-700 px-2 py-1">Direction</th>
            <th className="border border-gray-700 px-2 py-1">Data</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td className="border border-gray-700 px-2 py-1">{event.channel}</td>
              <td className="border border-gray-700 px-2 py-1">{event.direction}</td>
              <td className="border border-gray-700 px-2 py-1">{event.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
