const baseURL = "https://cemilk.pythonanywhere.com/api";

export const fetcher = (url: string) =>
  fetch(baseURL + url, {}).then((res) => res.json());
