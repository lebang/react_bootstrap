
import http from "@/service/http";

export default {
    getSso(): Promise<any> {
        return http.post("server/sso", {}, 'domain-prev');
    }
}; 