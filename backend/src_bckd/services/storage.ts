type Agent = {
  id: string;
  name: string;
  description: string;
  steps: string[];
  kestraFlowId: string;
  kestraNamespace: string;
  version: number;
};

const agents = new Map<string, Agent>();

export function saveAgent(agent: Agent) {
  agents.set(agent.id, agent);
}

export function getAgent(id: string) {
  return agents.get(id) || null;
}

export function getAllAgents() {
  return Array.from(agents.values());
}

export function updateAgent(agent: Agent) {
  agents.set(agent.id, agent);
}
