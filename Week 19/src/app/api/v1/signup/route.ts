import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export async function POST(req:NextRequest){

    const {email,username,password} = await req.json();

    await client.user.create({
        data:{
            email,username,password
        }
    })

    return NextResponse.json({message:"you have signed up"})
} 