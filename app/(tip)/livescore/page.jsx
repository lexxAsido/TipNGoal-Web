"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react";
import apiConfig from '@/app/Services/apiConfig'
import { format } from "date-fns"; 
import { FiCalendar } from "react-icons/fi";
import { FaSquare } from "react-icons/fa6";

const {
  getLiveFixtures,
  getTodayFixtures,
  getLineups,
  getHeadToHead,
  getStats,
  getPredictions,
  getStandingsByFixture,
  groupFixturesByLeague,
  getEvents
} = apiConfig;

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const SPORTS = [
  { key: "football", label: "⚽ Football" },
  { key: "basketball", label: "🏀 Basketball" },
  { key: "rugby", label: "🏉 Rugby" },
  { key: "hockey", label: "🏒 Hockey" },
];

const TOP_LEAGUES = [
  "England - Premier League",
  "La Liga",
  "Italy - Serie A",
  "Germany - Bundesliga",
  "France - Ligue 1",
  "Uefa Champions League",
  "UEFA Europa Conference League",
  "Uefa Europa League"
];

const defaultColors = {
  text: "#ffffff",        // white text
  subText: "#9ca3af",     // slate-400
  accent: "#10b981",      // emerald-500
  card: "#1e293b",        // slate-800 (dark card background)
};

const getEventIcon = (type, detail = "") => {
  if (type === "Goal") return "⚽";

  if (type === "Card") {
    const d = detail.toLowerCase();

    if (d.includes("yellow") && !d.includes("second")) return <FaSquare />; // Yellow Card
    if (d.includes("second")) return <FaSquare />;                         // Second Yellow → Red
    if (d.includes("red")) return <FaSquare />;                             // Straight Red / Red Card

    return <FaSquare />; // fallback
  }

  if (type === "subst") return "🔄";
  if (type === "VAR") return "🖥️";

  return "•";
};
const cacheKeyFor = (k) => `tipngoal__${k}`;

function formatTime(iso) {
  if (!iso) return { date: "", time: "" }; // <-- handle undefined/null
  try {
    const d = new Date(iso);
    if (isNaN(d)) return { date: "", time: "" }; // <-- handle invalid date
    const date = d.toLocaleDateString();
    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return { date, time };
  } catch {
    return { date: "", time: "" };
  }
}

const FixtureCard = React.memo(({ fixture, onOpenFixture, onOpenLeague }) => {
  const { date, time } = formatTime(fixture.date);
  return (
    <button
      onClick={() => onOpenFixture(fixture)}
      className="w-full text-left rounded-xl p-3 shadow-sm  "
    >
      <div className="flex items-center gap-2 mb-2">
        {fixture.league?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fixture.league.logo} alt="league" className="w-5 h-5 rounded-sm" />
        )}
        <span
  onClick={(e) => {
    e.stopPropagation();
    onOpenLeague(fixture.league);
  }}
  className="cursor-pointer text-sm font-semibold text-white "
>
  {fixture.league?.name ?? "Unknown League"}
</span>

      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center w-1/3">
          {fixture.homeTeam?.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fixture.homeTeam.logo} alt="home" className="w-10 h-10 rounded-full mb-2" />
          )}
          <div className="text-sm text-white text-center font-bold">{fixture.homeTeam?.name}</div>
        </div>

        <div className="w-1/3 text-center">
          <div className="text-lg font-bold text-slate-100">{fixture.score?.home ?? '-'} - {fixture.score?.away ?? '-'}</div>
          <div
  className={`text-xs mt-1 text-white ${
    fixture.elapsed 
  }`}
>
  {fixture.status === 'NS'
    ? `${date} ${time}`
    : fixture.status === 'FT'
    ? 'FT'
    : fixture.elapsed
    ? `${fixture.elapsed}'`
    : fixture.status}
</div>

        </div>

        <div className="flex flex-col items-center w-1/3">
          {fixture.awayTeam?.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fixture.awayTeam.logo} alt="away" className="w-10 h-10 rounded-full mb-2" />
          )}
          <div className="text-sm text-white text-center font-bold">{fixture.awayTeam?.name}</div>
        </div>
      </div>
    </button>
  );
});

