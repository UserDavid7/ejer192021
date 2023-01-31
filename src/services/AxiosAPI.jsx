import APIrequest from "../utils/config/axios.config";

export default function getChiste(){
    return APIrequest.get('jokes/random' , {
        validateStatus: function(status){
            return status < 500;
        }
    }); //la respuesta de el link /
} 