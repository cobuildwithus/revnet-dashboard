import { and, eq, ne, or, sql } from "ponder";
import { type Context, type Event, ponder } from "ponder:registry";
import { project, sucker, suckerGroup } from "ponder:schema";

ponder.on("JBSuckersRegistry:SuckerDeployedFor", suckerDeployedFor);

async function suckerDeployedFor(params: {
  event: Event<"JBSuckersRegistry:SuckerDeployedFor">;
  context: Context<"JBSuckersRegistry:SuckerDeployedFor">;
}) {
  const { context, event } = params;
  const { args } = event;
  const { projectId: _projectId, sucker: address } = args;
  const projectId = Number(_projectId);
  const chainId = context.chain.id;

  // Find the project that emitted this event
  const thisProject = await context.db.find(project, {
    chainId,
    projectId,
  });

  if (!thisProject) {
    throw new Error(`Missing project ${projectId} on chain ${chainId}`);
  }

  // Create unique identifier for this project
  const thisProjectUniqueId = `${chainId}-${projectId}`;

  // Normalize address to lowercase for consistent comparisons
  const normalizedAddress = address.toLowerCase() as `0x${string}`;

  // Look for overlapping suckers and groups
  // 1. Check if this address is already used by another project
  const addressMatchingSucker = await context.db.sql.query.sucker.findFirst({
    where: eq(sucker.address, normalizedAddress),
    with: { project: true },
  });

  // 2. Find all suckers belonging to this project
  const projectMatchingSuckers = await context.db.sql.query.sucker.findMany({
    where: and(eq(sucker.projectId, projectId), eq(sucker.chainId, chainId)),
    with: { project: true },
  });

  // 3. Find any groups that contain this address or project
  const matchingGroups = await context.db.sql.query.suckerGroup.findMany({
    where: sql`${normalizedAddress} = ANY("addresses") OR ${thisProjectUniqueId} = ANY("projects")`,
  });

  // If we found any overlaps, consolidate into a new group
  if (
    addressMatchingSucker ||
    projectMatchingSuckers.length ||
    matchingGroups.length
  ) {
    // Collect all unique addresses from matching suckers and groups
    const groupAddresses = [normalizedAddress];
    for (const s of projectMatchingSuckers) {
      if (!groupAddresses.includes(s.address)) {
        groupAddresses.push(s.address);
      }
    }

    // Collect all unique projects from matching suckers and groups
    const groupProjects = [thisProjectUniqueId];
    if (addressMatchingSucker?.project) {
      const addressMatchingProjectId = `${addressMatchingSucker.project.chainId}-${addressMatchingSucker.project.projectId}`;
      if (!groupProjects.includes(addressMatchingProjectId)) {
        groupProjects.push(addressMatchingProjectId);
      }
    }
    for (const s of projectMatchingSuckers) {
      const sProjectId = `${s.project.chainId}-${s.project.projectId}`;
      if (!groupProjects.includes(sProjectId)) {
        groupProjects.push(sProjectId);
      }
    }

    // Add all addresses and projects from matching groups
    for (const g of matchingGroups) {
      for (const a of g.addresses) {
        const lowerA = a.toLowerCase() as `0x${string}`;
        if (!groupAddresses.includes(lowerA)) {
          groupAddresses.push(lowerA);
        }
      }
      for (const p of g.projects) {
        if (!groupProjects.includes(p)) {
          groupProjects.push(p);
        }
      }
    }

    // Create a new group with all consolidated addresses and projects
    const newSuckerGroup = await context.db.insert(suckerGroup).values({
      projects: groupProjects,
      addresses: groupAddresses as `0x${string}`[],
      createdAt: Number(event.block.timestamp),
    });

    // Update all affiliated projects to point to the new group
    for (const projectUniqueId of groupProjects) {
      const parts = projectUniqueId.split("-");
      if (parts.length !== 2) continue;

      const pChainId = Number(parts[0]);
      const pProjectId = Number(parts[1]);

      if (Number.isNaN(pChainId) || Number.isNaN(pProjectId)) continue;

      const _project = await context.db.find(project, {
        chainId: pChainId,
        projectId: pProjectId,
      });

      if (_project) {
        await context.db
          .update(project, {
            chainId: pChainId,
            projectId: pProjectId,
          })
          .set({
            suckerGroupId: newSuckerGroup.id,
          });
      }
    }

    // Delete old groups that have been consolidated
    if (matchingGroups.length > 0) {
      await context.db.sql
        .delete(suckerGroup)
        .where(
          and(
            ne(suckerGroup.id, newSuckerGroup.id),
            or(
              sql`${normalizedAddress} = ANY("addresses")`,
              sql`${thisProjectUniqueId} = ANY("projects")`
            )
          )
        );
    }
  } else {
    // No overlaps found, create a new group with just this project and address
    const newSuckerGroup = await context.db.insert(suckerGroup).values({
      projects: [thisProjectUniqueId],
      addresses: [normalizedAddress],
      createdAt: Number(event.block.timestamp),
    });

    // Update the project to point to the new group
    await context.db.update(project, thisProject).set({
      suckerGroupId: newSuckerGroup.id,
    });
  }

  // Finally, record the sucker itself
  await context.db.insert(sucker).values({
    chainId,
    projectId,
    address: normalizedAddress,
  });
}
