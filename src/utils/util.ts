export function getJejumDescription(type: string) {
  switch (type) {
    case 'J1':
      return 'Total das 00h às 12h';
    case 'J2':
      return 'Uma refeição no dia';
    case 'J3':
      return 'Apenas água 3 dias';
    default:
      return type;
  }
};