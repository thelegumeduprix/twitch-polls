export default {
  //defaults
  useIcons: true,
  // actual values (optionally) set by the user
  ...(window.config ?? {}),
};
