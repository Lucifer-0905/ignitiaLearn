import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return {
    user,
    isLoading: false,
    isAuthenticated: !!user,
  };
}
