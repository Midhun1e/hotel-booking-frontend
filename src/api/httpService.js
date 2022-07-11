import { create } from "apisauce";
import settings from "../config/settings";
import jwtDecode from "jwt-decode";
const tokenKey="token"

const apiClient = create({
  baseURL: settings.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
    try {
        const authtoken = localStorage.getItem(tokenKey);
        if(jwtDecode(authtoken)){
            request.headers["x-auth-token"] = authtoken;
        }
      } catch (ex) {
          return null
      }
});
 
export default apiClient;
