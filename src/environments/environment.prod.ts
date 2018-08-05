const baseAPI = 'http://lebdg.fr:3000';

export const environment = {
  production: true,
  week: {
    currentWeek: (today) => {
      return `${baseAPI}/api/weekByDate/${today}`;
    },
    instanciateCurrentWeek: `${baseAPI}/api/instanciateCurrentWeek`,
  },
  game: {
    getGames: `${baseAPI}/api/games`
  }
};