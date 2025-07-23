import { and, count, desc, eq, notInArray } from "ponder";
import { db } from "ponder:api";
import { activityLog } from "ponder:schema";
import { getTestnetChainsAndRpcUrls } from "../../lib/testnet-config";
import { getProfile } from "../../lib/whisk/profile";

export async function getActivityLog(
  chainId: number,
  projectId: number,
  limit: number = 50,
  offset: number = 0
) {
  const project = await db.query.project.findFirst({
    columns: { suckerGroupId: true },
    where: (project, { eq, and }) =>
      and(eq(project.projectId, projectId), eq(project.chainId, chainId)),
  });

  if (!project) return { activities: [], hasMore: false };

  const activities = await db.query.activityLog.findMany({
    where: (t) =>
      and(
        eq(t.suckerGroupId, project.suckerGroupId),
        notInArray(
          t.chainId,
          Object.values(getTestnetChainsAndRpcUrls()).map((c) => c.id)
        )
      ),
    orderBy: (t) => [desc(t.timestamp)],
    limit,
    offset,
  });

  const totalCount = await db
    .select({ count: count() })
    .from(activityLog)
    .where(eq(activityLog.suckerGroupId, project.suckerGroupId));

  const total = totalCount[0]?.count ?? 0;
  const hasMore = total > offset + limit;

  const activitiesWithProfiles = await Promise.all(
    activities.map(async (activity) => {
      const profile = await getProfile(activity.user);
      return { ...activity, profile };
    })
  );

  return { activities: activitiesWithProfiles, pagination: { limit, offset, hasMore, total } };
}
