import api from '../utils/request.js'

export default {
	// 邀请
	invitation: (id) => {
		return api.get('/invitation/' + id);
	},
};
