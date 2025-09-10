import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const data = await req.json();
    
    console.log("Signin data received:", data);
    return NextResponse.json({ message: "Signin successful", data });
}