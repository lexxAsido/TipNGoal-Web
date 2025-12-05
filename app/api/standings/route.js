import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const league = searchParams.get("league");
    const season = searchParams.get("season");

    if (!league || !season) {
      return NextResponse.json(
        { error: "Missing league or season" },
        { status: 400 }
      );
    }

    // Call API-Sports
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${league}&season=${season}`,
      {
        headers: {
          "x-apisports-key": process.env.NEXT_PUBLIC_FOOTBALL_API,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Standings API Error:", error);
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
