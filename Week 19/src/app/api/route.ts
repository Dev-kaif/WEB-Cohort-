import { NextResponse } from "next/server";

export function POST() {
    return NextResponse.json({
        name:"Harkirat",
        email:"kaif123@gmail.com",
        method:"Post"
    })
}
export function PUT() {
    return NextResponse.json({
        name:"Harkirat",
        email:"kaif123@gmail.com",
        method:"Put"
    })
}

export function GET() {
    return NextResponse.json({
        name:"Harkirat",
        email:"kaif123@gmail.com",
        method:"Get"
    })
}