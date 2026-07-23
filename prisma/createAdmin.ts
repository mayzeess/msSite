import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
    const login = "admin";
    const password = "admin123";

    const hash = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: {
            login,
        },
        update: {},
        create: {
            login,
            password: hash,
            role: "ADMIN",
        },
    });

    console.log("Администратор создан:");
    console.log(admin.login);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });