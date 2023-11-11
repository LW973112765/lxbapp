import moment from "moment";
import filesize from '../utils/filesize.js'
export default {
    install(Vue) {
        Vue.filter('dateFormat', function (value) {
            return moment(value).format("YYYY-MM-DD HH:mm:ss");
        })
		Vue.filter('filesize', function (value) {
		    return filesize(value)
		})
    }
}
