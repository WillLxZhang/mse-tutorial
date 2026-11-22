export function analyticsSites(privateSite, publicSite) {
  const valid = (value) => typeof value === "string" && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value);
  if (!valid(privateSite)) throw new Error("Invalid private analytics site");
  return {
    privateUrl: `https://${privateSite}.goatcounter.com`,
    publicUrl: valid(publicSite) && publicSite !== privateSite
      ? `https://${publicSite}.goatcounter.com`
      : null,
  };
}

export function analyticsPage({ siteUrl, path, title }) {
  const base = new URL(siteUrl);
  const page = new URL(path, base);
  const prefix = decodeURIComponent(base.pathname);
  const canonical = decodeURIComponent(page.pathname);
  if (page.origin !== base.origin || !prefix.endsWith("/") || !canonical.startsWith(prefix)) {
    throw new Error("Page is outside this website");
  }

  const relative = canonical.slice(prefix.length);
  const privatePage = { path: canonical, title };
  if (relative.startsWith("大学生活/topics/")) {
    return { privatePage, publicPage: { ...privatePage } };
  }

  for (const [section, slug, label] of [
    ["baoyan/", "baoyan", "保研经验帖（合计）"],
    ["考研/", "kaoyan", "考研经验帖（合计）"],
    ["留学/", "liuxue", "留学经验帖（合计）"],
  ]) {
    if (relative.startsWith(section) && relative !== section) {
      return { privatePage, publicPage: { path: `${prefix}_summary/${slug}/`, title: label } };
    }
  }
  return { privatePage, publicPage: { path: `${prefix}_summary/other/`, title: "其他页面（合计）" } };
}

function collectPage(site, page) {
  const url = new URL("/count", site);
  url.search = new URLSearchParams({
    p: page.path,
    t: page.title,
    r: "",
    rnd: String(Math.random()),
  }).toString();

  // The documented browser pixel endpoint needs no private API credential.
  // Explicitly suppress the browser Referer header as well as the r parameter.
  const pixel = new Image();
  pixel.referrerPolicy = "no-referrer";
  pixel.src = url.href;
}

async function displayCount(element, site, page) {
  if (!site) {
    element.textContent = "暂不可用";
    return;
  }
  const key = element.dataset.mseCount === "total" ? "TOTAL" : page.path;
  const url = `${site}/counter/${encodeURIComponent(key)}.json`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: controller.signal,
    });
    if (response.status === 404) {
      element.textContent = "0 次";
      return;
    }
    if (!response.ok) throw new Error("Counter unavailable");
    const result = await response.json();
    const value = String(result.count ?? "");
    if (value.length > 32 || !/^[0-9][0-9,.\s]*$/.test(value)) throw new Error("Invalid count");
    element.textContent = `${value} 次`;
  } catch {
    element.textContent = "暂不可用";
  } finally {
    clearTimeout(timeout);
  }
}

function startAnalytics(settings) {
  try {
    const config = JSON.parse(settings.textContent);
    const base = new URL(config.siteUrl);
    // Local previews and copied pages must not add traffic to the real site.
    if (location.origin !== base.origin || !location.pathname.startsWith(base.pathname)) {
      for (const element of document.querySelectorAll("[data-mse-count]")) element.textContent = "暂不可用";
      return;
    }
    const sites = analyticsSites(config.privateSite, config.publicSite);
    const pages = analyticsPage(config);
    collectPage(sites.privateUrl, pages.privatePage);
    if (sites.publicUrl) collectPage(sites.publicUrl, pages.publicPage);
    for (const element of document.querySelectorAll("[data-mse-count]")) {
      displayCount(element, sites.publicUrl, pages.publicPage);
    }
  } catch {
    for (const element of document.querySelectorAll("[data-mse-count]")) element.textContent = "暂不可用";
  }
}

if (typeof document !== "undefined") {
  const settings = document.getElementById("mse-analytics-config");
  if (settings) startAnalytics(settings);
}
