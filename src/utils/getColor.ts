const hexToRgb = (hex: string): string =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )!
    .substring(1)
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16))
    .join(',')

const COLORS: Record<string, string> = {
  water: '#39f',
  grass: '#7c5',
  poison: '#a59',
  fire: '#f42',
  flying: '#89f',
  dragon: '#76e',
  bug: '#ab2',
  normal: '#aa9',
  dark: '#754',
  electric: '#fc3',
  psychic: '#f59',
  ground: '#db5',
  ice: '#6cf',
  steel: '#aab',
  fairy: '#e9e',
  fighting: '#b54',
  rock: '#ba6',
  ghost: '#66b',
}

const getColor = (typeName: string, hex = true): string =>
  hex ? COLORS[typeName] : hexToRgb(COLORS[typeName])

export default getColor