const StandingsTable = React.memo(({ standings }) => {
  if (!standings || standings.length === 0)
    return <div className="p-4 text-slate-500">No standings available.</div>;

  // API-Football sometimes returns:
  // [{ group: "Group A", table: [...] }, { group: "Group B", table: [...] }]
  const isGrouped = standings[0]?.table && Array.isArray(standings[0].table);

  if (isGrouped) {
    return (
      <div className="space-y-6">
        {standings.map((grp, gIdx) => (
          <div key={gIdx} className="bg-slate-800 rounded-lg shadow overflow-hidden">
            {/* Group Title */}
            <div className="px-4 py-2 font-semibold text-emerald-600 text-sm border-b  dark:border-slate-700">
              {grp.group}
            </div>

            {/* Header */}
            <div className="flex justify-between px-4 py-2 text-xs  border-b border-slate-700">
              <div className="w-8">#</div>
              <div className="flex-1 text-white">Team</div>
              <div className="w-12 text-right text-white">Pts</div>
            </div>

            {/* Table rows */}
            {grp.table.map((row, idx) => (
              <div
                key={row.team?.id ?? idx}
                className="flex items-center justify-between px-4 py-2 border-b  dark:border-slate-700"
              >
                <div className="w-8 text-sm">{row.rank}</div>
                <div className="flex flex-1 items-center gap-3">
                  {row.team?.logo && (
                    <img src={row.team.logo} className="w-5 h-5 rounded-full" alt="" />
                  )}
                  <div className="text-sm truncate text-white">{row.team?.name}</div>
                </div>
                <div className="w-12 text-right text-sm">{row.points}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Non-grouped standings (Premier League, La Liga…)
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow">
      <div className="flex justify-between px-4 py-2 text-xs  border-b  dark:border-slate-700">
        <div className="w-8 text-green-500">#</div>
        <div className="flex-1 text-green-500">Team</div>
        <div className="w-12 text-right text-green-500">Pts</div>
      </div>

      {standings.map((row, idx) => (
        <div
          key={row.team?.id ?? idx}
          className="flex items-center justify-between px-4 py-2 border-b border-slate-700"
        >
          <div className="w-8 text-sm text-white">{row.rank}</div>
          <div className="flex-1 flex items-center gap-3">
            {row.team?.logo && (
              <img src={row.team.logo} className="w-5 h-5 rounded-full" alt="" />
            )}
            <div className="text-sm truncate text-white">{row.team?.name}</div>
          </div>
          <div className="w-12 text-right text-sm text-white">{row.points}</div>
        </div>
      ))}
    </div>
  );
});

const EventsList = ({ events, colors }) => {
  if (!events || events.length === 0)
    return (
      <h1 style={{ color: colors.subText, textAlign: "center", marginTop: 20 }}>
        No events available.
      </h1>
    );

  return (
    <div style={{ marginTop: 10 }}>
      {events.map((e, idx) => {
        const icon = getEventIcon(e.type, e.detail);

        const minute = e.time ? `${e.time}'` : "";
        const player = e.player || "Unknown Player";
        const assist = e.assist ? ` (Assist: ${e.assist})` : "";
        const cardReason = e.type === "Card" ? ` — ${e.detail}` : "";

        const subText =
          e.type === "subst"
            ? `${player} ↦ ${e.assist || "Player In"}`
            : null;

        // 🎨 FIX: Apply default yellow/red colors ONLY for card icons
        const isYellow = e.type === "Card" && e.detail === "Yellow Card";
        const isRed = e.type === "Card" && e.detail === "Red Card";

        const iconStyle = {
          fontSize: 20,
          marginRight: 8,
          color: isYellow ? "#FFD700" : isRed ? "#FF0000" : "inherit",
        };

        return (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
              padding: "10px 12px",
              backgroundColor: colors.card,
              borderRadius: 8,
            }}
          >
            <h2 style={{ width: 40, color: colors.accent, fontWeight: "bold" }}>
              {minute}
            </h2>

            {/* FIXED: Card icons now have correct colors */}
            <span style={iconStyle}>{icon}</span>

            <div style={{ color: colors.text, fontSize: 14 }}>
              {e.type === "subst"
                ? subText
                : `${player}${assist}${cardReason}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};



export default function Livescore() {
  const [sport, setSport] = useState('football');
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [detailTab, setDetailTab] = useState('lineups');
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState(null);
// ➤ NEW STATES
const [selectedDate, setSelectedDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
const [isToday, setIsToday] = useState(true);

  const [standingsOpen, setStandingsOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [standingsLoading, setStandingsLoading] = useState(false);
  const [standingsData, setStandingsData] = useState([]);

  const [detailCache, setDetailCache] = useState({});

  const loadAndCache = useCallback(async (key, fetcher) => {
    const k = cacheKeyFor(key);
    const now = Date.now();
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.timestamp && now - parsed.timestamp < CACHE_TTL && parsed.data) return parsed.data;
      }
    } catch (e) {
      // ignore
    }
    const fresh = await fetcher();
    try {
      localStorage.setItem(k, JSON.stringify({ data: fresh, timestamp: now }));
    } catch (e) {}
    return fresh;
  }, []);

  const fetchFixtures = useCallback(async () => {
  setLoading(true);
  console.log("🔍 fetchFixtures called:", { sport, selectedDate });

  try {
    const cacheKey = `${sport}_${selectedDate}`;

    const data = await loadAndCache(cacheKey, async () => {
      const todayStr = format(new Date(), "yyyy-MM-dd");

      if (selectedDate === todayStr) {
        console.log("📅 Fetching TODAY fixtures");

        const [live, today] = await Promise.all([
          getLiveFixtures(sport).then(r => {
            console.log("🔥 Live fixtures API called:", r);
            return r;
          }),
          getTodayFixtures(sport).then(r => {
            console.log("📆 Today fixtures API called:", r);
            return r;
          }),
        ]);

        const merged = [
          ...Object.values(live || {}).flat(),
          ...Object.values(today || {}).flat(),
        ];

        console.log("📦 Merged today fixtures:", merged);

        return merged;
      }

      // ➤ Fetch by selected date (NOT TODAY)
      console.log("📅 Fetching fixtures for other date:", selectedDate);

      const byDate = await apiConfig.getFixturesByDate(selectedDate, sport);
      console.log("📡 API returned fixtures-by-date:", byDate);

      const arr = Object.values(byDate || {}).flat();

      arr.forEach((f) => {
        if (!f.date) console.warn("[WARN] Fixture missing date:", f);
      });

      console.log("📦 Flattened fixtures for date:", arr);

      return arr;
    });

    console.log("📊 Final fetched data before grouping:", data);

    const grouped = groupFixturesByLeague(data || []);
    console.log("📚 Grouped by league:", grouped);

    const allLeagues = Object.keys(grouped);

    const matchedTopLeagues = [];
    TOP_LEAGUES.forEach((tl) => {
      const match = allLeagues.find((l) => l.toLowerCase().includes(tl.toLowerCase()));
      if (match && !matchedTopLeagues.includes(match)) matchedTopLeagues.push(match);
    });

    const otherLeagues = allLeagues.filter((l) => !matchedTopLeagues.includes(l));
    const orderedLeagues = [...matchedTopLeagues, ...otherLeagues];

    const flatData = orderedLeagues.flatMap((league) => [
      { type: "header", league },
      ...grouped[league].map((f) => ({ type: "fixture", data: f })),
    ]);

    console.log("📌 FINAL FIXTURES RENDERED:", flatData);

    setFixtures(flatData);
  } catch (err) {
    console.error("❌ fetchFixtures ERROR:", err);
    setFixtures([]);
  } finally {
    setLoading(false);
  }
}, [sport, selectedDate, loadAndCache]);



  useEffect(() => {
    setFixtures([]);
    fetchFixtures();
  }, [sport, fetchFixtures]);

  useEffect(() => {
  fetchFixtures();
}, [selectedDate]);


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      localStorage.removeItem(cacheKeyFor(`${sport}_live`));
      localStorage.removeItem(cacheKeyFor(`${sport}_today`));
      await fetchFixtures();
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, [sport, fetchFixtures]);

  const openFixture = useCallback((f) => {
    setSelectedFixture(null);
    setDetailCache({});
    setDetailData(null);
    setDetailTab('lineups');
    setTimeout(() => setSelectedFixture(f), 50);
  }, []);

  const loadDetail = useCallback(async (tabKey) => {
  if (!selectedFixture) return;
  setDetailTab(tabKey);

  // If cached, use it
  if (detailCache[tabKey]) {
    setDetailData(detailCache[tabKey]);
    return;
  }

  setDetailLoading(true);

  try {
    const fixtureId = selectedFixture.id;
    let res = null;

    if (tabKey === "lineups") {
      res = await getLineups(fixtureId, sport);
    } 
    else if (tabKey === "h2h") {
      res = await getHeadToHead(
        selectedFixture.homeTeam?.id,
        selectedFixture.awayTeam?.id,
        sport
      );
    } 
    else if (tabKey === "stats") {
      res = await getStats(fixtureId, sport);
    } 
    else if (tabKey === "predictions") {
      res = await getPredictions(fixtureId, sport);
    } 
    else if (tabKey === "standings") {
      res = await getStandingsByFixture(selectedFixture, sport);
    } 
    else if (tabKey === "events") {
      res = await getEvents(fixtureId, sport);

      // ✅ IMPORTANT — RAW EVENTS LOG   
      // console.log("RAW EVENTS RESPONSE ===>", res);

      // If your API returns events inside response[0].events:
      const parsedEvents =
        res?.response?.[0]?.events ??
        res?.events ?? // in case your wrapper returns { events: [...] }
        res;

      // console.log("PARSED EVENTS ARRAY ===>", parsedEvents);

      // Save parsed events instead of raw response
      setDetailCache((prev) => ({ ...prev, [tabKey]: parsedEvents }));
      setDetailData(parsedEvents);
      return; // stop here because events already handled
    }

    // Default (lineups, h2h, stats, standings, predictions)
    setDetailCache((prev) => ({ ...prev, [tabKey]: res }));
    setDetailData(res);

  } finally {
    setDetailLoading(false);
  }
}, [selectedFixture, sport, detailCache]);


  useEffect(() => {
  if (!selectedFixture) return;

  // reset only once when selecting a fixture
  setDetailCache({});
  setDetailData(null);
  setDetailTab("lineups");

  // load lineups once
  loadDetail("lineups");
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedFixture]);


  const openStandings = useCallback(async (league) => {
  if (!league) return;

  // FIX league reference
  const leagueObj = {
    id: league.id,
    season: league.season,
    name: league.name,
  };

  setSelectedLeague(leagueObj);
  setStandingsOpen(true);
  setStandingsLoading(true);

  try {
    const res = await getStandingsByFixture({ league: leagueObj }, sport);

    let data = [];

    if (Array.isArray(res)) data = res;
    else if (res?.standings) data = res.standings;

    setStandingsData(data);
  } catch (e) {
    console.error("Standings error", e);
    setStandingsData([]);
  } finally {
    setStandingsLoading(false);
  }
}, [sport]);



  const filteredFixtures = useMemo(() => {
  if (!searchQuery.trim()) return fixtures;

  const q = searchQuery.toLowerCase();

  return fixtures.filter((item) => {
    if (item.type === "header") {
      return item.league.toLowerCase().includes(q);
    }
    if (item.type === "fixture") {
      const f = item.data;
      return (
        f.homeTeam?.name?.toLowerCase().includes(q) ||
        f.awayTeam?.name?.toLowerCase().includes(q) ||
        f.league?.name?.toLowerCase().includes(q)
      );
    }
    return false;
  });
}, [searchQuery, fixtures]);


  return (
    <div className="min-h-screen p-4 ">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto mb-4 no-scrollbar">

  {SPORTS.map((s) => (
    <button
      key={s.key}
      onClick={() => {
        if (s.key === sport) return;
        setLoading(true);
        setTimeout(() => setSport(s.key), 150);
      }}
      className={`
        whitespace-nowrap
        px-3 py-2
        text-sm font-bold
        rounded-lg 
        md:text-sm
        text-[10px]     /* small screens */
        ${sport === s.key
          ? "bg-emerald-600 text-white"
          : "bg-black text-slate-800 dark:text-slate-200"
        }
      `}
    >
      {s.label}
    </button>
  ))}

  <button
  onClick={onRefresh}
  disabled={!isToday}
  className={`
    whitespace-nowrap ml-auto px-3 py-2 rounded-lg font-bold
    ${isToday ? "bg-emerald-600 text-white" : "bg-slate-500 text-white opacity-60"}
  `}
>
  {refreshing ? "Refreshing..." : "Refresh"}
</button>

</div>


        {loading ? (
          
          <div className="py-20 text-center text-emerald-600">Loading fixtures…</div>
        ) : (
          <div className="space-y-3">
            {/* ➤ NEW: DATE PICKER */}
<div className="relative mb-4 flex items-center gap-3">
  <div className="relative">
    {/* <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-slate-100 pointer-events-none" /> */}

    <input
      type="date"
      value={selectedDate}
      onChange={(e) => {
        const d = e.target.value;
        setSelectedDate(d);
        const today = format(new Date(), "yyyy-MM-dd");
        setIsToday(d === today);
      }}
      className="
        pl-10 pr-3 py-2 rounded-lg 
        bg-slate-100 dark:bg-emerald-600 
        text-emerald-600 dark:text-slate-100 
        focus:outline-none focus:ring-2 focus:ring-emerald-600
      "
    />
  </div>

  {!isToday && (
    <button
      onClick={() => {
        const t = format(new Date(), "yyyy-MM-dd");
        setSelectedDate(t);
        setIsToday(true);
      }}
      className="text-xs px-3 py-2 rounded-lg bg-emerald-600 text-white"
    >
      Today
    </button>
  )}
</div>


            {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search team or league..."
                  className="
                    w-full px-3 py-2 
                    rounded-lg 
                    bg-slate-100 dark:bg-slate-700 
                    text-slate-900 dark:text-slate-100 
                    placeholder-slate-500 dark:placeholder-slate-400
                    focus:outline-none focus:ring-2 focus:ring-emerald-600
                  "
                />
              </div>

            {/* {fixtures.map((item, idx) => { */}
            {filteredFixtures.map((item, idx) => {

              if (item.type === 'header') {
                return (
                  <div key={`h-${idx}`}>
                    <button onClick={() => {
                        const sampleFixture = grouped[item.league]?.[0];
                        openStandings(sampleFixture?.league);
                      }}
                      className="text-emerald-600 font-semibold text-sm mb-2">
                      {item.league}
                    </button>
                  </div>
                );
              }

              const fi = item.data;
              return (
                <div key={`f-${idx}`}> 
                  <FixtureCard fixture={fi} onOpenFixture={openFixture} onOpenLeague={(l) => openStandings(l)} />

                  {/* Banner placeholder after every 4th fixture */}
                  {/* {(idx + 1) % 4 === 0 && (
                    <div className="mt-3 mb-3 flex items-center justify-center rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 p-4">
                      <div className="text-xs text-slate-500">Advertisement</div>
                    </div>
                  )} */}
                </div>
              );
            })}
          </div>
        )}

        {/* Detail Modal */}
        {selectedFixture && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedFixture(null)} />
            <div className="relative w-full md:w-3/4 max-w-3xl bg-white dark:bg-slate-800 rounded-t-xl md:rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <div className="font-semibold text-slate-900 dark:text-slate-100">{selectedFixture.homeTeam?.name} vs {selectedFixture.awayTeam?.name}</div>
                <button onClick={() => setSelectedFixture(null)} className="text-red-500 font-bold">✕</button>
              </div>

              <div className="flex gap-2 p-3">
                {['lineups','h2h','stats','predictions','standings','events'].map((d) => (
                  <button key={d} onClick={() => loadDetail(d)} className={`flex-1 text-xs max-md:text-[8px] py-1 rounded-lg ${detailTab === d ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200'}`}>
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="p-4 max-h-[60vh] overflow-auto">
                {detailLoading ? (
                  <div className="text-center py-10 text-emerald-600">Loading…</div>
                ) : detailData ? (
                  <div className="space-y-4">
                    {detailTab === 'lineups' && Array.isArray(detailData) && detailData.length > 0 ? (
                      detailData.map((team, i) => (
                        <div key={i}>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{team.team} ({team.formation})</div>
                          <div className="text-sm text-white">Coach: <span className="text-emerald-600">{team.coach}</span></div>
                          <div className="text-emerald-600 font-semibold mt-2">Starting XI</div>
                          {team.startXI?.map((p, j) => <div key={j} className="text-sm text-white">{p}</div>)}
                          <div className="text-emerald-600 font-semibold mt-2">Substitutes</div>
                          {team.substitutes?.map((p, j) => <div key={j} className="text-sm text-white">{p}</div>)}
                        </div>
                      ))
                    ) : detailTab === 'h2h' && Array.isArray(detailData) && detailData.length > 0 ? (
                      detailData.map((m, i) => (
                        <div key={i} className="text-sm">
                          <div className="text-emerald-600">{format(new Date(m.date), "dd MMM yyyy, HH:mm")}</div>
                          <div className="text-slate-900 dark:text-slate-100">{m.home} {m.score} {m.away}</div>
                          <div className="text-emerald-600">Winner: {m.winner}</div>
                        </div>
                      ))
                    ) : detailTab === 'stats' && Array.isArray(detailData) && detailData.length > 0 ? (
                      detailData.map((team, i) => (
                        <div key={i}>
                          <div className="text-emerald-600 font-semibold">{team.team}</div>
                          {team.stats?.map((s, j) => <div key={j} className="text-sm text-white">{s.type}: {s.value}</div>)}
                        </div>
                      ))
                      
                    ) : detailTab === 'predictions' && detailData ? (
                      <div>
                        <div className="text-sm text-white">Winner: {detailData.winner}</div>
                        <div className="text-sm text-white">Advice: {detailData.advice}</div>
                        <div className="text-emerald-600">Home {detailData.percent?.home} | Draw {detailData.percent?.draw} | Away {detailData.percent?.away}</div>
                      </div>
                     ) : detailTab === 'events' ? (
  // <EventsList events={detailData}  />
  <EventsList events={detailData} colors={defaultColors} />



                    ) : detailTab === 'standings' && Array.isArray(detailData) && detailData.length > 0 ? (
                      <StandingsTable standings={detailData} />
                    ) : (
                      <div className="text-center text-slate-500">No data available.</div>
                    )}
                  </div>
                ) : (
                  !detailLoading && <div className="text-center text-slate-500">No data available.</div>
                )}
              </div>
              

            </div>
          </div>
        )}

        {/* Standings Modal */}
        {standingsOpen && (
          <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setStandingsOpen(false)} />
            <div className="relative w-full md:w-3/4 max-w-2xl bg-white dark:bg-slate-800 rounded-t-xl md:rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                <div className="font-semibold text-slate-900 dark:text-slate-100">{selectedLeague?.name ?? 'Standings'}</div>
                <button onClick={() => setStandingsOpen(false)} className="text-red-500 font-bold">✕</button>
              </div>

              <div className="p-4 max-h-[65vh] overflow-auto">
                {standingsLoading ? (
                  <div className="text-center py-6 text-emerald-600">Loading…</div>
                ) : (
                  <StandingsTable standings={standingsData} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
