export function headerHeight(projectUrl) {
  return projectUrl ? 'header-with-project' : 'header-with-category';
}

export function linkOffset(isLast) {
  return !isLast ? 'me-2' : '';
}

export function interlevelOffset(isSeparatorPresent) {
  return isSeparatorPresent
      ? 'mt-with-interlevel-separator'
      : 'mt-without-interlevel-separator';
}

export function separatorHeight(isInterlevel) {
  return isInterlevel ? 'interlevel-separator' : 'default-separator';
}
