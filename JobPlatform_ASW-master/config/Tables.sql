use jobsplatform;

-- Create table "employers"
CREATE TABLE employers (
  EmployerID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255),
  Address VARCHAR(255),
  Email VARCHAR(255) unique NOT NULL,
  PasswordSlot VARCHAR(255),
  PasswordHashed VARCHAR(255)
);

-- Create table "requirements"
CREATE TABLE requirements (
  RequirementID INT PRIMARY KEY AUTO_INCREMENT,
  Age VARCHAR(25),
  Major VARCHAR(255),
  NumberExperienceYears INT,
  Address VARCHAR(255)
);

-- Create table "job_seekers"
CREATE TABLE job_seekers (
  JobSeekerID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255),
  Address VARCHAR(255),
  Major VARCHAR(255),
  Age INT,
  NumberExperienceYears INT,
  Email VARCHAR(255) unique NOT NULL,
  PasswordSlot VARCHAR(255),
  PasswordHashed VARCHAR(255)
);


CREATE TABLE job_posts (
  JobPostID INT PRIMARY KEY AUTO_INCREMENT,
  EmployerID INT,
  RequirementID INT,
  Title VARCHAR(255),
  Description TEXT,
  StartSalary DECIMAL(10,2),
  EndSalary DECIMAL(10,2),
   Stauts varchar(20),
  FOREIGN KEY (EmployerID) REFERENCES employers(EmployerID) ON DELETE CASCADE,
  FOREIGN KEY (RequirementID) REFERENCES requirements(RequirementID) ON DELETE CASCADE
);
-- Create table "search_history"
CREATE TABLE search_history (
  SearchHistoryID INT PRIMARY KEY AUTO_INCREMENT,
  JobSeekerID INT,
  JobPostID INT,
  SearchedDate DATE,
  FOREIGN KEY (JobSeekerID) REFERENCES job_seekers(JobSeekerID) ON DELETE CASCADE,
   FOREIGN KEY (JobPostID) REFERENCES job_posts(JobPostID) ON DELETE CASCADE

);

-- Create table "job_posts"


-- Create table "job_applications"
CREATE TABLE job_applications (
  ApplicationJobID INT PRIMARY KEY AUTO_INCREMENT,
  JobPostID INT,
  JobSeekerID INT,
  ResumePath VARCHAR(255),
  CoverLetter TEXT,
  Stauts varchar(20),
  FOREIGN KEY (JobPostID) REFERENCES job_posts(JobPostID) ON DELETE CASCADE,
  FOREIGN KEY (JobSeekerID) REFERENCES job_seekers(JobSeekerID) ON DELETE CASCADE
);