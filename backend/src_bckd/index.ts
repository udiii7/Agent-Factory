import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

type Agent = {
  id: string;
  name: string;
  description: string;
};

type RunAgentBody = {
  agentId: string;
};

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "Agent Factory backend running" });
});

app.get("/agents", (_req: Request, res: Response) => {
  const agents: Agent[] = [];
  res.json({ agents });
});

app.post("/run-agent", (req: Request<unknown, unknown, RunAgentBody>, res: Response) => {
  const { agentId } = req.body;

  res.json({
    success: true,
    agentId,
    result: "Agent run placeholder",
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
