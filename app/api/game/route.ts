import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { requireAdmin } from "./auth";
import { error } from "console";

export async function GET() {
    const games = await prisma.game.findMany();
    return NextResponse.json(games);
}

export async function POST(request: Request) {
    try {
        
        const authResult = await requireAdmin()
        if (!authResult.succes) {
            return Response.json(
                {error: authResult.message},
                {status: authResult.status}
            )
        }

        const formData = await request.formData()

        const name = formData.get("name")
        const rating = formData.get("rating")
        const description = formData.get("description")
        const image = formData.get("image")

        if (!name || !image) {
            return NextResponse.json(
                { error: "Не все обязательные поля заполнены" }, { status: 400 }
            )
        }
        
        const imageFile = image as File

        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = crypto.randomUUID() + path.extname(imageFile.name)
        
        const uploadPath = path.join(
            process.cwd(),
            "public",
            "uploads",
            fileName
        )
        
        await fs.writeFile(uploadPath, buffer)

        const game = await prisma.game.create({
            data: {
                name: String(name),
                rating: Number(rating),
                description: String(description),
                image: `/uploads/${fileName}`,
            }
        })

        return NextResponse.json(game)

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Ошибка" },
            { status: 500 }
        )
    }
}