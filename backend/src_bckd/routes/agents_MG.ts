import { Router } from "express";
import { designAgent } from "../services/oumi";
import { registerFlow, runFlow, getExecution } from "../services/kestra";
import { saveAgent, getAgent, getAllAgents, updateAgent } from "../services/storage";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// POST /agents/create
router.post("/create", async (req, res) => {
  try {
    const { name, description } = req.body;

    // 1) Ask Oumi to design the agent and produce flow YAML
    const designed = await designAgent({ name, description });

    // 2) Register flow in Kestra
    const flow = await registerFlow(designed.flowYaml);

    // 3) Save agent
    const id = uuidv4();
    const agent = {
      id,
      name,
      description,
      steps: designed.steps,
      kestraFlowId: flow.id,
      kestraNamespace: flow.namespace,
      version: 1
    };
    saveAgent(agent);

    res.json({ agent });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Create agent failed" });
  }
});

// GET /agents
router.get("/", (req, res) => {
  res.json({ agents: getAllAgents() });
});

// POST /agents/:id/run
router.post("/:id/run", async (req, res) => {
  const agent = getAgent(req.params.id);
  if (!agent) return res.status(404).json({ error: "Agent not found" });

  const input = req.body.input || {};
  const exec = await runFlow(agent.kestraFlowId, agent.kestraNamespace, input);

  res.json({ execution: exec });
});

// GET /agents/:id/execution/:execId
router.get("/:id/execution/:execId", async (req, res) => {
  const agent = getAgent(req.params.id);
  if (!agent) return res.status(404).json({ error: "Agent not found" });

  const data = await getExecution(
    agent.kestraNamespace,
    agent.kestraFlowId,
    req.params.execId
  );

  res.json({ execution: data });
});

export default router;
