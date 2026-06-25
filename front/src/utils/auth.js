export function decodeJwtPayload(token) {
  const payloadPart = token.split(".")[1];
  if (!payloadPart) return null;

  const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);

  return JSON.parse(atob(base64 + padding));
}

export function getUsuarioDoToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = decodeJwtPayload(token);

    if (!payload) return null;

    if (payload.exp && Date.now() / 1000 > payload.exp) {
      localStorage.removeItem("token");
      return null;
    }

    return {
      ...payload,
      tipoPessoa:
        payload.tipoPessoa !== undefined && payload.tipoPessoa !== null
          ? Number(payload.tipoPessoa)
          : payload.tipoPessoa,
    };
  } catch {
    return null;
  }
}

export function isAdmin(usuario) {
  return Number(usuario?.tipoPessoa) === 2;
}
