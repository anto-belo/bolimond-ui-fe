const lastRowType = ['none', 'fill', 'center'];

export function mapSettings(settings) {
  return {
    username: settings.find(s => s.id === 1).value,
    lastName: settings.find(s => s.id === 2).value,
    email: settings.find(s => s.id === 3).value,
    phone: settings.find(s => s.id === 4).value,
    imgSwitchInterval: Number(settings.find(s => s.id === 5).value),
    layout: {
      colsAmount: Number(settings.find(s => s.id === 6).value),
      relHeight: Number(settings.find(s => s.id === 7).value),
      gutter: settings.find(s => s.id === 8).value,
      lastRowType: lastRowType[Number(settings.find(s => s.id === 9).value)]
    },
    maxTitleLength: Number(settings.find(s => s.id === 10).value),
    enableMainColors: !!Number(settings.find(s => s.id === 11).value),
    meta: {
      description: settings.find(s => s.id === 12).value,
      keywords: settings.find(s => s.id === 13).value,
      dynamic: !!settings.find(s => s.id === 14).value
    }
  };
}
