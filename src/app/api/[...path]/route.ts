import axios from "axios";
import { NextResponse } from "next/server";

const API_BASE = "http://localhost:3001/api";

async function handleRequest(req: Request, method: string, params?: { path?: string[] }) {
  const targetPath = params?.path?.join("/") || "";
  const url = `${API_BASE}/${targetPath}`;
  const headers: Record<string, string> = {};

  req.headers.forEach((value, key) => {
    if (!["host", "origin"].includes(key)) headers[key] = value;
  });

  try {
    const config = { method, url, headers, data: undefined as any };

    if (method !== "GET" && method !== "HEAD") {
      config.data = await req.json().catch(() => ({}));
    }

    const response = await axios(config);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Proxy error:", error.message);
    return NextResponse.json(
      {
        error: error.response?.data?.error || "Request failed",
        details: error.response?.data || null,
      },
      { status: error.response?.status || 500 }
    );
  }
}

// ✅ Await the params now (new Next.js behavior)
export async function GET(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return handleRequest(req, "GET", { path });
}

export async function POST(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return handleRequest(req, "POST", { path });
}

export async function PATCH(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return handleRequest(req, "PATCH", { path });
}

export async function DELETE(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return handleRequest(req, "DELETE", { path });
}

export async function PUT(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return handleRequest(req, "PUT", { path });
}
