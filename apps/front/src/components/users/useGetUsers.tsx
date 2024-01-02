import { useEffect, useState } from "react";
import { tRPC } from "../../tRPC";

const t = tRPC;

const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await t.getUsersService.query();
        setUsers(userData);
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { users, loading, error };
};

export default useGetUsers;
