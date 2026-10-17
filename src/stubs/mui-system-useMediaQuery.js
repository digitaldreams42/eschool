// Stub for @mui/system/useMediaQuery (MUI v9 + Next.js 14 compatibility)
function unstable_createUseMediaQuery() {
  return function useMediaQuery() {
    return false;
  };
}

module.exports = {
  unstable_createUseMediaQuery,
  default: unstable_createUseMediaQuery,
};
