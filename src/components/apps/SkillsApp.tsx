import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Star,
  GitFork,
  Code2,
  Terminal,
  Search,
  Sparkles,
  Users,
  FolderGit2,
  ExternalLink,
  RefreshCw,
  Cpu,
  Brain,
  Database,
  Layers,
  Wrench,
  Flame,
} from 'lucide-react';
import {
  technicalSkillGroups,
  softSkills,
  bio,
} from '@/data/portfolioData';
import type { AppId } from '@/types/desktop';

interface Props {
  onOpenApp?: (id: AppId) => void;
}

interface GitHubUserStats {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  bio: string;
}

interface GitHubRepoItem {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  homepage: string | null;
}

// Fallback data when offline or rate limited
const FALLBACK_USER: GitHubUserStats = {
  login: 'chokolattee',
  public_repos: 12,
  followers: 4,
  following: 5,
  avatar_url: '/avatar.jpg',
  html_url: 'https://github.com/chokolattee',
  bio: '4th year IT Student • Aspiring Full Stack Developer',
};

const FALLBACK_REPOS: GitHubRepoItem[] = [
  {
    id: 1,
    name: 'MilkLink',
    description: 'A mobile community application empowering breastfeeding mothers with milk donation logistics and peer support.',
    html_url: 'https://github.com/chokolattee',
    stargazers_count: 5,
    forks_count: 1,
    language: 'Dart',
    updated_at: '2026-11-15T00:00:00Z',
    homepage: null,
  },
  {
    id: 2,
    name: 'Avocare',
    description: 'Automated avocado crop disease and pest identification mobile system utilizing machine learning classification.',
    html_url: 'https://github.com/chokolattee/avocare',
    stargazers_count: 4,
    forks_count: 0,
    language: 'Python',
    updated_at: '2026-10-20T00:00:00Z',
    homepage: null,
  },
  {
    id: 3,
    name: 'EduPortal-LMS',
    description: 'Modern university learning management system with course syllabi, assignments, and grade tracking.',
    html_url: 'https://github.com/chokolattee/eduportal-lms',
    stargazers_count: 8,
    forks_count: 2,
    language: 'TypeScript',
    updated_at: '2026-09-12T00:00:00Z',
    homepage: 'https://eduportal-lms.vercel.app/',
  },
  {
    id: 4,
    name: 'PitWall',
    description: 'Formula 1 telemetry dashboard and real-time Grand Prix lap visualizer with sector speed metrics.',
    html_url: 'https://github.com/chokolattee/pitwall-f1',
    stargazers_count: 6,
    forks_count: 1,
    language: 'JavaScript',
    updated_at: '2026-08-30T00:00:00Z',
    homepage: null,
  },
  {
    id: 5,
    name: 'kpopstore',
    description: 'K-pop merchandise e-commerce platform built with PHP and MySQL backend architecture.',
    html_url: 'https://github.com/chokolattee/kpopstore',
    stargazers_count: 3,
    forks_count: 0,
    language: 'PHP',
    updated_at: '2026-06-15T00:00:00Z',
    homepage: null,
  },
];

type MainTab = 'technical' | 'github' | 'soft';

