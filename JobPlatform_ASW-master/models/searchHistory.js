const db = require("../config/db");

class SearchHistory{
    id
    jobSeekerID
    jobPostID
    searchedDate

    static create_savedJob(
        jobSeekerID,
        jobPostID,
        searchedDate    
      ) {
        return new Promise((resolve) => {
          const sql = "INSERT INTO search_history (JobSeekerID, JobPostID, SearchedDate) VALUES (?, ?, ?)";
          const values = 
          [ 
            
            jobSeekerID,
            jobPostID,
            searchedDate
        ];
          
          db.query(sql, values, (err, result) => {
            if (err) {
              console.error("Error registering a savedJob: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }



      static get_savedJobs(id) {
        return new Promise((resolve) => {
          const sql = "SELECT sh.JobSeekerID, sh.SearchedDate, jp.JobPostID , jp.title AS JobTitle FROM search_history sh JOIN job_posts jp ON sh.JobPostID = jp.JobPostID WHERE sh.JobSeekerID = ?";
          
          
          db.query(sql, [id], (err, result) => {
            if (err) {
              console.error("Error getting saved jobs: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }


      static delete_job(jobId) {
        return new Promise((resolve) => {
          const sql = "DELETE FROM `search_history` WHERE `JobSeekerID` = ?";
          //const values = [employerId];
          
          db.query(sql, [jobId], (err, result) => {
            if (err) {
              console.error("Error delete_employer employer: ", err);
              resolve(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    


}   



module.exports = SearchHistory