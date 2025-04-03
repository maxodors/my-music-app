// export const transformFiltersForRequest = (filters: Filters) => {
//     const include: Record<string, string[]> = {};
//     const exclude: Record<string, string[]> = {};
  
//     for (const [category, tags] of Object.entries(filters)) {
//       for (const [tag, state] of Object.entries(tags)) {
//         if (state === 1) {
//           include[category] ||= [];
//           include[category].push(tag);
//         } else if (state === 2) {
//           exclude[category] ||= [];
//           exclude[category].push(tag);
//         }
//       }
//     }
  
//     return { include, exclude };
//   };
  