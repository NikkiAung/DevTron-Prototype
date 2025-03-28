import { useEffect, useState } from "react";
import { downloadJSON } from "./utils/downloadJSON";

function App() {
  const [events, setEvents] = useState([]);
  const [paused, setPaused] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      // 1. Try Electron environment first
      if (window.devtronIPC?.getLogs) {
        const logs = window.devtronIPC.getLogs();
        if (Array.isArray(logs)) setEvents([...logs].reverse());
        return;
      }

      // 2. If inside Chrome DevTools panel
      if (chrome?.devtools?.inspectedWindow) {
        chrome.devtools.inspectedWindow.eval(
          "window.devtronIPC.getLogs()",
          (result, error) => {
            if (!error && Array.isArray(result)) {
              setEvents(result.reverse());
            } else {
              console.error("Devtron IPC eval error:", error);
            }
          }
        );
      }
    }, 1000);

    return () => clearInterval(interval);
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
            <th className="border border-gray-700 px-2 py-1">Time</th>
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
                <td className="border border-gray-700 px-2 py-1 text-xs">
                  {new Date(event.time).toLocaleTimeString()}
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
        <button
          onClick={() => window.devtronIPC?.sendPing()}
          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm mb-4"
        >
          🚀 Send IPC "ping"
        </button>
        <button onClick={() => window.devtronIPC.sendPing()}>Send Ping</button>
      </div>
    </div>
  );
}

export default App;
