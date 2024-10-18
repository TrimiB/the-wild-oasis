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

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error('Error updating user:', error.message);
  console.log(data);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError)
    throw new Error('Error uploading avatar:', storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${
        supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl
      }`,
    },
  });

  if (error2) throw new Error('Error updating user:', error2.message);

  return updatedUser;
}
