import axios from "axios";

const base = axios.create({
  baseURL: process.env.KESTRA_API_URL!,
  headers: {
    Authorization: `Bearer ${process.env.KESTRA_API_TOKEN}`,
    "Content-Type": "application/json"
  }
});

export async function registerFlow(flowYaml: string) {
  // Many Kestra APIs accept JSON with yaml inside; adjust to actual API.
  const res = await base.post("/flows/import", {
    // or whatever structure Kestra expects
    content: flowYaml
  });

  // Suppose response returns id and namespace
  return {
    id: res.data.id,
    namespace: res.data.namespace
  };
}

export async function runFlow(flowId: string, namespace: string, input: any) {
  const res = await base.post(
    `/flows/${namespace}/${flowId}/executions`,
    { inputs: input }
  );
  return res.data; // contains executionId
}

export async function getExecution(namespace: string, flowId: string, execId: string) {
  const res = await base.get(
    `/flows/${namespace}/${flowId}/executions/${execId}`
  );
  return res.data;
}
