export function getUsuarioDoToken() {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    );

    if (payload.exp && Date.now() / 1000 > payload.exp) {
      localStorage.removeItem('token');
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function isAdmin(usuario) {
  return usuario?.tipoPessoa === 2;
}
