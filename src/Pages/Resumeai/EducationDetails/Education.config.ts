export const boards = [
  {
    id: 1,
    code: "CBSE",
    name: "Central Board of Secondary Education",
  },
  {
    id: 2,
    code: "ICSE",
    name: "Indian Certificate of Secondary Education",
  },
  {
    id: 3,
    code: "MPBSE",
    name: "Madhya Pradesh Board of Secondary Education",
  },
  {
    id: 4,
    code: "MSBSHSE",
    name: "Maharashtra State Board of Secondary & Higher Secondary Education",
  },
  {
    id: 5,
    code: "TNBSE",
    name: "Tamil Nadu Board of Secondary Education",
  },
  {
    id: 6,
    code: "KSEAB",
    name: "Karnataka School Examination and Assessment Board",
  },
  {
    id: 7,
    code: "BSEB",
    name: "Bihar School Examination Board",
  },
  {
    id: 8,
    code: "UPMSP",
    name: "Uttar Pradesh Madhyamik Shiksha Parishad",
  },
  {
    id: 9,
    code: "WBBSE",
    name: "West Bengal Board of Secondary Education",
  },
  {
    id: 10,
    code: "PSEB",
    name: "Punjab School Education Board",
  },
  {
    id: 11,
    code: "GSEB",
    name: "Gujarat Secondary and Higher Secondary Education Board",
  },
  {
    id: 12,
    code: "CGBSE",
    name: "Chhattisgarh Board of Secondary Education",
  },
  {
    id: 13,
    code: "HBSE",
    name: "Haryana Board of School Education",
  },
  {
    id: 14,
    code: "RBSE",
    name: "Rajasthan Board of Secondary Education",
  },
  {
    id: 15,
    code: "BSEAP",
    name: "Board of Secondary Education Andhra Pradesh",
  },
  {
    id: 16,
    code: "BSETS",
    name: "Board of Secondary Education Telangana State",
  },
  {
    id: 17,
    code: "JKBOSE",
    name: "Jammu and Kashmir Board of School Education",
  },
  {
    id: 18,
    code: "KBPE",
    name: "Kerala Board of Public Examinations",
  },
  {
    id: 19,
    code: "MBOSE",
    name: "Meghalaya Board of School Education",
  },
  {
    id: 20,
    code: "NBSE",
    name: "Nagaland Board of School Education",
  },
  {
    id: 21,
    code: "SEBA",
    name: "Board of Secondary Education Assam",
  },
  {
    id: 22,
    code: "TBSE",
    name: "Tripura Board of Secondary Education",
  },
  {
    id: 23,
    code: "UBSE",
    name: "Uttarakhand Board of School Education",
  },
  {
    id: 24,
    code: "JAC",
    name: "Jharkhand Academic Council",
  },
];

export const majorCourses = [
  { id: 1, name: "BTech", fullName: "Bachelor of Technology" },
  { id: 2, name: "BSc", fullName: "Bachelor of Science" },
  { id: 3, name: "BA", fullName: "Bachelor of Arts" },
  { id: 4, name: "BCom", fullName: "Bachelor of Commerce" },
  { id: 5, name: "BBA", fullName: "Bachelor of Business Administration" },
  { id: 6, name: "MTech", fullName: "Master of Technology" },
  { id: 7, name: "MSc", fullName: "Master of Science" },
  { id: 8, name: "MA", fullName: "Master of Arts" },
  { id: 9, name: "MCom", fullName: "Master of Commerce" },
  { id: 10, name: "MBA", fullName: "Master of Business Administration" },
  { id: 11, name: "PhD", fullName: "Doctor of Philosophy" },
  { id: 12, name: "Other", fullName: "Other" },
];

export const specializations = {
  BTech: [
    { id: 1, name: "Computer Science and Engineering" },
    { id: 2, name: "Mechanical Engineering" },
    { id: 3, name: "Electrical Engineering" },
    { id: 4, name: "Civil Engineering" },
    { id: 5, name: "Electronics and Communication" },
    { id: 6, name: "Information Technology" },
    { id: 7, name: "Chemical Engineering" },
    { id: 8, name: "Aerospace Engineering" },
    { id: 9, name: "Biotechnology" },
    { id: 10, name: "Other" },
  ],
  BSc: [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Chemistry" },
    { id: 4, name: "Mathematics" },
    { id: 5, name: "Biology" },
    { id: 6, name: "Statistics" },
    { id: 7, name: "Electronics" },
    { id: 8, name: "Other" },
  ],
  MBA: [
    { id: 1, name: "Finance" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Human Resources" },
    { id: 4, name: "Operations" },
    { id: 5, name: "International Business" },
    { id: 6, name: "Information Technology" },
    { id: 7, name: "Other" },
  ],
  default: [
    { id: 1, name: "General" },
    { id: 2, name: "Other" },
  ],
};

export const getSpecializations = (course: string) => {
  return (
    specializations[course as keyof typeof specializations] ||
    specializations.default
  );
};
