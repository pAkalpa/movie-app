"use client";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useGetFetchQuery = (key: QueryKey) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(key);
};
