import { useEffect, useState } from "react";
import { downloadJSON } from "./utils/downloadJSON";

function App() {
  const [events, setEvents] = useState([]);
  const [paused, setPaused] = useState(false);
  const [search, setSearch] = useState("");

  // Simulate receiving IPC events every 2 seconds
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      const fakeEvent = {
        id: Date.now(),
        channel: Math.random() > 0.5 ? "ping" : "pong",
        direction: Math.random() > 0.5 ? "sent" : "received",
        data: JSON.stringify({ example: "Hello from IPC!" }),
      };
      setEvents((prev) => [fakeEvent, ...prev]);
    }, 2000);

    return () => clearInterval(interval); // cleanup
  }, [paused]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-2">Devtron IPC Inspector</h1>
      <input
        type="text"
        placeholder="🔍 Filter by channel or data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 outline-none"
      />
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
          {events
            .filter(
              (event) =>
                event.channel.toLowerCase().includes(search.toLowerCase()) ||
                event.data.toLowerCase().includes(search.toLowerCase())
            )
            .map((event) => (
              <tr key={event.id}>
                <td className="border border-gray-700 px-2 py-1">
                  {event.channel}
                </td>
                <td className="border border-gray-700 px-2 py-1">
                  {event.direction}
                </td>
                <td className="border border-gray-700 px-2 py-1">
                  {event.data}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex gap-1.5 mt-3">
        <button
          onClick={() => setEvents([])}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm mb-4"
        >
          🗑️ Clear Logs
        </button>
        <button
          onClick={() => setPaused((p) => !p)}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm mb-4 ml-2"
        >
          {paused ? "▶️ Resume" : "⏸️ Pause"}
        </button>
        <button
          onClick={() => downloadJSON(events)}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm mb-4 ml-2"
        >
          💾 Export Logs
        </button>
      </div>
    </div>
  );
}

export default App;
