// web/src/app/page.tsx
"use client";

import { useState } from "react";

type Agent = {
  id: number;
  name: string;
  description: string;
};

export default function HomePage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setAgents(prev => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        description: description.trim()
      }
    ]);

    setName("");
    setDescription("");
  };

  const handleRunAgent = (agent: Agent) => {
    // later: call backend /agents/:id/run
    console.log("Running agent:", agent);
    alert(`Mock: running agent "${agent.name}"`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 gap-8">
      <h1 className="text-3xl font-bold">Agent Factory</h1>

      <form
        onSubmit={handleAddAgent}
        className="w-full max-w-xl flex flex-col gap-4 border rounded-lg p-4"
      >
        <input
          className="border rounded px-3 py-2"
          placeholder="Agent name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          className="border rounded px-3 py-2"
          placeholder="Agent description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="border rounded px-3 py-2 font-semibold"
        >
          Add Agent
        </button>
      </form>

      <section className="w-full max-w-xl flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Agents</h2>
        {agents.length === 0 && <p>No agents yet.</p>}
        {agents.map(agent => (
          <div
            key={agent.id}
            className="border rounded p-3 flex items-center justify-between gap-4"
          >
            <div>
              <div className="font-medium">{agent.name}</div>
              {agent.description && (
                <div className="text-sm opacity-75">{agent.description}</div>
              )}
            </div>
            <button
              className="border rounded px-3 py-1 text-sm font-semibold"
              onClick={() => handleRunAgent(agent)}
            >
              Run
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
