module.exports = {
  getAPI: function () {
    
    return "https://oov2rice.infoware.xyz/api"
    // return "https://api.fortunebusiness.in/api"
  
  },
 
  getToken: function () {
    return `Bearer ${localStorage.getItem("superadmin_auth")}`;
  },
  getLanguageList: function () {
    var languages = [
      {
        id: "en",
        name: "English",
      },
      {
        id: "ar",
        name: "Arabic",
      },
    ];
    return languages;
  },
};
