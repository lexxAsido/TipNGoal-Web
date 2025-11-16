import axios from "axios";

// ⚙️ API key
const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API;
// console.log("FOOTBALL_API:", process.env.NEXT_PUBLIC_FOOTBALL_API);


// const API_KEY = "1551f90f7db1519fe203dfbfcdccf62d";

// 🔗 Base URLs
const BASE_URLS = {
  football: "https://v3.football.api-sports.io",
  basketball: "https://v1.basketball.api-sports.io",
  rugby: "https://v1.rugby.api-sports.io",
  hockey: "https://v1.hockey.api-sports.io",
};

// ⚙️ Axios factory 
const getApi = (sport) => {
  const base = BASE_URLS[sport] || BASE_URLS.football;
  return axios.create({
    baseURL: base,
    headers: {
      "x-apisports-key": API_KEY,
      Accept: "application/json",
    },
  });
};

// 🧩 SPORT ROUTING — some use /fixtures, others /games
const getEndpoint = (sport) => {
  if (["basketball", "nba", "rugby", "hockey"].includes(sport)) return "/games";
  return "/fixtures";
};

// 🧩 Unified Fixture Formatter
const formatFixtures = (data, sport) => {
  return (data || []).map((item) => {
    if (["basketball", "rugby", "hockey"].includes(sport)) {
      return {
        id: item.id,
        date: item.date,
        status: item.status?.short || item.status?.long || "—",
        league: {
          id: item.league?.id,
          name: item.league?.name,
          logo: item.league?.logo,
          country: item.country?.name,
        },
        homeTeam: {
          id: item.teams?.home?.id,
          name: item.teams?.home?.name,
          logo: item.teams?.home?.logo,
        },
        awayTeam: {
          id: item.teams?.away?.id,
          name: item.teams?.away?.name,
          logo: item.teams?.away?.logo,
        },
        score: {
          home: item.scores?.home?.total ?? 0,
          away: item.scores?.away?.total ?? 0,
        },
      };
    }

    // default: football
    return {
      id: item.fixture?.id,
      date: item.fixture?.date,
      status: item.fixture?.status?.short,
      elapsed: item.fixture?.status?.elapsed,
      league: {
        id: item.league?.id,
        name: item.league?.name,
        logo: item.league?.logo,
        country: item.league?.country,
      },
      homeTeam: {
        id: item.teams?.home?.id,
        name: item.teams?.home?.name,
        logo: item.teams?.home?.logo,
      },
      awayTeam: {
        id: item.teams?.away?.id,
        name: item.teams?.away?.name,
        logo: item.teams?.away?.logo,
      },
      score: {
        home: item.goals?.home ?? 0,
        away: item.goals?.away ?? 0,
      },
    };
  });
};

// 🟢 LIVE fixtures
export const getLiveFixtures = async (sport = "football") => {
  const api = getApi(sport);
  const endpoint = getEndpoint(sport);
  try {
    const params = sport === "football" ? { live: "all" } : { live: true };
    const response = await api.get(endpoint, { params });
    // return formatFixtures(response.data.response, sport);
    const fixtures = formatFixtures(response.data.response, sport);
return groupFixturesByLeague(fixtures);

  } catch (error) {
    console.error(`Error fetching live fixtures for ${sport}:`, error.response?.data || error.message);
    return [];
  }
};

// 📅 TODAY fixtures
export const getTodayFixtures = async (sport = "football") => {
  const api = getApi(sport);
  const endpoint = getEndpoint(sport);
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await api.get(endpoint, { params: { date: today } });

    // NBA filter (optional)
    const filtered =
      sport === "nba"
        ? (response.data.response || []).filter((item) => item.league?.id === 12)
        : response.data.response;

    // return formatFixtures(filtered, sport);
    const fixtures = formatFixtures(filtered, sport);
return groupFixturesByLeague(fixtures);

  } catch (error) {
    console.error(`Error fetching today's fixtures for ${sport}:`, error.response?.data || error.message);
    return [];
  }
};

// === FIXTURE DETAILS ===

