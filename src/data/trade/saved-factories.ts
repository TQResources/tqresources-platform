export interface SavedFactory {
  id: string;
  name: string;
  active: boolean;
}

const STORAGE_KEY = "tq-smart-trade-saved-factories";

function canUseStorage() {
  return typeof window !== "undefined";
}

function createFactoryId(name: string) {
  return `saved-factory-${name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${Date.now()}`;
}

export function getSavedFactories(): SavedFactory[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (factory): factory is SavedFactory =>
        typeof factory?.id === "string" &&
        typeof factory?.name === "string" &&
        typeof factory?.active === "boolean",
    );
  } catch {
    return [];
  }
}

export function saveFactoryName(
  name: string,
): SavedFactory | null {
  if (!canUseStorage()) {
    return null;
  }

  const cleanName = name.trim();

  if (!cleanName) {
    return null;
  }

  const factories = getSavedFactories();

  const existing = factories.find(
    (factory) =>
      factory.active &&
      factory.name.trim().toLowerCase() ===
        cleanName.toLowerCase(),
  );

  if (existing) {
    return existing;
  }

  const factory: SavedFactory = {
    id: createFactoryId(cleanName),
    name: cleanName,
    active: true,
  };

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...factories, factory]),
  );

  return factory;
}
