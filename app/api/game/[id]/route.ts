import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import crypto from "crypto"
import { Console } from "console"
import { requireAdmin } from "../auth"

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function DELETE(
    request: Request,
    { params }: Props
) {
    try 
    {
        const authResult = await requireAdmin()
        if (!authResult.succes) {
            return Response.json(
                {error: authResult.message},
                {status: authResult.status}
            )
        }
        const { id } = await params

        const game = await prisma.game.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!game){
            return NextResponse.json(
                { error: "Игра не найдена" },
                { status: 404 }
            )
        }

        if (game.image.startsWith("/uploads/")) {
            const imagePath = path.join(
                process.cwd(),
                "public",
                game.image.replace(/^\/+/, "")
            )

            try {
                await fs.unlink(imagePath)
            } catch (error) {
                console.error("Старое изображение не удалено", error)
            }
        }

        await prisma.game.delete({
            where: {
                id: Number(id)
            }
        })

        return NextResponse.json({
            message: "Игра удалена"
        })
    }
    catch {
        return NextResponse.json(
            { error: "Ошибка" },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: Request,
    { params }: Props
) {
    try {
        const authResult = await requireAdmin()
        if (!authResult.succes) {
            return Response.json(
                {error: authResult.message},
                {status: authResult.status}
            )
        }
        const { id } = await params

        const formData = await request.formData()

        const name = formData.get("name")
        const rating = formData.get("rating")
        const description = formData.get("description")
        
        const oldGame = await prisma.game.findUnique({
            where: {
                id: Number(id)
            }
        })
        
        if (!oldGame) {
            return NextResponse.json(
                { error: "Игра не найдена" },
                { status: 404 }
            )
        }
        let imagePath = oldGame.image
        const image = formData.get("image")
        let newImageUploaded = false

        if (image instanceof File && image.size > 0) {
            const bytes = await image.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const fileName = crypto.randomUUID() + path.extname(image.name)
            
            const uploadPath = path.join(
                process.cwd(),
                "public",
                "uploads",
                fileName
            )
            
            await fs.writeFile(uploadPath, buffer)
            imagePath = `/uploads/${fileName}`
            newImageUploaded = true
        }
        
        const game = await prisma.game.update({
            where: {
                id: Number(id)
            },
            data: {
                name: String(name),
                rating: Number(rating),
                description: String(description),
                image: imagePath
            }
        })
        
        if (newImageUploaded && oldGame.image.startsWith("/uploads/")) {
            const oldPath = path.join(
                process.cwd(),
                "public",
                oldGame.image
            )
            try {
                await fs.unlink(oldPath).catch(() => {})
            }
            catch (error) {
                console.error("Старое изображение не удалено", error)
            }
        }

        return NextResponse.json(game)
    } catch {
        return NextResponse.json(
            { error: "Ошибка" },
            { status: 500 }
        )
    }
}

