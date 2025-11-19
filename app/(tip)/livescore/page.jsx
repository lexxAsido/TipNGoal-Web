"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react";
import apiConfig from '@/app/Services/apiConfig'

const {
  getLiveFixtures,
  getTodayFixtures,
  getLineups,
  getHeadToHead,
  getStats,
  getPredictions,
  getStandingsByFixture,
  groupFixturesByLeague,
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
];

const cacheKeyFor = (k) => `tipngoal__${k}`;

function formatTime(iso) {
  try {
    const d = new Date(iso);
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
          <div className="text-sm text-slate-900 dark:text-slate-100 text-center">{fixture.homeTeam?.name}</div>
        </div>

        <div className="w-1/3 text-center">
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{fixture.score?.home ?? '-'} - {fixture.score?.away ?? '-'}</div>
          <div
  className={`text-xs mt-1 ${
    fixture.elapsed ? 'text-emerald-600' : 'text-slate-500'
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
          <div className="text-sm text-slate-900 dark:text-slate-100 text-center">{fixture.awayTeam?.name}</div>
        </div>
      </div>
    </button>
  );
});

const StandingsTable = React.memo(({ standings }) => {
  if (!standings?.length) return <div className="p-4 text-slate-500">No standings provided.</div>;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm">
      <div className="flex justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500">
        <div className="w-8">#</div>
        <div className="flex-1">Team</div>
        <div className="w-12 text-right">Pts</div>
      </div>
      {standings.map((row, idx) => (
        <div key={row.team?.id ?? idx} className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
          <div className="w-8 text-sm text-slate-800 dark:text-slate-100">{row.rank ?? idx + 1}</div>
          <div className="flex-1 flex items-center gap-3">
            {row.team?.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.team.logo} alt="logo" className="w-6 h-6 rounded-full" />
            )}
            <div className="text-sm text-slate-800 dark:text-slate-100 truncate">{row.team?.name ?? '—'}</div>
          </div>
          <div className="w-12 text-right text-sm text-slate-800 dark:text-slate-100">{row.points ?? '-'}</div>
        </div>
      ))}
    </div>
  );
});

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
    try {
      const [live, today] = await Promise.all([
        loadAndCache(`${sport}_live`, () => getLiveFixtures(sport)),
        loadAndCache(`${sport}_today`, () => getTodayFixtures(sport)),
      ]);

      const merged = [...Object.values(live || {}).flat(), ...Object.values(today || {}).flat()];
      const grouped = groupFixturesByLeague(merged);

      const allLeagues = Object.keys(grouped);
      const matchedTopLeagues = [];
      TOP_LEAGUES.forEach((tl) => {
        const match = allLeagues.find((l) => l.toLowerCase().includes(tl.toLowerCase()));
        if (match && !matchedTopLeagues.includes(match)) matchedTopLeagues.push(match);
      });
      const otherLeagues = allLeagues.filter((l) => !matchedTopLeagues.includes(l));
      const orderedLeagues = [...matchedTopLeagues, ...otherLeagues];

      const flatData = orderedLeagues.flatMap((league) => {
        const fixturesForLeague = grouped[league];
        if (!fixturesForLeague || !Array.isArray(fixturesForLeague)) return [];
        return [{ type: 'header', league }, ...fixturesForLeague.map((f) => ({ type: 'fixture', data: f }))];
      });

      setFixtures(flatData);
    } catch (err) {
      console.error('fetchFixtures', err);
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  }, [sport, loadAndCache]);

  useEffect(() => {
    setFixtures([]);
    fetchFixtures();
  }, [sport, fetchFixtures]);

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

  const loadDetail = useCallback(
  async (tabKey) => {
    if (!selectedFixture) return;

    setDetailTab(tabKey);

    // use functional read to avoid stale closure AND avoid triggering re-creation
    setDetailCache((prev) => {
      if (prev[tabKey]) {
        setDetailData(prev[tabKey]);
        return prev;
      }
      return prev;
    });

    if (detailCache[tabKey]) return;

    setDetailLoading(true);

    try {
      const fixtureId = selectedFixture.id;
      let res = null;

      if (tabKey === "lineups") {
        res = await getLineups(fixtureId, sport);
      } else if (tabKey === "h2h") {
        res = await getHeadToHead(
          selectedFixture.homeTeam?.id,
          selectedFixture.awayTeam?.id,
          sport
        );
      } else if (tabKey === "stats") {
        res = await getStats(fixtureId, sport);
      } else if (tabKey === "predictions") {
        res = await getPredictions(fixtureId, sport);
      } else if (tabKey === "standings") {
        res = await getStandingsByFixture(selectedFixture, sport);
      }

      setDetailCache((prev) => ({ ...prev, [tabKey]: res }));
      setDetailData(res);
    } catch (e) {
      console.error("loadDetail", e);
      setDetailData(null);
    } finally {
      setDetailLoading(false);
    }
  },
  [selectedFixture, sport] // ❗ NO detailCache here
);


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
    setSelectedLeague(league);
    setStandingsOpen(true);
    setStandingsLoading(true);
    try {
      const res = await getStandingsByFixture({ league }, sport);
      setStandingsData(res || []);
    } catch (e) {
      console.error(e);
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
    className="
      whitespace-nowrap
      ml-auto
      px-3 py-2
      rounded-lg
      bg-emerald-600
      text-white font-bold
      md:text-sm
      text-[10px]      /* mobile */
    "
  >
    {refreshing ? "Refreshing..." : "Refresh"}
  </button>
</div>


        {loading ? (
          
          <div className="py-20 text-center text-emerald-600">Loading fixtures…</div>
        ) : (
          <div className="space-y-3">
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
                    <button onClick={() => openStandings({ name: item.league })} className="text-emerald-600 font-semibold text-sm mb-2">
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
                {['lineups','h2h','stats','predictions','standings'].map((d) => (
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
                          <div className="text-sm text-slate-500">Coach: <span className="text-emerald-600">{team.coach}</span></div>
                          <div className="text-emerald-600 font-semibold mt-2">Starting XI</div>
                          {team.startXI?.map((p, j) => <div key={j} className="text-sm text-white">{p}</div>)}
                          <div className="text-emerald-600 font-semibold mt-2">Substitutes</div>
                          {team.substitutes?.map((p, j) => <div key={j} className="text-sm text-white">{p}</div>)}
                        </div>
                      ))
                    ) : detailTab === 'h2h' && Array.isArray(detailData) && detailData.length > 0 ? (
                      detailData.map((m, i) => (
                        <div key={i} className="text-sm">
                          <div className="text-slate-500">{m.date}</div>
                          <div className="text-slate-900 dark:text-slate-100">{m.home} {m.score} {m.away}</div>
                          <div className="text-emerald-600">Winner: {m.winner}</div>
                        </div>
                      ))
                    ) : detailTab === 'stats' && Array.isArray(detailData) && detailData.length > 0 ? (
                      detailData.map((team, i) => (
                        <div key={i}>
                          <div className="text-emerald-600 font-semibold">{team.team}</div>
                          {team.stats?.map((s, j) => <div key={j} className="text-sm">{s.type}: {s.value}</div>)}
                        </div>
                      ))
                    ) : detailTab === 'predictions' && detailData ? (
                      <div>
                        <div className="text-sm text-white">Winner: {detailData.winner}</div>
                        <div className="text-sm text-white">Advice: {detailData.advice}</div>
                        <div className="text-emerald-600">Home {detailData.percent?.home} | Draw {detailData.percent?.draw} | Away {detailData.percent?.away}</div>
                      </div>
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
