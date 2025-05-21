export const projectUniqueId = (chainId: number, projectId: bigint) => {
  return `${chainId}-${projectId.toString()}`;
};
