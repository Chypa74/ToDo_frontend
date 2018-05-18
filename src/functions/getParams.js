export default function(pathname, paths) {
  let params = {};
  for (var i = 0; i < paths.length; i++) {
    let path = paths[i];
    let res = path[0].exec(pathname);
    if (!res) continue;
    path[1].forEach((paramName, i) => (params[paramName] = res[i + 1]));
    return params;
  }
  return {};
}
