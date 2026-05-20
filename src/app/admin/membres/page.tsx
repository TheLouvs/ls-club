import { MEMBERS } from "@/lib/mock-admin";
import { listUsers } from "@/lib/kv";
import { MembresClient, type MemberRow } from "./MembresClient";

const AVATAR_COLORS = ["#C9A84C", "#7ACCA0", "#7AAEE8", "#E08050", "#A07AE8"];

function colorFor(email: string): string {
  let hash = 0;
  for (const c of email) hash = (hash * 31 + c.charCodeAt(0)) & 0xff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default async function MembresPage() {
  const kvUsers = await listUsers().catch(() => [] as Awaited<ReturnType<typeof listUsers>>);

  const realMembers: MemberRow[] = kvUsers.map((u) => ({
    id: u.email,
    name: `${u.prenom} ${u.nom}`,
    email: u.email,
    initials: `${u.prenom[0]}${u.nom[0]}`.toUpperCase(),
    avatarColor: colorFor(u.email),
    level: "debutant",
    subscription: "active",
    lastActive: u.createdAt,
    totalVideosWatched: 0,
    streak: 0,
  }));

  const mockMembers: MemberRow[] = MEMBERS.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    initials: m.initials,
    avatarColor: m.avatarColor,
    level: m.level as MemberRow["level"],
    subscription: m.subscription as MemberRow["subscription"],
    lastActive: m.lastActive,
    totalVideosWatched: m.totalVideosWatched,
    streak: m.streak,
  }));

  const allMembers = [...realMembers, ...mockMembers];

  return <MembresClient members={allMembers} />;
}
