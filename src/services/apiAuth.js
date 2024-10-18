import supabase from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error('Error signing up:', error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error('Error logging in:', error.message);

  return data;
}

export async function getCurrentUser() {
  /**
   * Retrieves the current user's session from Supabase.
   * @returns {Promise<{ session: any } | null>} The current user's session, or null if no session is active.
   */
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  /**
   * Retrieves the current user's information from Supabase.
   * @returns {Promise<{ user: any } | null>} The current user's information, or null if no user is logged in.
   */
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error('Error logging in:', error.message);

  return data?.user;
}

export function logout() {
  const { error } = supabase.auth.signOut();
  if (error) throw new Error('Error logging out:', error.message);
}
