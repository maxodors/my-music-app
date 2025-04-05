export const getBadgeColor = (state: number): string => {
    switch (state) {
      case 1:
        return 'green';
      case 2:
        return 'red';
      default:
        return 'gray';
    }
  };

  export const nextTagState = (current: number): 0 | 1 | 2 => {
    return ((current + 1) % 3) as 0 | 1 | 2;
  };
  