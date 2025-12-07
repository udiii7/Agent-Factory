import axios from "axios";

const OUMI_API_URL = "https://api.oumi.ai/v1/chat"; // example style

export async function designAgent(spec: {
  name: string;
  description: string;
}): Promise<{ flowYaml: string; steps: string[] }> {
  const prompt = `
You are an AI system designer.

User wants an AI agent with:

Name: ${spec.name}
Description: ${spec.description}

1. Break this into 3–6 clear steps.
2. Create a Kestra flow in YAML that executes these steps.
3. Assume tasks call an HTTP endpoint /agents/runStep with step id and input.

Return JSON with:
- "steps": [list of step descriptions]
- "flow_yaml": "the Kestra YAML for the flow"
`;

  const res = await axios.post(
    OUMI_API_URL,
    {
      messages: [{ role: "user", content: prompt }],
      model: "some-llm-id" // whatever Oumi uses
    },
    {
      headers: { Authorization: `Bearer ${process.env.OUMI_API_KEY}` }
    }
  );

  // Pseudo-extraction; you'll adjust to Oumi's actual format
  const content = res.data.choices[0].message.content;
  const json = JSON.parse(content);
  return {
    flowYaml: json.flow_yaml,
    steps: json.steps
  };
}
