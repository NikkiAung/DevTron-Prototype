function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-2">Devtron IPC Inspector</h1>
      <p className="text-gray-400">Listening for IPC events...</p>

      <div className="mt-4">
        <table className="w-full text-left table-auto border-collapse border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-700 px-2 py-1">Channel</th>
              <th className="border border-gray-700 px-2 py-1">Direction</th>
              <th className="border border-gray-700 px-2 py-1">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-2 py-1">ping</td>
              <td className="border border-gray-700 px-2 py-1">sent</td>
              <td className="border border-gray-700 px-2 py-1">Hello</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-2 py-1">pong</td>
              <td className="border border-gray-700 px-2 py-1">received</td>
              <td className="border border-gray-700 px-2 py-1">Hi!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
