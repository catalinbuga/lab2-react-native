export function getImageSource(item) {
  const key = String(item?.id || item?.name || '')
    .toLowerCase()
    .replace(/\s+/g, '');

  try {
    switch (key) {
      case 'espresso':
        return require('../../assets/image/espreso.jpg'); 
      case 'latte':
        return require('../../assets/image/late.jpg');
      case 'cappuccino':
        return require('../../assets/image/capucino.jpg'); 
      case 'americano':
        return require('../../assets/image/americano.jpg');
      case 'mocha':
        return require('../../assets/image/mocha.jpg');
      case 'flatwhite':
        return require('../../assets/image/flatwhite.jpg');
      case 'cortado':
        return require('../../assets/image/cortado.jpg');
      case 'macchiato':
        return require('../../assets/image/caffea.jpg');
      default:
        break;
    }
  } catch (e) {
    // daca e eroare continuam spre fallbackuri
  }

  if (item?.imageUrl) {
    return { uri: item.imageUrl };
  }

  return require('../../assets/icon.png');
}
