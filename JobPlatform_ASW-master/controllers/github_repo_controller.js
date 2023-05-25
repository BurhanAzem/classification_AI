const axios = require('axios');
class github_repo_controller{

static async fetchUserRepositories(req, res) {
    const username  = parseInt(req.params.id);
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    throw error;
  }
};


}

module.exports = github_repo_controller