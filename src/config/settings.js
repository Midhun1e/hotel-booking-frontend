
const settings = {
  dev: {
    apiUrl: "http://localhost:3800/api",
  },
  staging: {
    apiUrl: "http://localhost:3800/api",
  },
  prod: {
    apiUrl: "https://hotelbook-api.herokuapp.com/api",
  },
};

const getCurrentSettings = () => {
  if(process.env.NODE_ENV=="production") {
    return settings.prod;
  }else{
    return settings.dev
  }
};

export default getCurrentSettings();