// ✅ Get lineups (football only)
export const getLineups = async (fixtureId, sport = "football") => {
  if (sport !== "football") return null;
  const api = getApi(sport);
  try {
    const res = await api.get(`/fixtures/lineups`, { params: { fixture: fixtureId } });
    const lineups = res.data?.response || [];

    // ✅ format for display
    return lineups.map((team) => ({
      team: team.team.name,
      formation: team.formation,
      coach: team.coach?.name || "Unknown",
      startXI: team.startXI.map((p) => `${p.player.number}. ${p.player.name}`),
      substitutes: team.substitutes.map((p) => `${p.player.number}. ${p.player.name}`),
    }));
  } catch (err) {
    console.error("getLineups error:", err.response?.data || err.message);
    return [];
  }
};


// ✅ Get head-to-head (football only)
export const getHeadToHead = async (homeId, awayId, sport = "football") => {
  if (sport !== "football") return null;
  const api = getApi(sport);
  try {
    const res = await api.get(`/fixtures/headtohead`, { params: { h2h: `${homeId}-${awayId}` } });
    const matches = res.data?.response || [];

    // ✅ format for modal
    return matches.map((m) => ({
      date: m.fixture.date,
      league: m.league.name,
      home: m.teams.home.name,
      away: m.teams.away.name,
      score: `${m.goals.home ?? 0} - ${m.goals.away ?? 0}`,
      winner: m.teams.home.winner
        ? m.teams.home.name
        : m.teams.away.winner
        ? m.teams.away.name
        : "Draw",
    }));
  } catch (err) {
    console.error("getHeadToHead error:", err.response?.data || err.message);
    return [];
  }
};


// ✅ Standings (for all sports)
export const getStats = async (fixtureId, sport = "football") => {
  if (sport !== "football") return null;
  const api = getApi(sport);
  try {
    const res = await api.get(`/fixtures/statistics`, { params: { fixture: fixtureId } });
    const stats = res.data?.response || [];

    // ✅ simplified formatting
    return stats.map((team) => ({
      team: team.team.name,
      stats: team.statistics.map((s) => ({
        type: s.type,
        value: s.value ?? "—",
      })),
    }));
  } catch (err) {
    console.error("getStats error:", err.response?.data || err.message);
    return [];
  }
};

export const getPredictions = async (fixtureId, sport = "football") => {
  if (sport !== "football") return null;
  const api = getApi(sport);
  try {
    const res = await api.get(`/predictions`, { params: { fixture: fixtureId } });
    const data = res.data?.response?.[0];
    if (!data) return null;

    return {
      winner: data.predictions.winner?.name || "No clear favorite",
      advice: data.predictions.advice,
      percent: {
        home: data.predictions.percent?.home,
        draw: data.predictions.percent?.draw,
        away: data.predictions.percent?.away,
      },
    };
  } catch (err) {
    console.error("getPredictions error:", err.response?.data || err.message);
    return null;
  }
};

export const getStandingsByFixture = async (fixture, sport = "football") => {
  const api = getApi(sport);
  const leagueId = fixture?.league?.id;
  const season = new Date(fixture?.date).getFullYear(); // infer from fixture date

  if (!leagueId) return [];
  try {
    const res = await api.get(`/standings`, {
      params: { league: leagueId, season },
    });

    const table =
      sport === "football"
        ? res.data?.response?.[0]?.league?.standings?.[0] || []
        : res.data?.response || [];

    return table.map((t) => ({
      rank: t.rank,
      team: {
        name: t.team?.name || "-",
        logo: t.team?.logo || null,
      },
      played: t.all?.played ?? "-",
      win: t.all?.win ?? "-",
      draw: t.all?.draw ?? "-",
      lose: t.all?.lose ?? "-",
      points: t.points ?? "-",
    }));
  } catch (err) {
    console.error("getStandingsByFixture error:", err.response?.data || err.message);
    return [];
  }
};
// 🧩 GROUP BY LEAGUE (shared for live + today)
export const groupFixturesByLeague = (fixtures = []) => {
  const grouped = {};

  fixtures.forEach((fixture) => {
    const country = fixture.league?.country || "International";
    const name = fixture.league?.name || "Unknown League";
    const leagueKey = `${country} - ${name}`;

    if (!grouped[leagueKey]) grouped[leagueKey] = [];
    grouped[leagueKey].push(fixture);
  });

  // sort leagues alphabetically
  return Object.fromEntries(Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)));
};


// ✅ Exports
export default {
  getLiveFixtures,
  getTodayFixtures,
  getLineups,
  getHeadToHead,
  getStats,
  getPredictions,
  getStandingsByFixture,
  groupFixturesByLeague
};