export default function SkillsApp({ onOpenApp }: Props) {
  const [activeTab, setActiveTab] = useState<MainTab>('technical');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // GitHub Live State
  const [userStats, setUserStats] = useState<GitHubUserStats>(FALLBACK_USER);
  const [repos, setRepos] = useState<GitHubRepoItem[]>(FALLBACK_REPOS);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch actual GitHub live stats
  const fetchGitHubStats = async () => {
    setIsLoadingGithub(true);
    setApiError(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/chokolattee', {
          headers: { Accept: 'application/vnd.github.v3+json' },
        }),
        fetch('https://api.github.com/users/chokolattee/repos?per_page=100&sort=updated', {
          headers: { Accept: 'application/vnd.github.v3+json' },
        }),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUserStats({
          login: userData.login || 'chokolattee',
          public_repos: userData.public_repos ?? FALLBACK_USER.public_repos,
          followers: userData.followers ?? FALLBACK_USER.followers,
          following: userData.following ?? FALLBACK_USER.following,
          avatar_url: userData.avatar_url || '/avatar.jpg',
          html_url: userData.html_url || 'https://github.com/chokolattee',
          bio: userData.bio || FALLBACK_USER.bio,
        });
      }

      if (reposRes.ok) {
        const repoData: any[] = await reposRes.json();
        if (Array.isArray(repoData) && repoData.length > 0) {
          const mappedRepos: GitHubRepoItem[] = repoData.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            stargazers_count: r.stargazers_count || 0,
            forks_count: r.forks_count || 0,
            language: r.language,
            updated_at: r.updated_at,
            homepage: r.homepage,
          }));
          setRepos(mappedRepos);
        }
      }

      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err: any) {
      console.warn('GitHub fetch error (using fallback):', err);
      setApiError('API rate-limit or network offline. Showing cached GitHub data.');
    } finally {
      setIsLoadingGithub(false);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  // Compute live aggregates from GitHub repos
  const totalStars = useMemo(
    () => repos.reduce((acc, r) => acc + r.stargazers_count, 0),
    [repos]
  );
  const totalForks = useMemo(
    () => repos.reduce((acc, r) => acc + r.forks_count, 0),
    [repos]
  );

  // Compute language distribution from live GitHub repos
  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1;
      }
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts)
      .map(([lang, count]) => ({
        lang,
        count,
        percent: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [repos]);

  // Categories list for Technical Skills filter
  const categories = useMemo(() => {
    return ['All', ...technicalSkillGroups.map((g) => g.category)];
  }, []);

  // Filtered technical skill groups based on search & category chip
  const filteredGroups = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return technicalSkillGroups
      .filter((g) => selectedCategory === 'All' || g.category === selectedCategory)
      .map((g) => {
        const filteredItems = g.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            (item.desc && item.desc.toLowerCase().includes(q)) ||
            g.category.toLowerCase().includes(q)
        );
        return { ...g, items: filteredItems };
      })
      .filter((g) => g.items.length > 0);
  }, [searchQuery, selectedCategory]);

  // Icon mapping for Technical Categories
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code2 size={13} className="text-cachy-teal" />;
      case 'Frameworks & Libraries':
        return <Layers size={13} className="text-cachy-cyan" />;
      case 'Databases':
        return <Database size={13} className="text-yellow-400" />;
      case 'Machine Learning':
        return <Brain size={13} className="text-purple-400" />;
      case 'Tools & Platforms':
        return <Wrench size={13} className="text-rose-400" />;
      case 'Technical Concepts':
        return <Cpu size={13} className="text-emerald-400" />;
      default:
        return <Terminal size={13} className="text-cachy-subtext" />;
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-xs overflow-hidden bg-cachy-dark/95 select-none">
      {/* ── Top System Monitor Telemetry Banner ────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2 bg-black/40 border-b border-cachy-border/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cachy-teal animate-pulse" />
            <span className="text-[11px] font-bold text-cachy-teal tracking-wide uppercase">
              Skill & Telemetry Monitor
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-cachy-subtext bg-cachy-surface/60 px-2 py-0.5 rounded border border-cachy-border/20">
            <span>Target:</span>
            <span className="text-cachy-text font-semibold">@choko</span>
            <span className="text-cachy-border">|</span>
            <span className="text-cachy-cyan">BS IT 4th Year</span>
          </div>
        </div>

        {/* Live sync badge & GitHub quick link */}
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-cachy-subtext hidden md:inline">
              synced {lastUpdated}
            </span>
          )}
          <button
            onClick={fetchGitHubStats}
            disabled={isLoadingGithub}
            className="flex items-center gap-1 px-2 py-1 rounded bg-cachy-surface/80 border border-cachy-border/20 hover:border-cachy-teal/40 text-[10px] text-cachy-text hover:text-cachy-teal transition-all active:scale-95 disabled:opacity-50"
            title="Refresh GitHub Live Stats"
          >
            <RefreshCw size={11} className={isLoadingGithub ? 'animate-spin text-cachy-teal' : ''} />
            <span className="hidden sm:inline">Sync API</span>
          </button>
          <a
            href="https://github.com/chokolattee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded bg-cachy-teal/10 border border-cachy-teal/30 text-cachy-teal hover:bg-cachy-teal/20 transition-all text-[10px] font-semibold"
          >
            <Github size={11} />
            <span>chokolattee</span>
            <ExternalLink size={9} />
          </a>
        </div>
      </div>

      {/* ── Main Tab Navigation ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-cachy-border/20 bg-cachy-surface/30 px-3">
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('technical')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'technical'
              ? 'bg-cachy-teal text-cachy-dark font-bold shadow-sm'
              : 'text-cachy-subtext hover:text-cachy-text hover:bg-cachy-surface/60'
              }`}
          >
            <Code2 size={13} />
            <span>Technical Skills</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
              {technicalSkillGroups.reduce((acc, g) => acc + g.items.length, 0)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'github'
              ? 'bg-cachy-cyan text-cachy-dark font-bold shadow-sm'
              : 'text-cachy-subtext hover:text-cachy-text hover:bg-cachy-surface/60'
              }`}
          >
            <Github size={13} />
            <span>GitHub Live Stats</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
              {repos.length} Repos
            </span>
          </button>

          <button
            onClick={() => setActiveTab('soft')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'soft'
              ? 'bg-purple-400 text-cachy-dark font-bold shadow-sm'
              : 'text-cachy-subtext hover:text-cachy-text hover:bg-cachy-surface/60'
              }`}
          >
            <Sparkles size={13} />
            <span>Soft Skills</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
              {softSkills.length}
            </span>
          </button>
        </div>

        {/* Global interactive search bar */}
        {activeTab === 'technical' && (
          <div className="relative w-40 sm:w-56 hidden sm:block">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cachy-subtext" />
            <input
              type="text"
              placeholder="Search skill / tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-2.5 py-1 text-[11px] bg-black/30 border border-cachy-border/25 rounded-md text-cachy-text placeholder:text-cachy-subtext/50 focus:outline-none focus:border-cachy-teal transition-all font-mono"
            />
          </div>
        )}
      </div>

      {/* ── Tab Content Views ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-0">
        <AnimatePresence mode="wait">
          {/* ════════════ TECHNICAL SKILLS VIEW ════════════ */}
          {activeTab === 'technical' && (
            <motion.div
              key="technical"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all border ${selectedCategory === cat
                      ? 'bg-cachy-teal/15 text-cachy-teal border-cachy-teal/50 font-bold'
                      : 'bg-cachy-surface/50 text-cachy-subtext border-cachy-border/20 hover:text-cachy-text hover:bg-cachy-surface'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Skill Groups Grid — hero boxes, no percentages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredGroups.map((group) => (
                  <div
                    key={group.category}
                    className="p-3.5 rounded-xl bg-cachy-surface/40 border border-cachy-border/25 hover:border-cachy-teal/30 transition-all flex flex-col gap-2.5 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-cachy-border/15">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(group.category)}
                        <span className="font-bold text-cachy-text text-xs tracking-wide">
                          {group.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-cachy-subtext font-mono">
                        {group.items.length} items
                      </span>
                    </div>

                    {/* Plain tag pills — no percentages, no bars */}
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item.name}
                          className="px-2.5 py-1 rounded-lg bg-black/30 border border-cachy-border/20 hover:border-cachy-teal/40 hover:bg-cachy-teal/5 transition-colors text-cachy-text text-[11px] font-mono cursor-default"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════════════ GITHUB LIVE STATS VIEW ════════════ */}
          {activeTab === 'github' && (
            <motion.div
              key="github"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              {apiError && (
                <div className="p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] flex items-center justify-between">
                  <span>{apiError}</span>
                  <button
                    onClick={fetchGitHubStats}
                    className="underline text-[10px] font-semibold hover:text-white"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* GitHub KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-cachy-surface/50 border border-cachy-border/25 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-cachy-subtext text-[10px]">
                    <span>Public Repos</span>
                    <FolderGit2 size={13} className="text-cachy-teal" />
                  </div>
                  <span className="text-xl font-bold font-mono text-cachy-text">
                    {userStats.public_repos}
                  </span>
                  <span className="text-[9px] text-cachy-subtext">Active codebases</span>
                </div>

                <div className="p-3 rounded-xl bg-cachy-surface/50 border border-cachy-border/25 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-cachy-subtext text-[10px]">
                    <span>Total Stars</span>
                    <Star size={13} className="text-yellow-400" />
                  </div>
                  <span className="text-xl font-bold font-mono text-cachy-text">
                    {totalStars}
                  </span>
                  <span className="text-[9px] text-cachy-subtext">Across public repos</span>
                </div>

                <div className="p-3 rounded-xl bg-cachy-surface/50 border border-cachy-border/25 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-cachy-subtext text-[10px]">
                    <span>Forks</span>
                    <GitFork size={13} className="text-cachy-cyan" />
                  </div>
                  <span className="text-xl font-bold font-mono text-cachy-text">
                    {totalForks}
                  </span>
                  <span className="text-[9px] text-cachy-subtext">Community forks</span>
                </div>

                <div className="p-3 rounded-xl bg-cachy-surface/50 border border-cachy-border/25 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-cachy-subtext text-[10px]">
                    <span>Followers</span>
                    <Users size={13} className="text-purple-400" />
                  </div>
                  <span className="text-xl font-bold font-mono text-cachy-text">
                    {userStats.followers}
                  </span>
                  <span className="text-[9px] text-cachy-subtext">GitHub network</span>
                </div>
              </div>

              {/* Language Distribution Breakdown */}
              <div className="p-3.5 rounded-xl bg-cachy-surface/40 border border-cachy-border/25 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cachy-text text-xs flex items-center gap-1.5">
                    <Code2 size={13} className="text-cachy-teal" />
                    Live Language Breakdown (from GitHub Repos)
                  </span>
                  <span className="text-[10px] text-cachy-subtext font-mono">
                    {languageStats.length} Languages Identified
                  </span>
                </div>

                {/* Multi-segment progress bar */}
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-black/40">
                  {languageStats.map((item, idx) => {
                    const colors = ['#00d4aa', '#0ea5e9', '#a78bfa', '#f9e2af', '#fab387', '#f38ba8'];
                    const color = colors[idx % colors.length];
                    return (
                      <div
                        key={item.lang}
                        style={{ width: `${item.percent}%`, backgroundColor: color }}
                        title={`${item.lang}: ${item.percent}% (${item.count} repos)`}
                        className="h-full"
                      />
                    );
                  })}
                </div>

                {/* Legend badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {languageStats.map((item, idx) => {
                    const colors = ['#00d4aa', '#0ea5e9', '#a78bfa', '#f9e2af', '#fab387', '#f38ba8'];
                    const color = colors[idx % colors.length];
                    return (
                      <div
                        key={item.lang}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/30 border border-cachy-border/20 text-[10px]"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-cachy-text font-medium">{item.lang}</span>
                        <span className="text-cachy-subtext font-mono">({item.percent}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Public Repositories List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="font-bold text-cachy-text text-xs flex items-center gap-1.5">
                    <Flame size={13} className="text-orange-400" />
                    Public GitHub Repositories ({repos.length})
                  </span>
                  <span className="text-[10px] text-cachy-subtext font-mono">
                    Sorted by last updated
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-cachy-surface/40 border border-cachy-border/20 hover:border-cachy-teal/40 hover:bg-cachy-surface/80 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cachy-text text-xs group-hover:text-cachy-teal transition-colors flex items-center gap-1">
                            {repo.name}
                            <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                          {repo.language && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-cachy-teal/15 text-cachy-teal font-mono border border-cachy-teal/30">
                              {repo.language}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-cachy-subtext line-clamp-2 leading-relaxed">
                          {repo.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-cachy-border/10 text-[9px] text-cachy-subtext font-mono">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Star size={10} className="text-yellow-400" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={10} className="text-cachy-cyan" />
                            {repo.forks_count}
                          </span>
                        </div>
                        <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════ SOFT SKILLS VIEW ════════════ */}
          {activeTab === 'soft' && (
            <motion.div
              key="soft"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-3.5"
            >
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-cachy-text text-xs leading-relaxed">
                <span className="font-bold text-purple-300">Core Professional Competencies:</span>{' '}
                Demonstrated across university team lead roles, cross-platform software engineering capstones, and agile project delivery.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {softSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-3.5 rounded-xl bg-cachy-surface/50 border border-cachy-border/25 hover:border-purple-400/40 hover:bg-cachy-surface transition-all flex flex-col justify-between gap-2 shadow-sm"
                  >
                    <div className="space-y-1.5">
                      <span className="font-bold text-cachy-text text-xs block">
                        {skill.name}
                      </span>
                      <p className="text-[10px] text-cachy-subtext leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-cachy-border/15 flex items-center justify-between text-[9px] font-mono text-purple-300/80">
                      <span>Verified Trait</span>
                      <span>Active</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Status Bar ───────────────────────────────────────────── */}
      <div className="px-3 py-1.5 bg-black/40 border-t border-cachy-border/20 flex items-center justify-between text-[10px] text-cachy-subtext font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cachy-teal" />
            <span>GitHub: Online</span>
          </span>
          <span className="hidden sm:inline">
            Status:{' '}
            <span className="text-cachy-teal font-semibold">Ready for IT Internship</span>
          </span>
        </div>
      </div>
    </div>
  );
}
