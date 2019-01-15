function getNpmargv(param) {
  const perfix = '--';
  const args = JSON.parse(process.env.npm_config_argv).original.slice(2);   // process.argv
  let val = args.filter(a => a.startsWith(perfix + param));
  val = val[val.length - 1];
  const reg = new RegExp('\^' + perfix + param + '(=)?');
  return val === undefined ? undefined : val.replace(reg, '');
}

module.exports = {
  getNpmargv
}
