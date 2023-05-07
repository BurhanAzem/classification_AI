CREATE TABLE Employee (
    employee_Id NUMBER,
    employee_Name VARCHAR2(50), 
    address VARCHAR2(50), 
    salary NUMBER,
    grande_Id NUMBER,
    CONSTRAINT pk_employee PRIMARY KEY (employee_Id), 
    CONSTRAINT fk_grande FOREIGN KEY (grande_Id) REFERENCES Grande (grande_Id)
    );
     
    
CREATE TABLE Grade(
    grade_Id NUMBER,
    grade_Name VARCHAR2(50),
    scale_Id NUMBER,
    CONSTRAINT pk_grade PRIMARY KEY (grade_Id),
    CONSTRAINT fk_scale FOREIGN KEY (scale_Id) REFERENCES Scale (scale_Id)
);


CREATE TABLE Scale(
    scale_Id NUMBER,
    start_Salary NUMBER,
    end_Salary NUMBER,
    CONSTRAINT pk_scale PRIMARY KEY (scale_Id)
);


CREATE TABLE Degree(
    degree_Id NUMBER,
    degree_Name VARCHAR2(50),
    basic_Salary NUMBER,
    CONSTRAINT pk_degree PRIMARY KEY (degree_Id)
);


CREATE TABLE Degree_Grade(
    degree_grade_Id NUMBER,
    degree_Id NUMBER,
    grade_Id NUMBER,
    CONSTRAINT pk_degree_grade PRIMARY KEY (degree_grade_Id),
    CONSTRAINT fk_degree_grade FOREIGN KEY (degree_Id) REFERENCES Degree (degree_Id)
    CONSTRAINT fk_degree_grade FOREIGN KEY (grade_Id) REFERENCES Grade (grade_Id)
);


CREATE TABLE Allowance_Detection(
    allowance_detection_Id NUMBER,
    description Varchar2(100),
    type BOOLEAN,
    CONSTRAINT pk_allowance_detection PRIMARY KEY (allowance_detection_Id)
);



CREATE Allowance_Detection_Employee(
    allowance_detection_employee_Id NUMBER,
    allowance_detection_Id NUMBER,
    employee_Id NUMBER,
    created_date DATE,
    amount NUMBER,
    CONSTRAINT pk_allowance_detection PRIMARY KEY (allowance_detection_employee_Id)    
    CONSTRAINT fk_allowance_detection FOREIGN KEY (employee_Id) REFERENCES Employee (employee_Id)
    CONSTRAINT fk_allowance_detection FOREIGN KEY (allowance_detection_Id) REFERENCES Allowance_Detection (allowance_detection_Id)

);





